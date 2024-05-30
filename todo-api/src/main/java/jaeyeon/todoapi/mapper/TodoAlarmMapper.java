package jaeyeon.todoapi.mapper;

import jaeyeon.todoapi.domain.TodoAlarm;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TodoAlarmMapper {
    @Select("SELECT id, todo_item_id, reserved_at, reserved, finished, created_at, updated_at " +
            "FROM TodoAlarm" +
            "WHERE todo_item_id = #{todoItemId}")
    List<TodoAlarm> getTodoAlarmsByItemId(Integer id);

    @Insert("INSERT INTO TodoAlarm" +
            "(todo_item_id, reserved_at, reserved, finished)"+
            "VALUES(#{todoItemId}, #{reservedAt},#{reserved}, #{finished})")
    int insertTodoAlarms(TodoAlarm alarm);

    @Select("Select LAST_INSERT_ID()")
    Integer getLastInsertId();
}
