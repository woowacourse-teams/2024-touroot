package kr.touroot.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectMapper.DefaultTyping;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.time.Duration;
import kr.touroot.global.util.PageDeserializer;
import kr.touroot.global.util.SortDeserializer;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext.SerializationPair;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class CacheConfig {

    private static final Duration CACHE_TTL = Duration.ofMinutes(30);

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        return RedisCacheManager.builder(connectionFactory)
                .cacheDefaults(getRedisCacheConfiguration())
                .build();
    }

    private RedisCacheConfiguration getRedisCacheConfiguration() {
        SerializationPair<String> keySerializationPair = SerializationPair.fromSerializer(new StringRedisSerializer());
        SerializationPair<Object> valueSerializationPair = SerializationPair.fromSerializer(
                new GenericJackson2JsonRedisSerializer(getObjectMapperForRedisCacheManager())
        );

        return RedisCacheConfiguration.defaultCacheConfig()
                .serializeKeysWith(keySerializationPair)
                .serializeValuesWith(valueSerializationPair)
                .entryTtl(CACHE_TTL)
                .disableCachingNullValues();
    }

    private ObjectMapper getObjectMapperForRedisCacheManager() {
        ObjectMapper objectMapper = new ObjectMapper();

        SimpleModule pageModule = new SimpleModule();
        pageModule.addDeserializer(PageImpl.class, new PageDeserializer());
        pageModule.addDeserializer(Sort.class, new SortDeserializer());

        objectMapper.registerModules(new JavaTimeModule(), pageModule);
        objectMapper.activateDefaultTyping(
                BasicPolymorphicTypeValidator.builder().allowIfBaseType(Object.class).build(),
                DefaultTyping.EVERYTHING
        );

        return objectMapper;
    }
}
