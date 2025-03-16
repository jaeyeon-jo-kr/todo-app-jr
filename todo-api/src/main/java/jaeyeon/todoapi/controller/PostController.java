package jaeyeon.todoapi.controller;


import jaeyeon.todoapi.domain.Post;
import jaeyeon.todoapi.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/")
    public List<Post> getPosts(){
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable("id") int id){
        return postService.getPostsById(id);
    }
}
