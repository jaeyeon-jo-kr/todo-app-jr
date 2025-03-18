package jaeyeon.todoapi.domain;

import java.sql.Timestamp;

public record Address(
        int id,
        String street,
        String suite,
        String city,
        String zipcode,
        Geo geo,
        Timestamp created_at,
        Timestamp updated_at
) {}
