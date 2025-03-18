package jaeyeon.todoapi.domain;

import java.sql.Timestamp;

public record Geo(int id,
        float lat,
        float lng,
        Timestamp created_at,
        Timestamp updated_at) {
}
