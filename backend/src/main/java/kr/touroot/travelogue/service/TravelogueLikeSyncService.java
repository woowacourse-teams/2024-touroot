package kr.touroot.travelogue.service;

import kr.touroot.travelogue.repository.TravelogueRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TravelogueLikeSyncService {

    private final TravelogueRepository travelogueRepository;

    /**
     * 매주 월요일 오전 3시에 좋아요 개수를 동기화
     */
    @Scheduled(cron = "0 0 3 * * MON")
    @Transactional
    public void syncLikeCountsWeekly() {
        log.info("Starting weekly like count sync...");
        travelogueRepository.syncLikeCounts();
        log.info("Weekly like count sync completed.");
    }
}
