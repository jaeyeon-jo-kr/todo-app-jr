package jaeyeon.todoapi.controller;

import jaeyeon.todoapi.mapper.TodoItemMapper;
import jaeyeon.todoapi.domain.TodoItem;
import jaeyeon.todoapi.service.TodoItemService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/todo-item")
@RestController
public class TodoItemController {
    private TodoItemMapper mapper;
    private TodoItemService service;

    public TodoItemController(TodoItemMapper mapper, TodoItemService service)
    {
        this.mapper = mapper;
        this.service = service;
    }

    @GetMapping("/all-ids")
    public List<Integer> getAllIds(){
        return this.mapper.selectAllIds();
    }

    @GetMapping("/all")
    public List<TodoItem> getAllItems(){
        return this.mapper.selectAllItems();
    }

    @GetMapping("/{id}")
    public TodoItem getAllItems(@PathVariable int id){
        return this.mapper.getItem(id);
    }

    @PostMapping("/update")
    public int updateItem(TodoItem item)
    {
        return this.mapper.updateItem(item);
    }

    @PostMapping("/delete")
    public int deleteItem(int id)
    {
        return this.service.RemoveItem(id);

    }

    @PostMapping("/new")
    public int insertItem(TodoItem item){
        return this.service.insertItem(item);
    }
}
