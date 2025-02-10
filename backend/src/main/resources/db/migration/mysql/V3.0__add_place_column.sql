-- travelogue_place 외래 키 제약 조건 삭제
ALTER TABLE travelogue_place
DROP FOREIGN KEY fk_travelogue_place_place_id;

-- travel_plan_place 외래 키 제약 조건 삭제
ALTER TABLE travel_plan_place
DROP FOREIGN KEY fk_travel_plan_place_place_id;

-- travelogue_place 테이블에 latitude, longitude, name 컬럼 추가
ALTER TABLE travelogue_place
    ADD latitude VARCHAR(255),
    ADD longitude VARCHAR(255),
    ADD name VARCHAR(255);

-- travel_plan_place 테이블에 latitude, longitude, name 컬럼 추가
ALTER TABLE travel_plan_place
    ADD latitude VARCHAR(255),
    ADD longitude VARCHAR(255),
    ADD name VARCHAR(255);
