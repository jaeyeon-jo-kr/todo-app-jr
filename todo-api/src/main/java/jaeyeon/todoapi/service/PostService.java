package jaeyeon.todoapi.service;

import jaeyeon.todoapi.domain.Post;
import jaeyeon.todoapi.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    public Post getPostsById(int id){
        return postRepository.findById(id);
    }
}
