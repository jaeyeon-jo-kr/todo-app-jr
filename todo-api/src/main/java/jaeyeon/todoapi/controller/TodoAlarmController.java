package jaeyeon.todoapi.controller;

import jaeyeon.todoapi.domain.TodoAlarm;
import jaeyeon.todoapi.mapper.TodoAlarmMapper;
import jaeyeon.todoapi.mapper.TodoItemMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/todo-alarm")
@RestController
public class TodoAlarmController {

    private TodoAlarmMapper mapper;

    public TodoAlarmController(TodoAlarmMapper mapper){
        this.mapper = mapper;
    }

    @GetMapping(value="/todo-item/{id}", consumes="application/json", produces="application/json")
    public List<TodoAlarm> getTodoAlarmsByTodoItemId(@PathVariable int id){
        return this.mapper.getTodoAlarmsByItemId(id);
    }

    @PostMapping(value="/new", consumes="application/json", produces="application/json")
    public int createTodoAlarms(TodoAlarm alarm){
        this.mapper.insertTodoAlarms(alarm);
        return this.mapper.getLastInsertId();
    }

}
