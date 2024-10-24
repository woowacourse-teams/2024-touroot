package kr.touroot.tag.service;

import java.util.List;
import kr.touroot.tag.dto.TagResponse;
import kr.touroot.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class TagService {

    private final TagRepository tagRepository;

    @Cacheable(cacheNames = "tag")
    @Transactional(readOnly = true)
    public List<TagResponse> readTags() {
        return tagRepository.findAll().stream()
                .map(TagResponse::from)
                .toList();
    }
}
