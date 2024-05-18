package jaeyeon.todoapi.domain;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Data
public class TodoItem implements Serializable {
    long id;
    String title;
    String description;
    boolean toggled;
}
