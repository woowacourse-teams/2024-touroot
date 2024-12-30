package kr.touroot.travelogue.service;

import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.repository.TraveloguePhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TraveloguePhotoService {

    private final TraveloguePhotoRepository traveloguePhotoRepository;

    public TraveloguePhoto save(TraveloguePhoto traveloguePhoto) {
        return traveloguePhotoRepository.save(traveloguePhoto);
    }
}
