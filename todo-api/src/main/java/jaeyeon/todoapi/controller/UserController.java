package jaeyeon.todoapi.controller;

import jaeyeon.todoapi.domain.User;
import jaeyeon.todoapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/")
    public List<User> GetAllUsers(
            @RequestParam(name="offset") int offset,
            @RequestParam(name="limit") int limit
    ){
        return userService.getAllUsers(offset, limit);
    }

}
