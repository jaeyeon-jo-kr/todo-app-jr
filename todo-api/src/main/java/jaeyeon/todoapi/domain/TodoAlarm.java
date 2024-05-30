package jaeyeon.todoapi.domain;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class TodoAlarm {
    int id;
    int todoItemId;
    Timestamp reservedAt;
    boolean reserved;
    boolean finished;
    Timestamp created_at;
    Timestamp updated_at;
}
