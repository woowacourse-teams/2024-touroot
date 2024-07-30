package kr.touroot.travelogue.service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.dto.response.TravelogueDayResponse;
import kr.touroot.travelogue.dto.response.TraveloguePlaceResponse;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelogueFacadeService {

    private final TravelogueService travelogueService;
    private final TravelogueDayService travelogueDayService;
    private final TraveloguePlaceService traveloguePlaceService;
    private final TraveloguePhotoService traveloguePhotoService;

    @Transactional
    public TravelogueResponse createTravelogue(TravelogueRequest request) {
        Travelogue travelogue = travelogueService.createTravelogue(request);

        return TravelogueResponse.of(travelogue, createDays(request.days(), travelogue));
    }

    private List<TravelogueDayResponse> createDays(List<TravelogueDayRequest> requests, Travelogue travelogue) {
        Map<TravelogueDay, List<TraveloguePlaceRequest>> days = travelogueDayService.createDays(requests, travelogue);

        return days.keySet()
                .stream()
                .map(day -> TravelogueDayResponse.of(day, createPlaces(days.get(day), day)))
                .toList();
    }

    private List<TraveloguePlaceResponse> createPlaces(List<TraveloguePlaceRequest> requests, TravelogueDay day) {
        Map<TraveloguePlace, List<TraveloguePhotoRequest>> places = traveloguePlaceService.createPlaces(requests, day);

        return places.keySet()
                .stream()
                .map(place -> TraveloguePlaceResponse.of(place, createPhotos(places.get(place), place)))
                .toList();
    }

    private List<String> createPhotos(List<TraveloguePhotoRequest> requests, TraveloguePlace place) {
        List<TraveloguePhoto> photos = traveloguePhotoService.createPhotos(requests, place);

        return photos.stream()
                .map(TraveloguePhoto::getKey)
                .toList();
    }

    @Transactional(readOnly = true)
    public TravelogueResponse findTravelogueById(Long id) {
        Travelogue travelogue = travelogueService.getTravelogueById(id);

        return TravelogueResponse.of(travelogue, findDaysOfTravelogue(travelogue));
    }

    @Transactional(readOnly = true)
    public Page<TravelogueResponse> findTravelogues(final Pageable pageable) {
        Page<Travelogue> travelogues = travelogueService.findAll(pageable);

        return new PageImpl<>(travelogues.stream()
                .map(travelogue -> TravelogueResponse.of(travelogue, findDaysOfTravelogue(travelogue)))
                .toList());
    }

    private List<TravelogueDayResponse> findDaysOfTravelogue(Travelogue travelogue) {
        List<TravelogueDay> travelogueDays = travelogueDayService.findDaysByTravelogue(travelogue);

        return travelogueDays.stream()
                .sorted(Comparator.comparing(TravelogueDay::getOrder))
                .map(day -> TravelogueDayResponse.of(day, findPlacesOfTravelogueDay(day)))
                .toList();
    }

    private List<TraveloguePlaceResponse> findPlacesOfTravelogueDay(TravelogueDay travelogueDay) {
        List<TraveloguePlace> places = traveloguePlaceService.findTraveloguePlacesByDay(travelogueDay);

        return places.stream()
                .sorted(Comparator.comparing(TraveloguePlace::getOrder))
                .map(place -> TraveloguePlaceResponse.of(place, findPhotoUrlsOfTraveloguePlace(place)))
                .toList();
    }

    private List<String> findPhotoUrlsOfTraveloguePlace(TraveloguePlace place) {
        return traveloguePhotoService.findPhotoUrlsByPlace(place);
    }
}
