package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

import java.util.List;
import kr.touroot.global.ServiceTest;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.member.domain.Member;
import kr.touroot.place.domain.Place;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.fixture.TravelogueRequestFixture;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.travelogue.repository.TraveloguePhotoRepository;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;

@DisplayName("여행기 사진 서비스")
@Import(value = {TraveloguePhotoService.class, TravelogueTestHelper.class, AwsS3Provider.class})
@ServiceTest
class TraveloguePhotoServiceTest {

    private final TraveloguePhotoService photoService;
    private final TraveloguePhotoRepository photoRepository;
    private final TravelogueTestHelper testHelper;
    private final DatabaseCleaner databaseCleaner;
    @MockBean
    private final AwsS3Provider s3Provider;

    @Autowired
    public TraveloguePhotoServiceTest(
            TraveloguePhotoService photoService,
            TraveloguePhotoRepository photoRepository,
            TravelogueTestHelper testHelper,
            DatabaseCleaner databaseCleaner,
            AwsS3Provider s3Provider
    ) {
        this.photoService = photoService;
        this.photoRepository = photoRepository;
        this.testHelper = testHelper;
        this.databaseCleaner = databaseCleaner;
        this.s3Provider = s3Provider;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("여행기 사진을 생성한다.")
    @Test
    void createPhotos() {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn("imageUrl.png");

        List<TraveloguePhotoRequest> requests = TravelogueRequestFixture.getTraveloguePhotoRequests();
        Member author = testHelper.persistMember();
        Travelogue travelogue = testHelper.persistTravelogue(author);
        TravelogueDay day = testHelper.persistTravelogueDay(travelogue);
        Place position = testHelper.persistPlace();
        TraveloguePlace place = testHelper.persistTraveloguePlace(position, day);

        List<TraveloguePhoto> photos = photoService.createPhotos(requests, place);

        assertThat(photos).hasSize(requests.size());
    }

    @DisplayName("여행기 사진 URL을 여행기 장소를 기준으로 조회한다.")
    @Test
    void findPhotoUrlsByPlace() {
        Member author = testHelper.persistMember();
        Travelogue travelogue = testHelper.persistTravelogue(author);
        TravelogueDay day = testHelper.persistTravelogueDay(travelogue);
        Place position = testHelper.persistPlace();
        TraveloguePlace place = testHelper.persistTraveloguePlace(position, day);
        TraveloguePhoto photo = testHelper.persistTraveloguePhoto(place);

        List<String> photoUrls = photoService.findPhotoUrlsByPlace(place);

        assertThat(photoUrls).contains(photo.getKey());
    }

    @DisplayName("주어진 여행기의 여행기 사진을 삭제할 수 있다.")
    @Test
    void deleteTraveloguePhotoById() {
        Travelogue travelogue = testHelper.initTravelogueTestData();
        long travelogueId = travelogue.getId();
        photoService.deleteByTravelogue(travelogue);

        assertThat(photoRepository.findAll()
                .stream()
                .noneMatch(photo -> extractTravelogue(photo).getId() == travelogueId))
                .isTrue();
    }

    private Travelogue extractTravelogue(TraveloguePhoto photo) {
        return photo.getTraveloguePlace()
                .getTravelogueDay()
                .getTravelogue();
    }
}
