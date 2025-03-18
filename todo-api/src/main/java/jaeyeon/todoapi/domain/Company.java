package jaeyeon.todoapi.domain;

import java.sql.Timestamp;

public record Company(
        int id,
        String name,
        String catch_phrase,
        String bs,
        Timestamp created_at,
        Timestamp updated_at
) {
}
