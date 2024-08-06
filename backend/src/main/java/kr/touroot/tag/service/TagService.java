package kr.touroot.tag.service;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.tag.domain.Tag;
import kr.touroot.tag.dto.TagCreateRequest;
import kr.touroot.tag.dto.TagResponse;
import kr.touroot.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TagService {

    private final TagRepository tagRepository;

    @Transactional
    public TagResponse createTag(TagCreateRequest tagCreateRequest) {
        validateDuplicated(tagCreateRequest);
        Tag savedTage = tagRepository.save(tagCreateRequest.toTag());

        return TagResponse.from(savedTage);
    }

    private void validateDuplicated(TagCreateRequest tagCreateRequest) {
        if (tagRepository.existsByTag(tagCreateRequest.tag())) {
            throw new BadRequestException("이미 존재하는 태그입니다.");
        }
    }
}
