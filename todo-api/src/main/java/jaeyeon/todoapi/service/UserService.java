package jaeyeon.todoapi.service;

import jaeyeon.todoapi.domain.User;
import jaeyeon.todoapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(int offset, int limit){
        return userRepository.getUsers(offset, limit);
    }
}
