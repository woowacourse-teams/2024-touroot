package kr.touroot.tag.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import java.time.Duration;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager("tag");
        cacheManager.setCaffeine(caffeineConfig());

        return cacheManager;
    }

    private Caffeine<Object, Object> caffeineConfig() {
        return Caffeine.newBuilder()
                .expireAfterWrite(Duration.ofDays(1));
    }
}
