package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.ArgumentMatchers.any;

import java.util.List;
import kr.touroot.global.ServiceTest;
import kr.touroot.global.config.TestQueryDslConfig;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.fixture.TravelogueRequestFixture;
import kr.touroot.travelogue.fixture.TravelogueResponseFixture;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Pageable;

@DisplayName("여행기 서비스")
@Import(value = {TravelogueService.class, TravelogueTestHelper.class, AwsS3Provider.class, TestQueryDslConfig.class})
@ServiceTest
class TravelogueServiceTest {

    public static final int BASIC_PAGE_SIZE = 5;

    private final TravelogueService travelogueService;
    private final DatabaseCleaner databaseCleaner;
    private final TravelogueTestHelper testHelper;
    @MockBean
    private final AwsS3Provider s3Provider;

    @Autowired
    public TravelogueServiceTest(
            TravelogueService travelogueService,
            DatabaseCleaner databaseCleaner,
            TravelogueTestHelper testHelper,
            AwsS3Provider s3Provider
    ) {
        this.travelogueService = travelogueService;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
        this.s3Provider = s3Provider;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("여행기를 생성할 수 있다.")
    @Test
    void createTravelogue() {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());

        Member author = testHelper.initKakaoMemberTestData();
        List<TravelogueDayRequest> days = getTravelogueDayRequests();
        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(days);

        Travelogue createdTravelogue = travelogueService.createTravelogue(author, request);

        assertAll(
                () -> assertThat(createdTravelogue.getId()).isEqualTo(1L),
                () -> assertThat(createdTravelogue.getTitle()).isEqualTo("제주에 하영 옵서")
        );
    }

    private static List<TravelogueDayRequest> getTravelogueDayRequests() {
        List<TraveloguePhotoRequest> photos = TravelogueRequestFixture.getTraveloguePhotoRequests();
        List<TraveloguePlaceRequest> places = TravelogueRequestFixture.getTraveloguePlaceRequests(photos);
        return TravelogueRequestFixture.getTravelogueDayRequests(places);
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

    @DisplayName("여행기를 전체 조회할 수 있다.")
    @Test
    void findAll() {
        testHelper.initTravelogueTestData();

        assertThat(travelogueService.findAll(Pageable.ofSize(BASIC_PAGE_SIZE)))
                .hasSize(1);
    }

    @DisplayName("여행기를 전체 조회할 수 있다.")
    @Test
    void findByKeyword() {
        testHelper.initTravelogueTestData();

        assertThat(travelogueService.findByKeyword("제주", Pageable.ofSize(BASIC_PAGE_SIZE)))
                .hasSize(1);
    }

    @DisplayName("존재하지 않는 키워드로 여행기를 조회하면 빈 페이지가 반환된다.")
    @Test
    void findByKeywordWithNotExistKeyword() {
        testHelper.initTravelogueTestData();

        assertThat(travelogueService.findByKeyword("서울", Pageable.ofSize(BASIC_PAGE_SIZE)))
                .isEmpty();
    }

    @DisplayName("여행기를 수정할 수 있다.")
    @Test
    void updateTravelogue() {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());

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
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());

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
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());

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
