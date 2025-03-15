/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2024 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */
/* Includes ------------------------------------------------------------------*/
#include "main.h"
#include "cmsis_os.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */
typedef enum {
	ON,OFF,TOGGLE
}LedCmdType_t;
typedef struct {
	LedCmdType_t cmd;
	int period_ms;
}LedCmd_t;

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/
UART_HandleTypeDef huart2;

/* Definitions for ledTask */
osThreadId_t ledTaskHandle;
const osThreadAttr_t ledTask_attributes = {
  .name = "ledTask",
  .stack_size = 128 * 4,
  .priority = (osPriority_t) osPriorityNormal,
};
/* Definitions for cmdTask */
osThreadId_t cmdTaskHandle;
const osThreadAttr_t cmdTask_attributes = {
  .name = "cmdTask",
  .stack_size = 128 * 4,
  .priority = (osPriority_t) osPriorityLow,
};
/* Definitions for cmdQueue */
osMessageQueueId_t cmdQueueHandle;
const osMessageQueueAttr_t cmdQueue_attributes = {
  .name = "cmdQueue"
};
/* USER CODE BEGIN PV */
uint8_t buf;


/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MX_GPIO_Init(void);
static void MX_USART2_UART_Init(void);
void startLedTask(void *argument);
void startCmdTask(void *argument);

/* USER CODE BEGIN PFP */
int __io_putchar(int ch);
void uart2_write(int ch);
void uart2_print(char * str);
void process_command(char *cmd);
void clear_input(char * cmd, int *index);

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */

/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{

  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_USART2_UART_Init();
  /* USER CODE BEGIN 2 */

  //HAL_UART_Receive_IT(&huart2, &buf, 1);

  /* USER CODE END 2 */

  /* Init scheduler */
  osKernelInitialize();

  /* USER CODE BEGIN RTOS_MUTEX */
  /* add mutexes, ... */
  /* USER CODE END RTOS_MUTEX */

  /* USER CODE BEGIN RTOS_SEMAPHORES */
  /* add semaphores, ... */
  /* USER CODE END RTOS_SEMAPHORES */

  /* USER CODE BEGIN RTOS_TIMERS */
  /* start timers, add new ones, ... */
  /* USER CODE END RTOS_TIMERS */

  /* Create the queue(s) */
  /* creation of cmdQueue */
  cmdQueueHandle = osMessageQueueNew (4, sizeof(LedCmd_t), &cmdQueue_attributes);

  /* USER CODE BEGIN RTOS_QUEUES */
  /* add queues, ... */
  /* USER CODE END RTOS_QUEUES */

  /* Create the thread(s) */
  /* creation of ledTask */
  ledTaskHandle = osThreadNew(startLedTask, NULL, &ledTask_attributes);

  /* creation of cmdTask */
  cmdTaskHandle = osThreadNew(startCmdTask, NULL, &cmdTask_attributes);

  /* USER CODE BEGIN RTOS_THREADS */
  /* add threads, ... */
  /* USER CODE END RTOS_THREADS */

  /* USER CODE BEGIN RTOS_EVENTS */
  /* add events, ... */
  /* USER CODE END RTOS_EVENTS */

  /* Start scheduler */
  osKernelStart();

  /* We should never get here as control is now taken by the scheduler */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}

/**
  * @brief System Clock Configuration
  * @retval None
  */
void SystemClock_Config(void)
{
  RCC_OscInitTypeDef RCC_OscInitStruct = {0};
  RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

  /** Configure the main internal regulator output voltage
  */
  __HAL_RCC_PWR_CLK_ENABLE();
  __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE3);

  /** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSI;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.HSICalibrationValue = RCC_HSICALIBRATION_DEFAULT;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSI;
  RCC_OscInitStruct.PLL.PLLM = 16;
  RCC_OscInitStruct.PLL.PLLN = 336;
  RCC_OscInitStruct.PLL.PLLP = RCC_PLLP_DIV4;
  RCC_OscInitStruct.PLL.PLLQ = 2;
  RCC_OscInitStruct.PLL.PLLR = 2;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }

  /** Initializes the CPU, AHB and APB buses clocks
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV2;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_2) != HAL_OK)
  {
    Error_Handler();
  }
}

/**
  * @brief USART2 Initialization Function
  * @param None
  * @retval None
  */
