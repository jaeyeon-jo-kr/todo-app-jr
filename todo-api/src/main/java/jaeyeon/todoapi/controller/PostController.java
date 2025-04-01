package jaeyeon.todoapi.controller;

import jaeyeon.todoapi.domain.Post;
import jaeyeon.todoapi.domain.PostStatistic;
import jaeyeon.todoapi.service.PostService;
import jaeyeon.todoapi.service.pdf.PostStaticService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private PostStaticService postStaticService;

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

    @PostMapping("/new")
    public void createPost(Post newPost) {
        postService.createPost(newPost);
    }

    @GetMapping("/stats")
    public List<PostStatistic> getPostCountByMonth() {
        return postService.getPostCountByMonth();
    }

    @GetMapping("/stats/pdf")
    public ResponseEntity<Resource> createPdf() {
        postStaticService.createPdf();
        try {
            // Load file from resources/static
            Resource resource = new FileSystemResource("postStatistics.pdf");
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + resource.getFilename());

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
