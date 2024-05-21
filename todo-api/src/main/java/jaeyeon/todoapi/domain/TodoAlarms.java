package jaeyeon.todoapi.domain;

import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

@Data
public class TodoAlarms {
    int id;
    int todoItemId;
    Timestamp reservedAt;
    boolean reserved;
    boolean finished;
    Timestamp created_at;
    Timestamp updated_at;
}
