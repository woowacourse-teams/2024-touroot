package kr.touroot.global.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

public class SortDeserializer extends JsonDeserializer<Sort> {

    @Override
    public Sort deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        List<Sort.Order> orders = new ArrayList<>();

        // Sort는 객체이고, 그 안에 Order가 들어있다
        if (p.getCurrentToken() == JsonToken.START_OBJECT) {
            while (p.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = p.getCurrentName();
                p.nextToken(); // move to value
                if ("empty".equals(fieldName) || "unsorted".equals(fieldName) || "sorted".equals(fieldName)) {
                    // 빈 필드는 무시
                } else if ("orders".equals(fieldName)) {
                    if (p.getCurrentToken() == JsonToken.START_ARRAY) {
                        while (p.nextToken() != JsonToken.END_ARRAY) {
                            String direction = null;
                            String property = null;

                            while (p.nextToken() != JsonToken.END_OBJECT) {
                                if ("property".equals(p.getCurrentName())) {
                                    property = p.getText();
                                } else if ("direction".equals(p.getCurrentName())) {
                                    direction = p.getText();
                                }
                            }

                            // 방향 값을 받아서 Order를 만들어서 List에 추가
                            if (property != null && direction != null) {
                                orders.add(new Sort.Order(Direction.fromString(direction), property));
                            }
                        }
                    }
                }
            }
        }

        // orders가 없다면 빈 Sort로 반환
        return orders.isEmpty() ? Sort.unsorted() : Sort.by(orders);
    }
}
