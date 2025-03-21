package jaeyeon.todoapi.repository;

import jaeyeon.todoapi.domain.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

@Repository
public class PostRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Post> mapper = (rs, rowNum) -> {
        return new Post(rs.getInt("id"),
                rs.getInt("user_id"),
                "",
                rs.getString("title"),
                rs.getString("body"),
                rs.getTimestamp("created_at"),
                rs.getTimestamp("updated_at"));
    };

    public List<Post> findAll(int offset, int limit) {
        var sql = """
                SELECT id,
                    user_id,
                    title,
                    body,
                    created_at,
                    updated_at
                FROM posts
                LIMIT ?
                OFFSET ?
                """;

        return jdbcTemplate
                .query(sql, mapper, limit, offset);
    }

    public Post findById(int id) {
        var sql = """
                SELECT id,
                    user_id,
                    title,
                    body,
                    created_at,
                    updated_at
                FROM posts
                WHERE id=?""";
        return jdbcTemplate.queryForObject(sql, mapper, id);
    }

    public int count() {
        var sql = """
                SELECT COUNT(*)
                FROM posts""";
        Integer cnt = jdbcTemplate.queryForObject(sql, Integer.class);
        return cnt == null ? 0 : cnt;
    }
}
