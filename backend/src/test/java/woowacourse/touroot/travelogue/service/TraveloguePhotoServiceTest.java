package woowacourse.touroot.travelogue.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import woowacourse.touroot.global.ServiceTest;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import woowacourse.touroot.travelogue.fixture.TravelogueTestFixture;
import woowacourse.touroot.travelogue.helper.TravelogueTestHelper;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("여행기 사진 서비스")
@Import(value = {TraveloguePhotoService.class, TravelogueTestHelper.class})
@ServiceTest
class TraveloguePhotoServiceTest {

    private final TraveloguePhotoService photoService;
    private final TravelogueTestHelper testHelper;

    @Autowired
    public TraveloguePhotoServiceTest(TraveloguePhotoService photoService, TravelogueTestHelper testHelper) {
        this.photoService = photoService;
        this.testHelper = testHelper;
    }

    @DisplayName("여행기 사진을 생성한다.")
    @Test
    void createPhotos() {
        List<TraveloguePhotoRequest> requests = TravelogueTestFixture.getTraveloguePhotoRequests();
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
