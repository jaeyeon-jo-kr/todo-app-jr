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

    public List<Post> getAllPosts(int offset, int limit) {
        return postRepository.findAll(offset, limit);
    }

    public Post getPostsById(int id) {
        return postRepository.findById(id);
    }

    public int getPostsCount() {
        return postRepository.count();
    }

    public void createPost(Post newPost) {
        postRepository.createPost(newPost);
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createPost'");
    }
}
