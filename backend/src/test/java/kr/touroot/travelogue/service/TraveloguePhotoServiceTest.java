package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

import java.util.List;
import kr.touroot.global.ServiceTest;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.place.domain.Place;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.fixture.TravelogueRequestFixture;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;

@DisplayName("여행기 사진 서비스")
@Import(value = {TraveloguePhotoService.class, TravelogueTestHelper.class, AwsS3Provider.class})
@ServiceTest
class TraveloguePhotoServiceTest {

    private final TraveloguePhotoService photoService;
    private final TravelogueTestHelper testHelper;
    @MockBean
    private final AwsS3Provider s3Provider;

    @Autowired
    public TraveloguePhotoServiceTest(
            TraveloguePhotoService photoService,
            TravelogueTestHelper testHelper,
            AwsS3Provider s3Provider
    ) {
        this.photoService = photoService;
        this.testHelper = testHelper;
        this.s3Provider = s3Provider;
    }

    @DisplayName("여행기 사진을 생성한다.")
    @Test
    void createPhotos() {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn("imageUrl.png");

        List<TraveloguePhotoRequest> requests = TravelogueRequestFixture.getTraveloguePhotoRequests();
        Travelogue travelogue = testHelper.persistTravelogue();
        TravelogueDay day = testHelper.persistTravelogueDay(travelogue);
        Place position = testHelper.persistPlace();
        TraveloguePlace place = testHelper.persistTraveloguePlace(position, day);

        List<TraveloguePhoto> photos = photoService.createPhotos(requests, place);

        assertThat(photos).hasSize(requests.size());
    }

    @DisplayName("여행기 사진 URL을 여행기 장소를 기준으로 조회한다.")
    @Test
    void findPhotoUrlsByPlace() {
        Travelogue travelogue = testHelper.persistTravelogue();
        TravelogueDay day = testHelper.persistTravelogueDay(travelogue);
        Place position = testHelper.persistPlace();
        TraveloguePlace place = testHelper.persistTraveloguePlace(position, day);
        TraveloguePhoto photo = testHelper.persistTraveloguePhoto(place);

        List<String> photoUrls = photoService.findPhotoUrlsByPlace(place);

        assertThat(photoUrls).contains(photo.getKey());
    }
}
