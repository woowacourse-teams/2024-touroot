package kr.touroot.tag.service;

import java.util.List;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.tag.domain.Tag;
import kr.touroot.tag.dto.TagCreateRequest;
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

    @Transactional
    public TagResponse createTag(TagCreateRequest tagCreateRequest) {
        validateDuplicated(tagCreateRequest);
        Tag savedTag = tagRepository.save(tagCreateRequest.toTag());

        return TagResponse.from(savedTag);
    }

    private void validateDuplicated(TagCreateRequest tagCreateRequest) {
        if (tagRepository.existsByTag(tagCreateRequest.tag())) {
            throw new BadRequestException("이미 존재하는 태그입니다.");
        }
    }

    @Cacheable(cacheNames = "tag")
    @Transactional(readOnly = true)
    public List<TagResponse> readTags() {
        return tagRepository.findAll().stream()
                .map(TagResponse::from)
                .toList();
    }
}
