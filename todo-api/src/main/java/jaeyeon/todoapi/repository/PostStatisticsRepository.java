package jaeyeon.todoapi.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import jaeyeon.todoapi.domain.PostStatistic;

@Repository
public class PostStatisticsRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private final RowMapper<PostStatistic> mapper = (rs, rowNum) -> {
        return new PostStatistic(rs.getInt("user_id"),
                rs.getInt("post_count"),
                rs.getInt("year"),
                rs.getInt("month"),
                rs.getDouble("increase_rate"));
    };

    public List<PostStatistic> getPostCountByMonth() {
        var sql = """
                WITH PostStat AS (
                    SELECT user_id, count(*) AS post_count,
                    EXTRACT(YEAR FROM created_at) AS year,
                    EXTRACT(MONTH FROM created_at) AS month
                    FROM posts
                    GROUP BY user_id, EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at)
                ), PostPreStat AS (
                    SELECT user_id, post_count, year, month,
                    LAG(post_count,1,0) OVER (PARTITION BY user_id ORDER BY year, month) AS prev_post_count
                    FROM PostStat
                )
                SELECT user_id, post_count, year, month,
                CASE WHEN prev_post_count = 0 THEN 0 ELSE ((post_count - prev_post_count) / prev_post_count * 100) END AS increase_rate
                FROM PostPreStat
                ORDER BY user_id, year, month;
                """;

        return jdbcTemplate.query(sql, mapper);
    }

}
