package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

import java.util.List;
import kr.touroot.authentication.infrastructure.PasswordEncryptor;
import kr.touroot.global.ServiceTest;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.config.TestQueryDslConfig;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.member.domain.Member;
import kr.touroot.member.service.MemberService;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.dto.request.TravelogueSearchRequest;
import kr.touroot.travelogue.dto.response.TravelogueSimpleResponse;
import kr.touroot.travelogue.fixture.TravelogueRequestFixture;
import kr.touroot.travelogue.fixture.TravelogueResponseFixture;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@DisplayName("여행기 Facade 서비스")
@Import(value = {
        TravelogueFacadeService.class,
        TravelogueService.class,
        TraveloguePhotoService.class,
        TravelogueDayService.class,
        TraveloguePlaceService.class,
        TravelogueTagService.class,
        MemberService.class,
        TravelogueTestHelper.class,
        AwsS3Provider.class,
        PasswordEncryptor.class,
        TestQueryDslConfig.class
})
@ServiceTest
class TravelogueFacadeServiceTest {

    private final TravelogueFacadeService service;
    private final TravelogueTestHelper testHelper;
    private final DatabaseCleaner databaseCleaner;
    @MockBean
    private final AwsS3Provider s3Provider;

    @Autowired
    public TravelogueFacadeServiceTest(
            TravelogueFacadeService travelogueFacadeService,
            TravelogueTestHelper travelogueTestHelper,
            DatabaseCleaner databaseCleaner,
            AwsS3Provider s3Provider
    ) {
        this.service = travelogueFacadeService;
        this.testHelper = travelogueTestHelper;
        this.databaseCleaner = databaseCleaner;
        this.s3Provider = s3Provider;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("여행기를 생성할 수 있다.")
    @Test
    void createTravelogue() {
        List<TravelogueDayRequest> days = getTravelogueDayRequests();
        saveImages(days);

        testHelper.initKakaoMemberTestData();
        MemberAuth memberAuth = new MemberAuth(1L);
        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(days);

        assertThat(service.createTravelogue(memberAuth, request))
                .isEqualTo(TravelogueResponseFixture.getTravelogueResponse());
    }

    private void saveImages(List<TravelogueDayRequest> days) {
        when(s3Provider.copyImageToPermanentStorage(
                TravelogueRequestFixture.getTravelogueRequest(days).thumbnail())
        ).thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());
        when(s3Provider.copyImageToPermanentStorage(
                TravelogueRequestFixture.getTraveloguePhotoRequests().get(0).url())
        ).thenReturn(TravelogueResponseFixture.getTraveloguePhotoUrls().get(0));
    }

    private List<TravelogueDayRequest> getTravelogueDayRequests() {
        List<TraveloguePhotoRequest> photos = TravelogueRequestFixture.getTraveloguePhotoRequests();
        List<TraveloguePlaceRequest> places = TravelogueRequestFixture.getTraveloguePlaceRequests(photos);
        return TravelogueRequestFixture.getTravelogueDayRequests(places);
    }

    @DisplayName("여행기를 ID를 기준으로 조회한다.")
    @Test
    void findTravelogueById() {
        testHelper.initTravelogueTestData();

        assertThat(service.findTravelogueById(1L))
                .isEqualTo(TravelogueResponseFixture.getTravelogueResponse());
    }

    @DisplayName("메인 페이지에 표시할 여행기 목록을 조회한다.")
    @Test
    void findTravelogues() {
        testHelper.initAllTravelogueTestData();
        Page<TravelogueSimpleResponse> expect = TravelogueResponseFixture.getTravelogueSimpleResponses();

        PageRequest pageRequest = PageRequest.of(0, 5, Sort.by("id"));
        Page<TravelogueSimpleResponse> result = service.findSimpleTravelogues(pageRequest);

        assertThat(result).containsAll(expect);
    }

    @DisplayName("필터링된 여행기 목록을 조회한다.")
    @Test
    void filterTravelogues() {
        // given
        testHelper.initAllTravelogueTestData();
        PageRequest pageRequest = PageRequest.of(0, 5, Sort.by("id"));
        List<Long> tagFilters = List.of(1L);

        // when
        Page<TravelogueSimpleResponse> result = service.findSimpleTravelogues(tagFilters, pageRequest);

        // then
        assertThat(result.getContent()).hasSize(1);
    }

