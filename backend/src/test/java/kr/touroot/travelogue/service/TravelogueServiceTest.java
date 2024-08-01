package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import kr.touroot.global.ServiceTest;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.fixture.TravelogueRequestFixture;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Pageable;

@DisplayName("여행기 서비스")
@Import(value = {TravelogueService.class, TravelogueTestHelper.class})
@ServiceTest
class TravelogueServiceTest {

    public static final int BASIC_PAGE_SIZE = 5;

    private final TravelogueService travelogueService;
    private final DatabaseCleaner databaseCleaner;
    private final TravelogueTestHelper testHelper;

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

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

    @DisplayName("여행기를 생성할 수 있다.")
    @Test
    void createTravelogue() {
        Member author = testHelper.persistMember();
        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest();

        Travelogue createdTravelogue = travelogueService.createTravelogue(author, request);

        assertAll(
                () -> assertThat(createdTravelogue.getId()).isEqualTo(1L),
                () -> assertThat(createdTravelogue.getTitle()).isEqualTo("제주에 하영 옵서")
        );
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
}
