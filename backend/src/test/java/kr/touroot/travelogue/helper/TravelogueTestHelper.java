package kr.touroot.travelogue.helper;

import static kr.touroot.authentication.fixture.MemberFixture.MEMBER_KAKAO;
import static kr.touroot.place.fixture.PlaceFixture.PLACE;
import static kr.touroot.travelogue.fixture.TravelogueDayFixture.TRAVELOGUE_DAY;
import static kr.touroot.travelogue.fixture.TravelogueFixture.TRAVELOGUE;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO;
import static kr.touroot.travelogue.fixture.TraveloguePlaceFixture.TRAVELOGUE_PLACE;

import kr.touroot.member.domain.LoginType;
import kr.touroot.member.domain.Member;
import kr.touroot.member.repository.MemberRepository;
import kr.touroot.place.domain.Place;
import kr.touroot.place.repository.PlaceRepository;
import kr.touroot.tag.domain.Tag;
import kr.touroot.tag.fixture.TagFixture;
import kr.touroot.tag.repository.TagRepository;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.domain.TravelogueTag;
import kr.touroot.travelogue.repository.TravelogueDayRepository;
import kr.touroot.travelogue.repository.TraveloguePhotoRepository;
import kr.touroot.travelogue.repository.TraveloguePlaceRepository;
import kr.touroot.travelogue.repository.TravelogueRepository;
import kr.touroot.travelogue.repository.TravelogueTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TravelogueTestHelper {

    private final PlaceRepository placeRepository;
    private final TravelogueRepository travelogueRepository;
    private final TravelogueDayRepository travelogueDayRepository;
    private final TraveloguePlaceRepository traveloguePlaceRepository;
    private final TraveloguePhotoRepository traveloguePhotoRepository;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;
    private final TravelogueTagRepository travelogueTagRepository;

    @Autowired
    public TravelogueTestHelper(
            PlaceRepository placeRepository,
            TravelogueRepository travelogueRepository,
            TravelogueDayRepository travelogueDayRepository,
            TraveloguePlaceRepository traveloguePlaceRepository,
            TraveloguePhotoRepository traveloguePhotoRepository,
            MemberRepository memberRepository,
            TagRepository tagRepository,
            TravelogueTagRepository travelogueTagRepository
    ) {
        this.placeRepository = placeRepository;
        this.travelogueRepository = travelogueRepository;
        this.travelogueDayRepository = travelogueDayRepository;
        this.traveloguePlaceRepository = traveloguePlaceRepository;
        this.traveloguePhotoRepository = traveloguePhotoRepository;
        this.memberRepository = memberRepository;
        this.tagRepository = tagRepository;
        this.travelogueTagRepository = travelogueTagRepository;
    }

    public Travelogue initTravelogueTestData() {
        Member author = persistMember();
        return initTravelogueTestData(author);
    }

    public Travelogue initTravelogueTestData(Member author) {
        Travelogue travelogue = persistTravelogue(author);
        TravelogueDay day = persistTravelogueDay(travelogue);
        Place position = persistPlace();
        TraveloguePlace place = persistTraveloguePlace(position, day);
        persistTraveloguePhoto(place);

        return travelogue;
    }

    public Travelogue initTravelogueTestDataWithTag(Member author) {
        Travelogue travelogue = persistTravelogue(author);
        TravelogueDay day = persistTravelogueDay(travelogue);
        Place position = persistPlace();
        TraveloguePlace place = persistTraveloguePlace(position, day);
        persistTraveloguePhoto(place);
        persisTravelogueTag(travelogue);

        return travelogue;
    }

    private void persisTravelogueTag(Travelogue travelogue) {
        Tag tag = initTagTestData();
        travelogueTagRepository.save(new TravelogueTag(travelogue, tag));
    }

    public void initTravelogueTestDate(Member author) {
        Travelogue travelogue = persistTravelogue(author);
        TravelogueDay day = persistTravelogueDay(travelogue);
        Place position = persistPlace();
        TraveloguePlace place = persistTraveloguePlace(position, day);
        persistTraveloguePhoto(place);
    }

    public Member persistMember() {
        Member author = MEMBER_KAKAO.getMember();

        return memberRepository.save(author);
    }

    public Travelogue persistTravelogue(Member author) {
        Travelogue travelogue = TRAVELOGUE.create(author);

        return travelogueRepository.save(travelogue);
    }

    public TravelogueDay persistTravelogueDay(Travelogue travelogue) {
        TravelogueDay day = TRAVELOGUE_DAY.create(1, travelogue);

        return travelogueDayRepository.save(day);
    }

    public Place persistPlace() {
        Place place = PLACE.get();

        return placeRepository.save(place);
    }

    public TraveloguePlace persistTraveloguePlace(Place position, TravelogueDay day) {
        TraveloguePlace place = TRAVELOGUE_PLACE.create(position, day);

        return traveloguePlaceRepository.save(place);
    }

    public TraveloguePhoto persistTraveloguePhoto(TraveloguePlace place) {
        TraveloguePhoto photo = TRAVELOGUE_PHOTO.create(place);

        return traveloguePhotoRepository.save(photo);
    }

    public Member initKakaoMemberTestData() {
        Member member = new Member(1L, "리비", "https://dev.touroot.kr/temporary/profile.png", LoginType.KAKAO);
        return memberRepository.save(member);
    }

    public Tag initTagTestData() {
        return tagRepository.save(TagFixture.TAG.get());
    }
}