    @DisplayName("제목 키워드를 기반으로 여행기 목록을 조회한다.")
    @Test
    void findTraveloguesByKeyword() {
        testHelper.initAllTravelogueTestData();
        Page<TravelogueSimpleResponse> responses = TravelogueResponseFixture.getTravelogueSimpleResponses();

        TravelogueSearchRequest searchRequest = new TravelogueSearchRequest("제주");
        PageRequest pageRequest = PageRequest.of(0, 5, Sort.by("id"));
        Page<TravelogueSimpleResponse> searchResults = service.findSimpleTravelogues(pageRequest, searchRequest);

        assertThat(searchResults).containsAll(responses);
    }

    @DisplayName("여행기를 수정할 수 있다.")
    @Test
    void updateTravelogue() {
        List<TravelogueDayRequest> days = getUpdateTravelogueDayRequests();
        saveImages(days);

        Member author = testHelper.initKakaoMemberTestData();
        testHelper.initTravelogueTestData(author);

        MemberAuth memberAuth = new MemberAuth(author.getId());
        TravelogueRequest request = TravelogueRequestFixture.getUpdateTravelogueRequest(days);

        assertThat(service.updateTravelogue(1L, memberAuth, request))
                .isEqualTo(TravelogueResponseFixture.getUpdatedTravelogueResponse());
    }

    private List<TravelogueDayRequest> getUpdateTravelogueDayRequests() {
        List<TraveloguePhotoRequest> photos = TravelogueRequestFixture.getTraveloguePhotoRequests();
        List<TraveloguePlaceRequest> places = TravelogueRequestFixture.getUpdateTraveloguePlaceRequests(photos);
        return TravelogueRequestFixture.getUpdateTravelogueDayRequests(places);
    }

    @DisplayName("존재하지 않는 여행기를 수정하면 예외가 발생한다.")
    @Test
    void updateTravelogueWithNotExist() {
        List<TravelogueDayRequest> days = getUpdateTravelogueDayRequests();
        saveImages(days);

        Member author = testHelper.initKakaoMemberTestData();
        testHelper.initTravelogueTestData(author);

        MemberAuth memberAuth = new MemberAuth(author.getId());
        TravelogueRequest request = TravelogueRequestFixture.getUpdateTravelogueRequest(days);

        assertThatThrownBy(() -> service.updateTravelogue(0L, memberAuth, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기입니다.");
    }

    @DisplayName("작성자가 아닌 사용자가 여행기를 수정하면 예외가 발생한다.")
    @Test
    void updateByIdWithNotAuthor() {
        testHelper.initTravelogueTestData();
        MemberAuth notAuthorAuth = new MemberAuth(testHelper.initKakaoMemberTestData().getId());

        List<TravelogueDayRequest> days = getTravelogueDayRequests();
        saveImages(days);

        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(days);

        assertThatThrownBy(() -> service.updateTravelogue(1L, notAuthorAuth, request))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("본인이 작성한 여행기만 수정하거나 삭제할 수 있습니다.");
    }

    @DisplayName("여행기를 ID를 기준으로 삭제한다.")
    @Test
    void deleteById() {
        testHelper.initTravelogueTestData();
        MemberAuth memberAuth = new MemberAuth(1L);
        service.deleteTravelogueById(1L, memberAuth);

        assertThatThrownBy(() -> service.findTravelogueById(1L))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기입니다.");
    }

    @DisplayName("존재하지 않는 ID로 여행기를 삭제하면 예외가 발생한다.")
    @Test
    void deleteTravelogueByNotExistsIdThrowException() {
        MemberAuth memberAuth = new MemberAuth(testHelper.initKakaoMemberTestData().getId());

        assertThatThrownBy(() -> service.deleteTravelogueById(1L, memberAuth))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기입니다.");
    }

    @DisplayName("작성자가 아닌 사용자가 여행기를 삭제하면 예외가 발생한다.")
    @Test
    void deleteByIdWithNotAuthor() {
        testHelper.initTravelogueTestData();
        MemberAuth notAuthorAuth = new MemberAuth(testHelper.initKakaoMemberTestData().getId());

        assertThatThrownBy(() -> service.deleteTravelogueById(1L, notAuthorAuth))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("본인이 작성한 여행기만 수정하거나 삭제할 수 있습니다.");
    }
}
