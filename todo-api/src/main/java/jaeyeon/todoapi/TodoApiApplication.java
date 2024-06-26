package jaeyeon.todoapi;

import jaeyeon.todoapi.mapper.TodoItemMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.io.InputStream;

@SpringBootApplication
public class TodoApiApplication {

	private final TodoItemMapper todoItemMapper;

	public TodoApiApplication(TodoItemMapper todoItemMapper){
		this.todoItemMapper = todoItemMapper;

	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
						.allowedOrigins("http://localhost:3000");
			}
		};
	}

	public static void main(String[] args) throws IOException {

		SpringApplication.run(TodoApiApplication.class, args);
	}

}