static void MX_USART2_UART_Init(void)
{

  /* USER CODE BEGIN USART2_Init 0 */

  /* USER CODE END USART2_Init 0 */

  /* USER CODE BEGIN USART2_Init 1 */

  /* USER CODE END USART2_Init 1 */
  huart2.Instance = USART2;
  huart2.Init.BaudRate = 115200;
  huart2.Init.WordLength = UART_WORDLENGTH_8B;
  huart2.Init.StopBits = UART_STOPBITS_1;
  huart2.Init.Parity = UART_PARITY_NONE;
  huart2.Init.Mode = UART_MODE_TX_RX;
  huart2.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  huart2.Init.OverSampling = UART_OVERSAMPLING_16;
  if (HAL_UART_Init(&huart2) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN USART2_Init 2 */

  /* USER CODE END USART2_Init 2 */

}

/**
  * @brief GPIO Initialization Function
  * @param None
  * @retval None
  */
static void MX_GPIO_Init(void)
{
  GPIO_InitTypeDef GPIO_InitStruct = {0};
/* USER CODE BEGIN MX_GPIO_Init_1 */
/* USER CODE END MX_GPIO_Init_1 */

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOC_CLK_ENABLE();
  __HAL_RCC_GPIOH_CLK_ENABLE();
  __HAL_RCC_GPIOA_CLK_ENABLE();
  __HAL_RCC_GPIOB_CLK_ENABLE();

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(LD2_GPIO_Port, LD2_Pin, GPIO_PIN_RESET);

  /*Configure GPIO pin : B1_Pin */
  GPIO_InitStruct.Pin = B1_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_IT_FALLING;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  HAL_GPIO_Init(B1_GPIO_Port, &GPIO_InitStruct);

  /*Configure GPIO pin : LD2_Pin */
  GPIO_InitStruct.Pin = LD2_Pin;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(LD2_GPIO_Port, &GPIO_InitStruct);

/* USER CODE BEGIN MX_GPIO_Init_2 */
/* USER CODE END MX_GPIO_Init_2 */
}

/* USER CODE BEGIN 4 */
void clear_input(char * cmd, int *index)
{
	*index = 0;
	memset(cmd, 0, 5);
}
void process_command(char *cmd){
	int ms = atoi(cmd);
	LedCmd_t ledcmd;

	if(!strcmp(cmd, "on")){
		ledcmd.cmd = ON;
		ledcmd.period_ms = 1000;
		osMessageQueuePut(cmdQueueHandle, &ledcmd, 0U, 0U);
	}else if(!strcmp(cmd, "off")){
		ledcmd.cmd = OFF;
		ledcmd.period_ms = 1000;
		osMessageQueuePut(cmdQueueHandle, &ledcmd, 0U, 0U);
	}else if(0 < ms){
		ledcmd.cmd = TOGGLE;
		ledcmd.period_ms = ms;
		osMessageQueuePut(cmdQueueHandle, &ledcmd, 0U, 0U);
	}
}
void handle_input(int ch)
{

	static char cmd[5];
	static int index = 0;
	char output[32];

	uart2_write(ch);

	if('\r' == ch)
	{
		sprintf(output, "command : %s!\r\n", cmd);
		uart2_print(output);
		process_command(cmd);
		clear_input(cmd, &index);
	}else if(index > 4){
		clear_input(cmd, &index);
		cmd[index++] = ch;
	}else {
		cmd[index++] = ch;
	}
}

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
  /* Prevent unused argument(s) compilation warning */
//  UNUSED(huart);

	if(huart->Instance == huart2.Instance)
	{
		handle_input(buf);
		HAL_UART_Receive_IT(&huart2, &buf, 1);
	}

}
void uart2_print(char * str)
{
	HAL_UART_Transmit(&huart2, (const uint8_t *)str, strlen(str),100);
}

void uart2_write(int ch)
{
	HAL_UART_Transmit(&huart2, (const uint8_t *)&ch, 1,100);
}

int __io_putchar(int ch)
{
	uart2_write(ch);
	return ch;
}
/* USER CODE END 4 */

/* USER CODE BEGIN Header_startLedTask */
/**
  * @brief  Function implementing the ledTask thread.
  * @param  argument: Not used
  * @retval None
  */
/* USER CODE END Header_startLedTask */
void startLedTask(void *argument)
{
  /* USER CODE BEGIN 5 */
	TickType_t wakeTime;
	wakeTime = xTaskGetTickCount();
	LedCmd_t ledcmd;
	ledcmd.cmd = TOGGLE;
	ledcmd.period_ms = 250;
	LedCmd_t tmp;

  /* Infinite loop */
  for(;;)
  {
	  osStatus_t status = osMessageQueueGet(cmdQueueHandle, &tmp, NULL, 0U);
	  if(status == osOK){
		  memcpy(&ledcmd, &tmp, sizeof(LedCmd_t));
	  }

	  switch(ledcmd.cmd){
		  case ON:
			  HAL_GPIO_WritePin(LD2_GPIO_Port, LD2_Pin, GPIO_PIN_SET);
			  break;
		  case OFF:
			  HAL_GPIO_WritePin(LD2_GPIO_Port, LD2_Pin, GPIO_PIN_RESET);
			  break;
		  case TOGGLE:
			  HAL_GPIO_TogglePin(LD2_GPIO_Port, LD2_Pin);
			  break;
	  }

	  vTaskDelayUntil(&wakeTime, pdMS_TO_TICKS( ledcmd.period_ms ));

//	  osDelay(1);
  }
  /* USER CODE END 5 */
}

/* USER CODE BEGIN Header_startCmdTask */
/**
* @brief Function implementing the cmdTask thread.
* @param argument: Not used
* @retval None
*/
/* USER CODE END Header_startCmdTask */
void startCmdTask(void *argument)
{
  /* USER CODE BEGIN startCmdTask */
	HAL_UART_Receive_IT(&huart2, &buf, 1);
  /* Infinite loop */
  for(;;)
  {
    osDelay(1);
  }
  /* USER CODE END startCmdTask */
}

/**
  * @brief  Period elapsed callback in non blocking mode
  * @note   This function is called  when TIM5 interrupt took place, inside
  * HAL_TIM_IRQHandler(). It makes a direct call to HAL_IncTick() to increment
  * a global variable "uwTick" used as application time base.
  * @param  htim : TIM handle
  * @retval None
  */
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
  /* USER CODE BEGIN Callback 0 */

  /* USER CODE END Callback 0 */
  if (htim->Instance == TIM5) {
    HAL_IncTick();
  }
  /* USER CODE BEGIN Callback 1 */

  /* USER CODE END Callback 1 */
}

/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */
void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
  }
  /* USER CODE END Error_Handler_Debug */
}

#ifdef  USE_FULL_ASSERT
/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */
