package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
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
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TravelogueFilterRequest;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.dto.request.TravelogueSearchRequest;
import kr.touroot.travelogue.dto.response.TravelogueLikeResponse;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
import kr.touroot.travelogue.dto.response.TravelogueSimpleResponse;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@DisplayName("여행기 Facade 서비스")
@Import(value = {
        TravelogueFacadeService.class,
        TravelogueService.class,
        AwsS3Provider.class,
        TravelogueImagePerpetuationService.class,
        TravelogueTagService.class,
        TravelogueLikeService.class,
        MemberService.class,
        TravelogueTestHelper.class,
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

    private void mockImageCopyProcess() {
        when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn("https://dev.touroot.kr/image.png");
    }

    @DisplayName("여행기를 생성할 수 있다.")
    @Test
    void createTravelogue() {
        mockImageCopyProcess();
        List<TravelogueDayRequest> days = getTravelogueDayRequests();

        testHelper.initKakaoMemberTestData();
        MemberAuth memberAuth = new MemberAuth(1L);
        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(days);

        assertThat(service.createTravelogue(memberAuth, request).id()).isEqualTo(1L);
    }

    private List<TravelogueDayRequest> getTravelogueDayRequests() {
        List<TraveloguePhotoRequest> photos = TravelogueRequestFixture.getTraveloguePhotoRequests();
        List<TraveloguePlaceRequest> places = TravelogueRequestFixture.getTraveloguePlaceRequests(photos);
        return TravelogueRequestFixture.getTravelogueDayRequests(places);
    }

    @DisplayName("여행기에 좋아요를 할 수 있다.")
    @Test
    void likeTravelogue() {
        Travelogue travelogue = testHelper.initTravelogueTestData();
        Member liker = testHelper.initKakaoMemberTestData();

        assertThat(service.likeTravelogue(travelogue.getId(), new MemberAuth(liker.getId())))
                .isEqualTo(new TravelogueLikeResponse(true, 1L));
    }

    @DisplayName("존재하지 않는 여행기에 좋아요를 하면 예외가 발생한다.")
    @Test
    void likeTravelogueWithNotExist() {
        Member liker = testHelper.initKakaoMemberTestData();

        assertThatThrownBy(() -> service.likeTravelogue(1L, new MemberAuth(liker.getId())))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기입니다.");
    }

    @DisplayName("여행기를 ID를 기준으로 조회한다.")
    @Test
    void findTravelogueById() {
        testHelper.initTravelogueTestData();

        assertThat(service.findTravelogueByIdForGuest(1L))
                .isEqualTo(TravelogueResponseFixture.getTravelogueResponse());
    }

    @DisplayName("여행기를 ID와 로그인한 사용자를 기준으로 조회한다.")
    @Test
    void findTravelogueByIdAndLiker() {
        Member liker = testHelper.initKakaoMemberTestData();
        Long travelogueId = testHelper.initTravelogueTestDataWithLike(liker).getId();

        assertThat(service.findTravelogueByIdForAuthenticated(travelogueId, new MemberAuth(liker.getId())))
                .isEqualTo(TravelogueResponseFixture.getTravelogueResponseWithLike());
    }

    @DisplayName("메인 페이지에 표시할 여행기 목록을 조회한다.")
    @Test
    void findTravelogues() {
        TravelogueFilterRequest filterRequest = new TravelogueFilterRequest(null, null);
        testHelper.initAllTravelogueTestData();
        Page<TravelogueSimpleResponse> expect = TravelogueResponseFixture.getTravelogueSimpleResponses();

        PageRequest pageRequest = PageRequest.of(0, 5, Sort.by("id"));
        Page<TravelogueSimpleResponse> result = service.findSimpleTravelogues(filterRequest, pageRequest);

        assertThat(result).containsAll(expect);
    }

    @DisplayName("필터링된 여행기 목록을 조회한다.")
    @Test
    void filterTravelogues() {
        // given
        testHelper.initAllTravelogueTestData();
        PageRequest pageRequest = PageRequest.of(0, 5, Sort.by("id"));
        TravelogueFilterRequest filter = new TravelogueFilterRequest(List.of(1L), null);

        // when
        Page<TravelogueSimpleResponse> result = service.findSimpleTravelogues(filter, pageRequest);

        // then
        assertThat(result.getContent()).hasSize(1);
    }

    @DisplayName("제목 키워드를 기반으로 여행기 목록을 조회한다.")
    @Test
    void findTraveloguesByTitleKeyword() {
        testHelper.initAllTravelogueTestData();
        Page<TravelogueSimpleResponse> responses = TravelogueResponseFixture.getTravelogueSimpleResponses();

        TravelogueSearchRequest searchRequest = new TravelogueSearchRequest("제주", "title");
        PageRequest pageRequest = PageRequest.of(0, 5, Sort.by("id"));
        Page<TravelogueSimpleResponse> searchResults = service.findSimpleTravelogues(searchRequest, pageRequest);

        assertThat(searchResults).containsAll(responses);
    }

    @DisplayName("사용자 닉네임을 기반으로 여행기 목록을 조회한다.")
    @Test
    void findTraveloguesByAuthorNicknameKeyword() {
        testHelper.initAllTravelogueTestData();
        Page<TravelogueSimpleResponse> responses = TravelogueResponseFixture.getTravelogueSimpleResponses();

        TravelogueSearchRequest searchRequest = new TravelogueSearchRequest("리비", "author");
        PageRequest pageRequest = PageRequest.of(0, 5, Sort.by("id"));
        Page<TravelogueSimpleResponse> searchResults = service.findSimpleTravelogues(searchRequest, pageRequest);

        assertThat(searchResults).containsAll(responses);
    }

    @DisplayName("여행기를 수정할 수 있다.")
    @Test
    void updateTravelogue() {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getUpdatedTravelogueResponse().thumbnail());

        List<TravelogueDayRequest> days = getUpdateTravelogueDayRequests();

        Member author = testHelper.initKakaoMemberTestData();
        testHelper.initTravelogueTestData(author);

        MemberAuth memberAuth = new MemberAuth(author.getId());
        TravelogueRequest request = TravelogueRequestFixture.getUpdateTravelogueRequest(days);
        String updatedTitle = request.title();
        TravelogueResponse updatedResponse = service.updateTravelogue(1L, memberAuth, request);

        assertThat(updatedResponse.title()).isEqualTo(updatedTitle);
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
        mockImageCopyProcess();

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
        mockImageCopyProcess();

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

        assertThatThrownBy(() -> service.findTravelogueByIdForGuest(1L))
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

    @DisplayName("여행기에 좋아요를 취소 할 수 있다.")
    @Test
    void unlikeTravelogue() {
        Member liker = testHelper.initKakaoMemberTestData();
        Travelogue travelogue = testHelper.initTravelogueTestDataWithLike(liker);

        assertThat(service.unlikeTravelogue(travelogue.getId(), new MemberAuth(liker.getId())))
                .isEqualTo(new TravelogueLikeResponse(false, 0L));
    }

    @DisplayName("존재하지 않는 여행기에 좋아요를 취소 하면 예외가 발생한다.")
    @Test
    void unlikeTravelogueWithNotExist() {
        Member liker = testHelper.initKakaoMemberTestData();

        assertThatThrownBy(() -> service.unlikeTravelogue(1L, new MemberAuth(liker.getId())))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기입니다.");
    }
}
