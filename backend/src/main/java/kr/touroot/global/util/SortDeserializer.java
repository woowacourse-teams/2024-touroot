package kr.touroot.global.util;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;

public class SortDeserializer extends JsonDeserializer<Sort> {

    @Override
    public Sort deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        List<Sort.Order> orders = new ArrayList<>();
        boolean sorted = false;

        if (p.getCurrentToken() != JsonToken.START_OBJECT) {
            throw new JsonParseException("Sort 객체를 역직렬화하는 과정에서 예외가 발생했습니다.");
        }

        while (p.nextToken() != JsonToken.END_OBJECT) {
            String fieldName = p.getCurrentName();
            p.nextToken();

            if (fieldName.equals("sorted")) {
                sorted = p.getBooleanValue();
                continue;
            }

            if (fieldName.equals("orders")) {
                deserializeOrders(p, orders);
                continue;
            }

            p.skipChildren();
        }

        if (sorted) {
            return Sort.by(Sort.Order.asc("dummy"));
        }

        return Sort.unsorted();
    }

    private void deserializeOrders(JsonParser p, List<Order> orders) throws IOException {
        if (p.getCurrentToken() != JsonToken.START_ARRAY) {
            throw new JsonParseException("Sort.orders 객체를 역직렬화하는 과정에서 예외가 발생했습니다.");
        }

        while (p.nextToken() != JsonToken.END_ARRAY) {
            String direction = null;
            String property = null;

            while (p.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = p.getCurrentName();

                if (fieldName.equals("property")) {
                    property = p.getText();
                    continue;
                }

                if (fieldName.equals("direction")) {
                    direction = p.getText();
                }
            }

            if (property != null && direction != null) {
                orders.add(new Order(Direction.fromString(direction), property));
            }
        }
    }
}
