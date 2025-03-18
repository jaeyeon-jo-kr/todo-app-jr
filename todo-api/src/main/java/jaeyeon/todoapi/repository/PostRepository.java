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
    public List<Post> findAll(){
        var sql = """
            SELECT id,
                user_id,
                title,
                body,
                created_at,
                updated_at
            FROM posts""";
         RowMapper<Post> mapper = (rs, rowNum) -> {
            return new Post(rs.getInt("id"),
                    rs.getInt("user_id"),
                    rs.getString("title"),
                    rs.getString("body"),
                    rs.getTimestamp("created_at"),
                    rs.getTimestamp("updated_at"));
        };
        return jdbcTemplate
                .query(sql, mapper);
    }
    public Post findById(int id)
    {
        var sql = """
            SELECT id,
                user_id,
                title,
                body,
                created_at,
                updated_at
            FROM posts
            WHERE id=?""";
        RowMapper<Post> mapper = (rs, rowNum) -> {
            return new Post(rs.getInt("id"),
                    rs.getInt("user_id"),
                    rs.getString("title"),
                    rs.getString("body"),
                    rs.getTimestamp("created_at"),
                    rs.getTimestamp("updated_at"));
        };
        return jdbcTemplate.queryForObject(sql, mapper, id);
    }
}
