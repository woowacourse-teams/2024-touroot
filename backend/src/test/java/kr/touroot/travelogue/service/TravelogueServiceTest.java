package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import java.util.List;
import kr.touroot.global.ServiceTest;
import kr.touroot.global.config.TestQueryDslConfig;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueFilterCondition;
import kr.touroot.travelogue.domain.search.SearchCondition;
import kr.touroot.travelogue.domain.search.SearchType;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.fixture.TravelogueFixture;
import kr.touroot.travelogue.fixture.TravelogueRequestFixture;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@DisplayName("여행기 서비스")
@Import(value = {TravelogueService.class, TravelogueTestHelper.class, TestQueryDslConfig.class})
@ServiceTest
class TravelogueServiceTest {

    private final TravelogueService travelogueService;
    private final DatabaseCleaner databaseCleaner;
    private final TravelogueTestHelper testHelper;

    @Autowired
    public TravelogueServiceTest(
            TravelogueService travelogueService,
            DatabaseCleaner databaseCleaner,
            TravelogueTestHelper testHelper
    ) {
        this.travelogueService = travelogueService;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    private static List<TravelogueDayRequest> getTravelogueDayRequests() {
        List<TraveloguePhotoRequest> photos = TravelogueRequestFixture.getTraveloguePhotoRequests();
        List<TraveloguePlaceRequest> places = TravelogueRequestFixture.getTraveloguePlaceRequests(photos);
        return TravelogueRequestFixture.getTravelogueDayRequests(places);
    }

    @DisplayName("여행기를 저장할 수 있다")
    @Test
    void saveTravelogue() {
        Member member = testHelper.initKakaoMemberTestData();
        Travelogue travelogue = TravelogueFixture.JEJU_TRAVELOGUE.getTravelogueOwnedBy(member);

        Travelogue saved = travelogueService.save(travelogue);
        assertThat(saved.isAuthor(member)).isTrue();
    }

    @DisplayName("여행기는 ID를 기준으로 조회할 수 있다.")
    @Test
    void getTravelogueById() {
        testHelper.initTravelogueTestData();

        assertDoesNotThrow(() -> travelogueService.getTravelogueById(1L));
    }

    @DisplayName("존재하지 않는 ID로 여행기를 조회하면 예외가 발생한다.")
    @Test
    void getTravelogueByNotExistsIdThrowException() {
        assertThatThrownBy(() -> travelogueService.getTravelogueById(1L))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기입니다.");
    }

    @DisplayName("여행기를 검색할 수 있다.")
    @Test
    void findByKeyword() {
        // given
        testHelper.initTravelogueTestData();

        SearchCondition searchCondition = new SearchCondition("제주", SearchType.TITLE);
        TravelogueFilterCondition filter = new TravelogueFilterCondition(null, null);
        PageRequest pageRequest = PageRequest.of(0, 5, Sort.by("createdAt"));

        // when
        Page<Travelogue> actual = travelogueService.findAll(searchCondition, filter, pageRequest);

        // then
        assertThat(actual).hasSize(1);
    }

    @DisplayName("존재하지 않는 키워드로 여행기를 조회하면 빈 페이지가 반환된다.")
    @Test
    void findByKeywordWithNotExistRequest() {
        // given
        testHelper.initTravelogueTestData();

        SearchCondition searchCondition = new SearchCondition("서울", SearchType.TITLE);
        TravelogueFilterCondition filter = new TravelogueFilterCondition(null, null);
        PageRequest pageRequest = PageRequest.of(0, 5, Sort.by("createdAt"));

        // when
        Page<Travelogue> actual = travelogueService.findAll(searchCondition, filter, pageRequest);

        // then
        assertThat(actual).isEmpty();
    }

    @DisplayName("존재하지 않는 국가로 여행기를 조회하면 빈 페이지가 반환된다.")
    @Test
    void findByKeywordWithNotExistCountryRequest() {
        // given
        testHelper.initTravelogueTestData();

        SearchCondition searchCondition = new SearchCondition("미역국", SearchType.TITLE);
        TravelogueFilterCondition filter = new TravelogueFilterCondition(null, null);
        PageRequest pageRequest = PageRequest.of(0, 5, Sort.by("createdAt"));

        // when
        Page<Travelogue> actual = travelogueService.findAll(searchCondition, filter, pageRequest);

        // then
        assertThat(actual).isEmpty();
    }

    @DisplayName("여행기를 수정할 수 있다.")
    @Test
    void updateTravelogue() {
        Member author = testHelper.initKakaoMemberTestData();
        testHelper.initTravelogueTestData(author);
        List<TravelogueDayRequest> days = getTravelogueDayRequests();
        TravelogueRequest request = TravelogueRequestFixture.getUpdateTravelogueRequest(days);
        Travelogue updatedTravelogue = travelogueService.update(1L, author, request);

        assertAll(
                () -> assertThat(updatedTravelogue.getId()).isEqualTo(1L),
                () -> assertThat(updatedTravelogue.getTitle()).isEqualTo("삼춘! 제주에 하영 옵서!")
        );
    }

    @DisplayName("작성자가 아닌 사람이 여행기를 수정하면 예외가 발생한다.")
    @Test
    void updateTravelogueWithNotAuthor() {
        Member author = testHelper.initKakaoMemberTestData();
        testHelper.initTravelogueTestData();

        List<TravelogueDayRequest> days = getTravelogueDayRequests();
        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(days);

        assertThatThrownBy(() -> travelogueService.update(1L, author, request))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("본인이 작성한 여행기만 수정하거나 삭제할 수 있습니다.");
    }

    @DisplayName("존재하지 않는 여행기를 수정하면 예외가 발생한다.")
    @Test
    void updateTravelogueWithNotExist() {
        Member author = testHelper.initKakaoMemberTestData();
        testHelper.initTravelogueTestData(author);

        List<TravelogueDayRequest> days = getTravelogueDayRequests();
        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(days);

        assertThatThrownBy(() -> travelogueService.update(0L, author, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기입니다.");
    }

    @DisplayName("여행기를 삭제할 수 있다.")
    @Test
    void deleteTravelogueById() {
        Member author = testHelper.initKakaoMemberTestData();
        Travelogue travelogue = testHelper.initTravelogueTestData(author);
        long travelogueId = travelogue.getId();

        travelogueService.delete(travelogue, author);

        assertThatThrownBy(() -> travelogueService.getTravelogueById(travelogueId))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기입니다.");
    }

    @DisplayName("작성자가 아닌 사람이 여행기를 삭제하면 예외가 발생한다.")
    @Test
    void deleteTravelogueByNotAuthorThrowException() {
        Travelogue travelogue = testHelper.initTravelogueTestData();
        Member notAuthor = testHelper.initKakaoMemberTestData();

        assertThatThrownBy(() -> travelogueService.delete(travelogue, notAuthor))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("본인이 작성한 여행기만 수정하거나 삭제할 수 있습니다.");
    }
}
