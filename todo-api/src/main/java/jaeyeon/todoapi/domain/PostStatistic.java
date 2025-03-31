package jaeyeon.todoapi.domain;

public record PostStatistic(
        int userId,
        int postCount,
        int year,
        int month,
        double increaseRate) {

}
