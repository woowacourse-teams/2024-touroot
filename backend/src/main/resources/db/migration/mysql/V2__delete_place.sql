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

-- NOT NULL 제약 조건 추가
ALTER TABLE travelogue_place
    MODIFY latitude VARCHAR(255) NOT NULL,
    MODIFY longitude VARCHAR(255) NOT NULL,
    MODIFY name VARCHAR(255) NOT NULL;

ALTER TABLE travel_plan_place
    MODIFY latitude VARCHAR(255) NOT NULL,
    MODIFY longitude VARCHAR(255) NOT NULL,
    MODIFY name VARCHAR(255) NOT NULL;

-- place 테이블의 데이터로 travelogue_place 업데이트
UPDATE travelogue_place tp
    JOIN place p ON tp.place_id = p.id
    SET tp.latitude = p.latitude, tp.longitude = p.longitude, tp.name = p.name;

-- place 테이블의 데이터로 travel_plan_place 업데이트
UPDATE travel_plan_place tpp
    JOIN place p ON tpp.place_id = p.id
    SET tpp.latitude = p.latitude, tpp.longitude = p.longitude, tpp.name = p.name;

-- 외래 키 제약 조건 삭제
ALTER TABLE travelogue_place
DROP FOREIGN KEY fk_travelogue_place_place_id;

ALTER TABLE travel_plan_place
DROP FOREIGN KEY fk_travel_plan_place_place_id;

-- place 테이블 삭제
DROP TABLE place;

-- member 테이블 닉네임 인덱스 작성
CREATE INDEX member_nickname_idx ON member (nickname);
