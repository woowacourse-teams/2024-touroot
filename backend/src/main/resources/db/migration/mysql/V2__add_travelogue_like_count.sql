ALTER TABLE travelogue ADD like_count BIGINT;

UPDATE travelogue AS t LEFT JOIN (SELECT travelogue_id, COUNT(*) AS like_count
                                  FROM travelogue_like
                                  GROUP BY travelogue_id) AS tl ON t.id = tl.travelogue_id
SET t.like_count = COALESCE(tl.like_count, 0);
