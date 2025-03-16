package jaeyeon.todoapi.domain;

import lombok.Data;


public record Post(int id, int userId, String title, String body) {
}
