-- travelogue_place NOT NULL 제약 조건 추가
ALTER TABLE travelogue_place
    MODIFY latitude VARCHAR(255) NOT NULL,
    MODIFY longitude VARCHAR(255) NOT NULL,
    MODIFY name VARCHAR(255) NOT NULL;

-- travel_plan_place NOT NULL 제약 조건 추가
ALTER TABLE travel_plan_place
    MODIFY latitude VARCHAR(255) NOT NULL,
    MODIFY longitude VARCHAR(255) NOT NULL,
    MODIFY name VARCHAR(255) NOT NULL;
