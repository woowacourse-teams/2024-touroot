package kr.touroot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableCaching
@EnableJpaAuditing
@SpringBootApplication
public class TourootApplication {

    public static void main(String[] args) {
        SpringApplication.run(TourootApplication.class, args);
    }
}
