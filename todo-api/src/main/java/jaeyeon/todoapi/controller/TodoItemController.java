package jaeyeon.todoapi.controller;

import jaeyeon.todoapi.mapper.TodoItemMapper;
import jaeyeon.todoapi.domain.TodoItem;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/todo-item")
@RestController
public class TodoItemController {
    private TodoItemMapper mapper;

    public TodoItemController(TodoItemMapper mapper){
        this.mapper = mapper;
    }

    @GetMapping("/all-ids")
    public List<Long> getAllIds(){
        return this.mapper.selectAllIds();
    }

    @GetMapping("/all")
    public List<TodoItem> getAllItems(){
        return this.mapper.selectAllItems();
    }

    @GetMapping("/{id}")
    public TodoItem getAllItems(@PathVariable long id){
        return this.mapper.getItem(id);
    }

    @PostMapping("/update")
    public int updateItem(TodoItem item)
    {
        return this.mapper.updateItem(item);
    }

    @PostMapping("/delete")
    public int deleteItem(long id)
    {
        return this.mapper.deleteItem(id);

    }

    @PostMapping("/toggle")
    public int toogleId(int id){
        return this.mapper.toggle(id);
    }

    @PostMapping("/new")
    public Long insertItem(TodoItem item){
        this.mapper.insertItem(item);
        return this.mapper.getLastInsertId();
    }
}
