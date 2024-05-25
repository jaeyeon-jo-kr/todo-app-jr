package jaeyeon.todoapi.controller;

import jaeyeon.todoapi.mapper.TodoItemMapper;
import jaeyeon.todoapi.domain.TodoItem;
import jaeyeon.todoapi.service.TodoItemService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value="/api/todo-item")
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

    @GetMapping(value="/{id}",consumes="application/json", produces="application/json")
    public TodoItem getAllItems(@PathVariable int id){
        return this.mapper.getItem(id);
    }

    @PostMapping(value="/update",consumes="application/json", produces="application/json")
    public int updateItem(TodoItem item)
    {
        return this.mapper.updateItem(item);
    }

    @PostMapping(value="/delete",consumes="application/json", produces="application/json")
    public int deleteItem(TodoItem item)
    {
        int id = item.getId();
        return this.service.RemoveItem(id);

    }

    @PostMapping(value="/new")
    public int insertItem(@RequestBody TodoItem item){
        System.out.println(item);
        return this.service.insertItem(item);
    }
}
