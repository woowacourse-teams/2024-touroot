package kr.touroot.global.dto;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class PageDeserializer extends JsonDeserializer<PageImpl<?>> {

    @Override
    public PageImpl<?> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        JsonNode node = p.getCodec().readTree(p);

        // Deserialize content
        JsonNode contentNode = node.get("content");
        List<Object> content = new ArrayList<>();
        if (contentNode.isArray()) {
            content = p.getCodec().treeToValue(contentNode, List.class);
        }

        // Deserialize pageable
        JsonNode pageableNode = node.get("pageable");
        PageRequest pageable = p.getCodec().treeToValue(pageableNode, PageRequest.class);

        // Deserialize other fields
        long totalElements = node.get("totalElements").asLong();

        return new PageImpl<>(content, pageable, totalElements);
    }
}

