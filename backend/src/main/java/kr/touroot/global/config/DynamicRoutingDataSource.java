package kr.touroot.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Slf4j
public class DynamicRoutingDataSource extends AbstractRoutingDataSource {

    @Override
    protected Object determineCurrentLookupKey() {
        if (TransactionSynchronizationManager.isCurrentTransactionReadOnly()) {
            log.info("난 리더~ 내 말을 따르지 않는 사람들 숙청하지~");
            return DataSourceConfig.READER;
        }
        log.info("난 라이터~ 담배에 불을 붙일 수 있지~");
        return DataSourceConfig.WRITER;
    }
}
