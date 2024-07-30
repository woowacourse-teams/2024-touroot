package kr.touroot.utils;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.metamodel.EntityType;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class DatabaseCleaner {

    public static final String CAMEL_CASE = "([a-z])([A-Z])";
    public static final String SNAKE_CASE = "$1_$2";
    private static final String TRUNCATE_TABLE = "TRUNCATE TABLE %s";
    private static final String ALTER_COLUMN_ID = "ALTER TABLE %s ALTER COLUMN id RESTART WITH 1";
    public static final String INTEGRITY_FALSE = "SET REFERENTIAL_INTEGRITY FALSE";
    public static final String INTEGRITY_TRUE = "SET REFERENTIAL_INTEGRITY TRUE";

    @PersistenceContext
    private EntityManager entityManager;

    private List<String> tableNames;

    @PostConstruct
    public void findTableNames() {
        tableNames = entityManager.getMetamodel().getEntities().stream()
                .filter(e -> e.getJavaType().getAnnotation(Entity.class) != null)
                .map(DatabaseCleaner::convertCamelToSnake)
                .toList();
    }

    private static String convertCamelToSnake(final EntityType<?> e) {
        return e.getName()
                .replaceAll(CAMEL_CASE, SNAKE_CASE)
                .toLowerCase();
    }

    @Transactional
    public void executeTruncate() {
        entityManager.clear();

        disableIntegrity();
        for (String tableName : tableNames) {
            truncateTable(tableName);
            resetIdColumn(tableName);
        }
        enableIntegrity();
    }

    private void disableIntegrity() {
        entityManager.createNativeQuery(INTEGRITY_FALSE)
                .executeUpdate();
    }

    private void truncateTable(final String tableName) {
        entityManager.createNativeQuery(String.format(TRUNCATE_TABLE, tableName))
                .executeUpdate();
    }

    private void resetIdColumn(final String tableName) {
        entityManager.createNativeQuery(String.format(ALTER_COLUMN_ID, tableName))
                .executeUpdate();
    }

    private void enableIntegrity() {
        entityManager.createNativeQuery(INTEGRITY_TRUE)
                .executeUpdate();
    }
}
