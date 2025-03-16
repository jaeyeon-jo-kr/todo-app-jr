package jaeyeon.todoapi.mapper;

import jaeyeon.todoapi.domain.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PostMapper {

    @Select("SELECT COUNT(*) FROM posts")
    int getCount();
    @Select("SELECT * FROM posts")
    List<Post> findAll();

    @Select("SELECT * FROM posts WHERE id=#{id} LIMIT 1")
    Post findById(int id);

}
