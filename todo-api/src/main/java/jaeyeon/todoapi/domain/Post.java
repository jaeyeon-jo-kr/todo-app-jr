package jaeyeon.todoapi.domain;

import java.sql.Timestamp;

public record Post(int id,
        int userId,
        String username,
        String title,
        String body,
        Timestamp created_at,
        Timestamp updated_at) {
}
