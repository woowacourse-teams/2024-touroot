package kr.touroot.global.util;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

public class PageDeserializer extends JsonDeserializer<PageImpl<?>> {

    @Override
    public PageImpl<?> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        List<Object> content = new ArrayList<>();
        int pageNumber = 0;
        int pageSize = 0;
        long totalElements = 0;
        Sort sort = Sort.unsorted();

        if (p.getCurrentToken() != JsonToken.START_OBJECT) {
            throw new JsonParseException("Page 객체를 역직렬화하는 과정에서 예외가 발생했습니다.");
        }

        while (p.nextToken() != JsonToken.END_OBJECT) {
            String fieldName = p.getCurrentName();
            p.nextToken();

            if (fieldName == null) {
                continue;
            }

            if (fieldName.equals("content") && p.getCurrentToken() == JsonToken.START_ARRAY) {
                content = ctxt.readValue(
                        p,
                        ctxt.getTypeFactory().constructCollectionType(List.class, Object.class)
                );
                continue;
            }

            if (fieldName.equals("number")) {
                pageNumber = p.getIntValue();
                continue;
            }

            if (fieldName.equals("size")) {
                pageSize = p.getIntValue();
                continue;
            }

            if (fieldName.equals("totalElements")) {
                totalElements = p.getLongValue();
                continue;
            }

            if (fieldName.equals("sort") && p.getCurrentToken() == JsonToken.START_OBJECT) {
                sort = ctxt.readValue(p, Sort.class);
                continue;
            }

            p.skipChildren();
        }

        PageRequest pageable = PageRequest.of(pageNumber, pageSize, sort);
        return new PageImpl<>(content, pageable, totalElements);
    }
}

