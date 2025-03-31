package jaeyeon.todoapi.service;

import jaeyeon.todoapi.domain.Post;
import jaeyeon.todoapi.domain.PostStatistic;
import jaeyeon.todoapi.repository.PostRepository;
import jaeyeon.todoapi.repository.PostStatisticsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostStatisticsRepository postStatisticsRepository;

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
    }

    public List<PostStatistic> getPostCountByMonth() {
        return postStatisticsRepository.getPostCountByMonth();
    }
}
