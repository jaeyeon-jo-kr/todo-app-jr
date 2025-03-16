# 1. OpenJDK 기반 이미지 사용
FROM openjdk:17-jdk-slim

# 2. JAR 파일을 컨테이너에 복사
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} ./

# 3. 실행 포트 설정
EXPOSE 8080

# 4. 컨테이너 실행 시 애플리케이션 시작
ENTRYPOINT ["java", "-jar", "/todo-api-0.0.1-SNAPSHOT.jar"]
