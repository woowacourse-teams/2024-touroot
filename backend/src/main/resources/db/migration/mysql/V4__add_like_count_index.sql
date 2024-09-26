-- travelogue 테이블 index 추가
CREATE INDEX travelogue_like_count_idx ON travelogue (like_count);
CREATE INDEX travelogue_created_at_idx ON travelogue (created_at);

