-- 오늘 이전의 place 테이블의 데이터로 travelogue_place 업데이트
UPDATE travelogue_place tp
    JOIN place p ON tp.place_id = p.id
    SET tp.latitude = p.latitude, tp.longitude = p.longitude, tp.name = p.name
    WHERE DATE(p.created_at) < DATE(NOW());

-- 오늘 이전의 place 테이블의 데이터로 travel_plan_place 업데이트
UPDATE travel_plan_place tpp
    JOIN place p ON tpp.place_id = p.id
    SET tpp.latitude = p.latitude, tpp.longitude = p.longitude, tpp.name = p.name
    WHERE DATE(p.created_at) < DATE(NOW());
