package kr.touroot.travelogue.service;

import static org.awaitility.Awaitility.await;
import static org.mockito.Mockito.times;

import java.time.Duration;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import kr.touroot.global.AbstractServiceIntegrationTest;
import kr.touroot.travelogue.repository.TravelogueRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;

@DisplayName("좋아요 개수 동기화 테스트")
class TravelogueLikeSyncServiceTest extends AbstractServiceIntegrationTest {

    @SpyBean
    private TravelogueLikeSyncService travelogueLikeSyncService;
    @MockBean
    private TravelogueRepository travelogueRepository;

    @DisplayName("여러 스레드가 동시에 동기화를 시도하는 경우 하나의 스레드만 성공한다")
    @Test
    void syncLikeCountsWeekly() {
        // given & when
        int threadCount = 10;
        ExecutorService executorService = Executors.newFixedThreadPool(threadCount);
        CountDownLatch latch = new CountDownLatch(threadCount);
        for (int i = 0; i < threadCount; i++) {
            executorService.execute(() -> {
                travelogueLikeSyncService.syncLikeCountsWeekly();
                latch.countDown();
            });
        }

        // then
        await().atMost(Duration.ofSeconds(10)).until(() -> latch.getCount() == 0);
        Mockito.verify(travelogueRepository, times(1)).syncLikeCounts();
    }
}
