CREATE TABLE travelogue_country
(
    id            BIGINT      NOT NULL AUTO_INCREMENT,
    travelogue_id BIGINT      NOT NULL,
    country_code  VARCHAR(50) NOT NULL,
    count         INT         NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE travelogue_country
    ADD CONSTRAINT fk_travelogue_country_travelogue_id FOREIGN KEY (travelogue_id) REFERENCES travelogue (id);

CREATE INDEX idx_country_code_count ON travelogue_country (country_code, count);
