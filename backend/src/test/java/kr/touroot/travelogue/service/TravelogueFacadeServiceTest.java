package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

import kr.touroot.global.ServiceTest;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
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
import org.springframework.data.domain.Pageable;

@DisplayName("여행기 Facade 서비스")
@Import(value = {
        TravelogueFacadeService.class,
        TravelogueService.class,
        TraveloguePhotoService.class,
        TravelogueDayService.class,
        TraveloguePlaceService.class,
        TravelogueTestHelper.class,
        AwsS3Provider.class,
})
@ServiceTest
class TravelogueFacadeServiceTest {

    private final TravelogueFacadeService service;
    private final TravelogueTestHelper testHelper;
    private final DatabaseCleaner databaseCleaner;
    @MockBean
    private final AwsS3Provider s3Provider;

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

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

    @DisplayName("여행기를 생성할 수 있다.")
    @Test
    void createTravelogue() {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTraveloguePhotoUrls().get(0));

        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest();

        assertThat(service.createTravelogue(request))
                .isEqualTo(TravelogueResponseFixture.getTravelogueResponse());
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
        testHelper.initTravelogueTestData();
        Page<TravelogueResponse> responses = TravelogueResponseFixture.getTravelogueResponses();

        assertThat(service.findTravelogues(Pageable.ofSize(5)))
                .isEqualTo(responses);
    }
}
