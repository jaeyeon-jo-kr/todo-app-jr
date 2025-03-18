package jaeyeon.todoapi.repository;

import jaeyeon.todoapi.domain.Address;
import jaeyeon.todoapi.domain.Company;
import jaeyeon.todoapi.domain.Geo;
import jaeyeon.todoapi.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> getUsers(int offset, int limit) {
        var sql = """
                SELECT u.id AS id,
                    u.name AS name,
                    u.username AS username,
                    u.email AS email,
                    u.phone AS phone,
                    u.website AS website,
                    u.created_at AS created_at,
                    u.updated_at AS updated_at,
                    a.id AS address_id,
                    street AS street,
                    suite AS suite,
                    city AS city,
                    zipcode AS zipcode,
                    a.created_at AS address_created_at,
                    a.updated_at AS address_updated_at,
                    g.id AS geo_id,
                    lat,
                    lng,
                    g.created_at AS geo_created_at,
                    g.updated_at AS geo_updated_at,
                    c.id AS company_id,
                    c.name AS company_name,
                    c.catch_phrase AS catch_phrase,
                    c.bs AS bs,
                    c.created_at AS company_created_at,
                    c.updated_at AS company_updated_at
                FROM users u
                LEFT JOIN Addresses a ON u.address_id = a.id
                LEFT JOIN Geos g ON a.geo_id = g.id
                LEFT JOIN Companies c ON u.company_id = c.id
                LIMIT ?
                OFFSET ?""";
        RowMapper<User> mapper = (rs, rowNum) -> {
            var geo = new Geo(
                    rs.getInt("geo_id"),
                    rs.getFloat("lat"),
                    rs.getFloat("lng"),
                    rs.getTimestamp("geo_created_at"),
                    rs.getTimestamp("geo_updated_at")
            );
            var address = new Address(
                    rs.getInt("address_id"),
                    rs.getString("street"),
                    rs.getString("suite"),
                    rs.getString("city"),
                    rs.getString("zipcode"),
                    geo,
                    rs.getTimestamp("address_created_at"),
                    rs.getTimestamp("address_updated_at")
            );
            var company = new Company(
                    rs.getInt("company_id"),
                    rs.getString("company_name"),
                    rs.getString("catch_phrase"),
                    rs.getString("bs"),
                    rs.getTimestamp("company_created_at"),
                    rs.getTimestamp("company_updated_at"));
            return new User(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("username"),
                    rs.getString("email"),
                    rs.getString("phone"),
                    rs.getString("website"),
                    address,
                    company,
                    rs.getTimestamp("created_at"),
                    rs.getTimestamp("updated_at"));
        };

        return jdbcTemplate.query
            (sql, mapper, limit, offset);
    }
}
