package jaeyeon.todoapi.mapper;

import jaeyeon.todoapi.domain.TodoItem;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TodoItemMapper
{
    @Select("SELECT id FROM TodoItem")
    List<Long> selectAllIds();

    @Select("SELECT * FROM TodoItem")
    List<TodoItem> selectAllItems();

    @Select("SELECT * FROM TodoItem WHERE id #{id}")
    TodoItem getItem(long id);

    @Update("Update TodoItem SET title=#{title}, toggled = #{toggled} WHERE id = #{id}")
    int updateItem(TodoItem item);

    @Insert("INSERT INTO TodoItem(title, toggled) VALUES(#{title},#{toggled});")
    void insertItem(TodoItem item);

    @Select("Select LAST_INSERT_ID()")
    long getLastInsertId();

    @Update("DELETE FROM TodoItem WHERE id = #{id}")
    int deleteItem(Long id);

    @Update("Update TodoItem SET toggled = !toggled WHERE id = #{id}")
    int toggle(int id);



}
