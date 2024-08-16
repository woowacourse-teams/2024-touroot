package kr.touroot.global.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import kr.touroot.travelogue.repository.query.TravelogueQueryRepository;
import kr.touroot.travelogue.repository.query.TravelogueQueryRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

@RequiredArgsConstructor
@TestConfiguration
public class TestQueryDslConfig {

    @PersistenceContext
    private final EntityManager entityManager;

    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        return new JPAQueryFactory(entityManager);
    }

    @Bean
    public TravelogueQueryRepository travelogueQueryRepository() {
        return new TravelogueQueryRepositoryImpl(jpaQueryFactory());
    }
}
