package jaeyeon.todoapi.service;

import jaeyeon.todoapi.domain.TodoItem;
import jaeyeon.todoapi.mapper.TodoItemMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TodoItemService {

    private final TodoItemMapper mapper;
    public TodoItemService(TodoItemMapper mapper){
        this.mapper = mapper;

    }
    @Transactional(propagation = Propagation.REQUIRED)
    public int RemoveItem(int id)
    {
        this.mapper.moveToTrash(id);
        return this.mapper.deleteItem(id);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public int insertItem(TodoItem item){
        this.mapper.insertItem(item);
        return this.mapper.getLastInsertId();
    }

}
