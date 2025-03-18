package jaeyeon.todoapi.domain;

import java.sql.Timestamp;

public record User(Integer id,
                   String name,
                   String username,
                   String email,
                   String phone,
                   String website,
                   Address address,
                   Company company,
                   Timestamp createdAt,
                   Timestamp updatedAt) {
}
