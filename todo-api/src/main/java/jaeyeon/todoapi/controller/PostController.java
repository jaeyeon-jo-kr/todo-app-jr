package jaeyeon.todoapi.controller;

import jaeyeon.todoapi.domain.Post;
import jaeyeon.todoapi.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("")
    public List<Post> getPosts(@RequestParam(name = "offset") int offset,
            @RequestParam(name = "limit") int limit) {
        return postService.getAllPosts(offset, limit);
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable("id") int id) {
        return postService.getPostsById(id);
    }

    @GetMapping("/cnt")
    public int getPostsCount() {
        return postService.getPostsCount();
    }
}
