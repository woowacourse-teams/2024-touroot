package kr.touroot.travelogue.service;

import java.util.List;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.tag.domain.Tag;
import kr.touroot.tag.repository.TagRepository;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueTag;
import kr.touroot.travelogue.repository.TravelogueTagRepository;
import kr.touroot.travelogue.repository.query.TravelogueTagQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelogueTagService {

    private final TagRepository tagRepository;
    private final TravelogueTagRepository travelogueTagRepository;
    private final TravelogueTagQueryRepository travelogueTagQueryRepository;

    @Transactional
    public List<TravelogueTag> createTravelogueTags(Travelogue travelogue, List<Long> tagIds) {
        return tagIds.stream()
                .map(id -> {
                    Tag tag = getTagById(id);
                    return travelogueTagRepository.save(new TravelogueTag(travelogue, tag));
                }).toList();
    }

    private Tag getTagById(Long id) {
        return tagRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 태그입니다."));
    }

    @Transactional(readOnly = true)
    public List<TravelogueTag> readTagByTravelogue(Travelogue travelogue) {
        return travelogueTagRepository.findAllByTravelogue(travelogue);
    }

    @Transactional
    public List<TravelogueTag> updateTravelogueTag(Travelogue travelogue, List<Long> tagIds) {
        deleteAllByTravelogue(travelogue);
        return createTravelogueTags(travelogue, tagIds);
    }

    @Transactional
    public void deleteAllByTravelogue(Travelogue travelogue) {
        travelogueTagQueryRepository.deleteAllByTravelogue(travelogue);
    }
}
