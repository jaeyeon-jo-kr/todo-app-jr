package jaeyeon.todoapi.domain;

import java.sql.Timestamp;

public record Comment(int id, int postId, String name, String email, String body, Timestamp created_at, Timestamp updated_at) {
}
