package kr.touroot.travelogue.service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.member.service.MemberService;
import kr.touroot.tag.dto.TagResponse;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.dto.request.TravelogueSearchRequest;
import kr.touroot.travelogue.dto.response.TravelogueDayResponse;
import kr.touroot.travelogue.dto.response.TraveloguePlaceResponse;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
import kr.touroot.travelogue.dto.response.TravelogueSimpleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    private final TravelogueTagService travelogueTagService;
    private final MemberService memberService;

    @Transactional
    public TravelogueResponse createTravelogue(MemberAuth member, TravelogueRequest request) {
        Member author = memberService.getById(member.memberId());
        Travelogue travelogue = travelogueService.createTravelogue(author, request);
        List<TagResponse> tags = travelogueTagService.createTravelogueTags(travelogue, request.tags());
        return TravelogueResponse.of(travelogue, createDays(request.days(), travelogue), tags);
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
        return getTravelogueResponse(travelogue);
    }

    private TravelogueResponse getTravelogueResponse(Travelogue travelogue) {
        List<TagResponse> tagResponses = travelogueTagService.readTagByTravelogue(travelogue);
        return TravelogueResponse.of(travelogue, findDaysOfTravelogue(travelogue), tagResponses);
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

    @Transactional(readOnly = true)
    public Page<TravelogueSimpleResponse> findSimpleTravelogues(final Pageable pageable) {
        Page<Travelogue> travelogues = travelogueService.findAll(pageable);

        return travelogues.map(this::getTravelogueSimpleResponse);
    }

    @Transactional(readOnly = true)
    public Page<TravelogueSimpleResponse> findSimpleTravelogues(Pageable pageable, TravelogueSearchRequest request) {
        Page<Travelogue> travelogues = travelogueService.findByKeyword(request.keyword(), pageable);

        return travelogues.map(this::getTravelogueSimpleResponse);
    }

    private TravelogueSimpleResponse getTravelogueSimpleResponse(Travelogue travelogue) {
        List<TagResponse> tagResponses = travelogueTagService.readTagByTravelogue(travelogue);
        return TravelogueSimpleResponse.of(travelogue, tagResponses);
    }

    @Transactional
    public TravelogueResponse updateTravelogue(Long id, MemberAuth member, TravelogueRequest request) {
        Member author = memberService.getById(member.memberId());
        Travelogue travelogue = travelogueService.getTravelogueById(id);

        Travelogue updatedTravelogue = travelogueService.update(id, author, request);
        List<TagResponse> tags = travelogueTagService.updateTravelogueTags(travelogue, request.tags());

        clearTravelogueContents(travelogue);

        return TravelogueResponse.of(updatedTravelogue, createDays(request.days(), updatedTravelogue), tags);
    }

    private void clearTravelogueContents(Travelogue travelogue) {
        traveloguePhotoService.deleteAllByTravelogue(travelogue);
        traveloguePlaceService.deleteAllByTravelogue(travelogue);
        travelogueDayService.deleteAllByTravelogue(travelogue);
    }

    @Transactional
    public void deleteTravelogueById(Long id, MemberAuth member) {
        Member author = memberService.getById(member.memberId());
        Travelogue travelogue = travelogueService.getTravelogueById(id);
        travelogueService.validateAuthor(travelogue, author);

        clearTravelogueContents(travelogue);
        travelogueService.delete(travelogue, author);
    }
}
