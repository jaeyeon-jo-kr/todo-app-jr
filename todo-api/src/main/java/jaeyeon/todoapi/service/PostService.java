package jaeyeon.todoapi.service;

import jaeyeon.todoapi.domain.Post;
import jaeyeon.todoapi.mapper.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostMapper postMapper;

    public List<Post> getAllPosts(){
        return postMapper.findAll();
    }

    public Post getPostsById(int id){
        return postMapper.findById(id);
    }
}
