package jaeyeon.todoapi.domain;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class TodoItem implements Serializable {
    long id;
    String title;
    String description;
    boolean toggled;
    Timestamp created_at;
    Timestamp updated_at;
}
