package kr.touroot.travelogue.service;

import java.util.List;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.tag.domain.Tag;
import kr.touroot.tag.repository.TagRepository;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueTag;
import kr.touroot.travelogue.repository.TravelogueTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TravelogueTagService {

    private final TagRepository tagRepository;
    private final TravelogueTagRepository travelogueTagRepository;

    public List<Tag> createTravelogueTags(Travelogue travelogue, List<Long> tagIds) {
        return tagIds.stream()
                .map(id -> createTravelogueTag(travelogue, id))
                .toList();
    }

    private Tag createTravelogueTag(Travelogue travelogue, Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 태그입니다."));
        travelogueTagRepository.save(new TravelogueTag(travelogue, tag));
        return tag;
    }

    public List<Tag> readTagByTravelogue(Travelogue travelogue) {
        return travelogueTagRepository.findAllByTravelogue(travelogue).stream()
                .map(TravelogueTag::getTag)
                .toList();
    }
}
