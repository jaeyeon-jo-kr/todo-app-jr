package jaeyeon.todoapi;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class TodoApiApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void test() throws IOException {
		TodoApiApplication.main(new String[]{});
	}

}
