package kr.touroot.travelogue.helper;

import static kr.touroot.travelogue.fixture.TravelogueCountryFixture.TRAVELOGUE_COUNTRY;
import static kr.touroot.travelogue.fixture.TravelogueDayFixture.TRAVELOGUE_DAY;
import static kr.touroot.travelogue.fixture.TravelogueFixture.TRAVELOGUE;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO;
import static kr.touroot.travelogue.fixture.TraveloguePlaceFixture.TRAVELOGUE_PLACE;
import static kr.touroot.travelogue.fixture.TraveloguePlaceFixture.TRAVELOGUE_PLACE_WITH_NONE_COUNTRY_CODE;

import java.util.List;
import kr.touroot.member.domain.LoginType;
import kr.touroot.member.domain.Member;
import kr.touroot.member.fixture.MemberFixture;
import kr.touroot.member.repository.MemberRepository;
import kr.touroot.tag.domain.Tag;
import kr.touroot.tag.fixture.TagFixture;
import kr.touroot.tag.repository.TagRepository;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueCountry;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TravelogueLike;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.domain.TravelogueTag;
import kr.touroot.travelogue.repository.TravelogueCountryRepository;
import kr.touroot.travelogue.repository.TravelogueDayRepository;
import kr.touroot.travelogue.repository.TravelogueLikeRepository;
import kr.touroot.travelogue.repository.TraveloguePhotoRepository;
import kr.touroot.travelogue.repository.TraveloguePlaceRepository;
import kr.touroot.travelogue.repository.TravelogueRepository;
import kr.touroot.travelogue.repository.TravelogueTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TravelogueTestHelper {

    private final TravelogueRepository travelogueRepository;
    private final TravelogueDayRepository travelogueDayRepository;
    private final TraveloguePlaceRepository traveloguePlaceRepository;
    private final TraveloguePhotoRepository traveloguePhotoRepository;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;
    private final TravelogueTagRepository travelogueTagRepository;
    private final TravelogueLikeRepository travelogueLikeRepository;
    private final TravelogueCountryRepository travelogueCountryRepository;

    @Autowired
    public TravelogueTestHelper(
            TravelogueRepository travelogueRepository,
            TravelogueDayRepository travelogueDayRepository,
            TraveloguePlaceRepository traveloguePlaceRepository,
            TraveloguePhotoRepository traveloguePhotoRepository,
            MemberRepository memberRepository,
            TagRepository tagRepository,
            TravelogueTagRepository travelogueTagRepository,
            TravelogueLikeRepository travelogueLikeRepository,
            TravelogueCountryRepository travelogueCountryRepository
    ) {
        this.travelogueRepository = travelogueRepository;
        this.travelogueDayRepository = travelogueDayRepository;
        this.traveloguePlaceRepository = traveloguePlaceRepository;
        this.traveloguePhotoRepository = traveloguePhotoRepository;
        this.memberRepository = memberRepository;
        this.tagRepository = tagRepository;
        this.travelogueTagRepository = travelogueTagRepository;
        this.travelogueLikeRepository = travelogueLikeRepository;
        this.travelogueCountryRepository = travelogueCountryRepository;
    }

    public void initAllTravelogueTestData() {
        Member author = persistMember();
        Travelogue travelogue = initTravelogueTestData(author);
        initTravelogueTestDataWithTag(author);
        persistTravelogueLike(travelogue, author);
    }

    public Travelogue initTravelogueTestData() {
        Member author = persistMember();
        return initTravelogueTestData(author);
    }

    public Travelogue initTravelogueTestDataWithoutCountryCode() {
        Member author = persistMember();
        Travelogue travelogue = persistTravelogue(author);
        TravelogueDay day = persistTravelogueDay(travelogue);
        TraveloguePlace place = persistTraveloguePlace(day);
        persistTraveloguePhoto(place);
        return travelogue;
    }

    public Travelogue initTravelogueTestDataWithSeveralDays() {
        Member author = persistMember();
        return initTravelogueTestDataWithSeveralDays(author);
    }

    public Travelogue initTravelogueTestData(Member author) {
        Travelogue travelogue = persistTravelogue(author);
        TravelogueDay day = persistTravelogueDay(travelogue);
        TraveloguePlace place = persistTraveloguePlace(day);
        persistTravelogueCountry(travelogue);
        persistTraveloguePhoto(place);

        return travelogue;
    }

    public Travelogue initTravelogueTestDataWithSeveralDays(Member author) {
        Travelogue travelogue = persistTravelogue(author);
        List<TravelogueDay> days = List.of(persistTravelogueDay(travelogue), persistTravelogueDay(travelogue));

        days.stream()
                .map(day -> persistTraveloguePlace(day))
                .map(this::persistTraveloguePhoto)
                .toList();

        return travelogue;
    }

    public Travelogue initTravelogueTestDataWithTag(Member author) {
        Travelogue travelogue = persistTravelogue(author);
        TravelogueDay day = persistTravelogueDay(travelogue);
        TraveloguePlace place = persistTraveloguePlace(day);
        persistTravelogueCountry(travelogue);
        persistTraveloguePhoto(place);
        persisTravelogueTag(travelogue, TagFixture.TAG_1.get());

        return travelogue;
    }

    public Travelogue initTravelogueTestDataWithTag(Member author, List<Tag> tags) {
        Travelogue travelogue = persistTravelogue(author);
        TravelogueDay day = persistTravelogueDay(travelogue);
        TraveloguePlace place = persistTraveloguePlace(day);
        persistTraveloguePhoto(place);

        tags.forEach(tag -> persisTravelogueTag(travelogue, tag));

        return travelogue;
    }

    public Travelogue initTravelogueTestDataWithLike(Member liker) {
        Travelogue travelogue = initTravelogueTestData();
        persistTravelogueLike(travelogue, liker);

        return travelogue;
    }

    public Travelogue initTravelogueTestDataWithNoneCountryCode() {
        Member author = persistMember();
        Travelogue travelogue = persistTravelogue(author);
        TravelogueDay day = persistTravelogueDay(travelogue);
        TraveloguePlace place = persistTraveloguePlaceWithNoneCountryCode(day);
        persistTraveloguePhoto(place);

        return travelogue;
    }

    private void persisTravelogueTag(Travelogue travelogue, Tag tag) {
        Tag savedTag = initTagTestData(tag);
        travelogueTagRepository.save(new TravelogueTag(travelogue, savedTag));
    }

    public Member persistMember() {
        Member author = MemberFixture.KAKAO_MEMBER.build();

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

    public TraveloguePlace persistTraveloguePlace(TravelogueDay day) {
        TraveloguePlace place = TRAVELOGUE_PLACE.create(day);

        return traveloguePlaceRepository.save(place);
    }

    public TraveloguePlace persistTraveloguePlaceWithNoneCountryCode(TravelogueDay day) {
        TraveloguePlace place = TRAVELOGUE_PLACE_WITH_NONE_COUNTRY_CODE.create(day);

        return traveloguePlaceRepository.save(place);
    }

    public TravelogueCountry persistTravelogueCountry(Travelogue travelogue) {
        TravelogueCountry travelogueCountry = TRAVELOGUE_COUNTRY.create(travelogue);

        return travelogueCountryRepository.save(travelogueCountry);
    }

    public TraveloguePhoto persistTraveloguePhoto(TraveloguePlace place) {
        TraveloguePhoto photo = TRAVELOGUE_PHOTO.create(place);

        return traveloguePhotoRepository.save(photo);
    }

    public TravelogueLike persistTravelogueLike(Travelogue travelogue, Member liker) {
        TravelogueLike like = new TravelogueLike(travelogue, liker);
        travelogue.increaseLikeCount();
        travelogueRepository.save(travelogue);

        return travelogueLikeRepository.save(like);
    }

    public Member initKakaoMemberTestData() {
        Member member = new Member(1L, "리비", "https://dev.touroot.kr/temporary/profile.png", LoginType.KAKAO);
        return memberRepository.save(member);
    }

    public Tag initTagTestData() {
        return tagRepository.save(TagFixture.TAG_1.get());
    }

    public Tag initTagTestData(Tag tag) {
        return tagRepository.save(tag);
    }
}
