package kr.touroot.travelogue.service;

import kr.touroot.travelogue.repository.TravelogueRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TravelogueLikeSyncService {

    private static final String LOCK_NAME = "syncLikeCountsWeekly";

    private final TravelogueRepository travelogueRepository;
    private final RedissonClient redissonClient;

    /**
     * 매주 월요일 오전 3시에 좋아요 개수를 동기화
     */
    @Scheduled(cron = "0 0 3 * * MON")
    @Transactional
    public void syncLikeCountsWeekly() {
        RLock lock = redissonClient.getLock(LOCK_NAME);
        if (lock.tryLock()) {
            try {
                log.info("Start sync like counts");
                travelogueRepository.syncLikeCounts();
                log.info("End sync like counts");
            } finally {
                lock.unlock();
            }
        }
    }
}
