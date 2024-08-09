package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import java.util.List;
import java.util.Map;
import kr.touroot.global.ServiceTest;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.fixture.TravelogueRequestFixture;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.travelogue.repository.TravelogueDayRepository;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

@DisplayName("여행기 일자 서비스")
@Import(value = {TravelogueDayService.class, TravelogueTestHelper.class})
@ServiceTest
class TravelogueDayServiceTest {

    private final TravelogueDayService dayService;
    private final TravelogueDayRepository dayRepository;
    private final DatabaseCleaner databaseCleaner;
    private final TravelogueTestHelper testHelper;

    @Autowired
    public TravelogueDayServiceTest(
            TravelogueDayService dayService,
            TravelogueDayRepository dayRepository,
            DatabaseCleaner databaseCleaner,
            TravelogueTestHelper testHelper
    ) {
        this.dayService = dayService;
        this.dayRepository = dayRepository;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("여행기의 일자들을 생성한다.")
    @Test
    void createDays() {
        List<TraveloguePhotoRequest> photos = TravelogueRequestFixture.getTraveloguePhotoRequests();
        List<TraveloguePlaceRequest> places = TravelogueRequestFixture.getTraveloguePlaceRequests(photos);
        List<TravelogueDayRequest> requests = TravelogueRequestFixture.getTravelogueDayRequests(places);
        Member author = testHelper.persistMember();
        Travelogue travelogue = testHelper.persistTravelogue(author);

        Map<TravelogueDay, List<TraveloguePlaceRequest>> daysMap = dayService.createDays(requests, travelogue);
        List<TravelogueDay> days = daysMap.keySet().stream().toList();

        assertAll(
                () -> assertThat(daysMap.keySet()).hasSize(requests.size()),
                () -> assertThat(daysMap).containsEntry(days.get(0), requests.get(0).places())
        );
    }

    @DisplayName("여행기를 기준으로 여행 일자들을 조회한다.")
    @Test
    void findDaysByTravelogue() {
        Member author = testHelper.persistMember();
        Travelogue travelogue = testHelper.persistTravelogue(author);
        TravelogueDay travelogueDay = testHelper.persistTravelogueDay(travelogue);

        List<TravelogueDay> days = dayService.findDaysByTravelogue(travelogue);

        assertThat(days).contains(travelogueDay);
    }

    @DisplayName("여행 일자를 ID를 기준으로 조회한다.")
    @Test
    void findDayById() {
        testHelper.initTravelogueTestData();

        assertDoesNotThrow(() -> dayService.findDayById(1L));
    }

    @DisplayName("존재하지 않는 여행기 일자 ID로 조회하면 예외가 발생한다.")
    @Test
    void findDayByInvalidIdThrowException() {
        assertThatThrownBy(() -> dayService.findDayById(1L))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기 일자입니다.");
    }

    @DisplayName("주어진 여행기의 여행기 일자를 삭제할 수 있다.")
    @Test
    void deleteTravelogueDayById() {
        Travelogue travelogue = testHelper.initTravelogueTestData();
        long travelogueId = travelogue.getId();
        dayService.deleteByTravelogue(travelogue);

        assertThat(dayRepository.findAll()
                .stream()
                .noneMatch(day -> extractTravelogue(day).getId() == travelogueId))
                .isTrue();
    }

    private Travelogue extractTravelogue(TravelogueDay day) {
        return day.getTravelogue();
    }
}
