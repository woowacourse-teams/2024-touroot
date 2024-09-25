CREATE TABLE member
(
    created_at        DATETIME(6) NOT NULL,
    deleted_at        DATETIME(6),
    id                BIGINT NOT NULL AUTO_INCREMENT,
    kakao_id          BIGINT,
    modified_at       DATETIME(6),
    email             VARCHAR(255),
    nickname          VARCHAR(255) NOT NULL,
    password          VARCHAR(255),
    profile_image_url VARCHAR(255) NOT NULL,
    login_type        ENUM ('DEFAULT','KAKAO') NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE place
(
    created_at      DATETIME(6) NOT NULL,
    deleted_at      DATETIME(6),
    id              BIGINT NOT NULL AUTO_INCREMENT,
    modified_at     DATETIME(6),
    google_place_id VARCHAR(255),
    latitude        VARCHAR(255) NOT NULL,
    longitude       VARCHAR(255) NOT NULL,
    name            VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tag
(
    id  BIGINT NOT NULL AUTO_INCREMENT,
    tag VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE travelogue
(
    author_id   BIGINT NOT NULL,
    created_at  DATETIME(6) NOT NULL,
    deleted_at  DATETIME(6),
    id          BIGINT NOT NULL AUTO_INCREMENT,
    modified_at DATETIME(6),
    title       VARCHAR(20) NOT NULL,
    thumbnail   VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE travelogue_day
(
    day_order     INT NOT NULL,
    created_at    DATETIME(6) NOT NULL,
    deleted_at    DATETIME(6),
    id            BIGINT NOT NULL AUTO_INCREMENT,
    modified_at   DATETIME(6),
    travelogue_id BIGINT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE travelogue_like
(
    id            BIGINT NOT NULL AUTO_INCREMENT,
    liker_id      BIGINT NOT NULL,
    travelogue_id BIGINT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE travelogue_photo
(
    photo_order         INT NOT NULL,
    created_at          DATETIME(6) NOT NULL,
    deleted_at          DATETIME(6),
    id                  BIGINT NOT NULL AUTO_INCREMENT,
    modified_at         DATETIME(6),
    travelogue_place_id BIGINT NOT NULL,
    photo_key           VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE travelogue_place
(
    place_order       INT NOT NULL,
    created_at        DATETIME(6) NOT NULL,
    deleted_at        DATETIME(6),
    id                BIGINT NOT NULL AUTO_INCREMENT,
    modified_at       DATETIME(6),
    place_id          BIGINT NOT NULL,
    travelogue_day_id BIGINT NOT NULL,
    description       VARCHAR(300),
    PRIMARY KEY (id)
);

CREATE TABLE travelogue_tag
(
    id            BIGINT NOT NULL AUTO_INCREMENT,
    tag_id        BIGINT NOT NULL,
    travelogue_id BIGINT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE travel_place_todo
(
    is_checked           BIT NOT NULL,
    todo_order           INT NOT NULL,
    created_at           DATETIME(6) NOT NULL,
    deleted_at           DATETIME(6),
    id                   BIGINT NOT NULL AUTO_INCREMENT,
    modified_at          DATETIME(6),
    travel_plan_place_id BIGINT NOT NULL,
    content              VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE travel_plan
(
    start_date  DATE NOT NULL,
    author_id   BIGINT NOT NULL,
    created_at  DATETIME(6) NOT NULL,
    deleted_at  DATETIME(6),
    id          BIGINT NOT NULL AUTO_INCREMENT,
    modified_at DATETIME(6),
    share_key   BINARY(16) NOT NULL,
    title       VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE travel_plan_day
(
    plan_day_order INT NOT NULL,
    created_at     DATETIME(6) NOT NULL,
    deleted_at     DATETIME(6),
    id             BIGINT NOT NULL AUTO_INCREMENT,
    modified_at    DATETIME(6),
    plan_id        BIGINT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE travel_plan_place
(
    plan_place_order INT NOT NULL,
    created_at       DATETIME(6) NOT NULL,
    deleted_at       DATETIME(6),
    id               BIGINT NOT NULL AUTO_INCREMENT,
    modified_at      DATETIME(6),
    place_id         BIGINT NOT NULL,
    plan_day_id      BIGINT NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX member_kakao_id_idx ON member (kakao_id);
CREATE INDEX place_name_latitude_longitude_idx ON place (name, latitude, longitude);
CREATE INDEX travel_plan_share_key_idx ON travel_plan (share_key);

ALTER TABLE tag
    ADD CONSTRAINT uk_tag UNIQUE (tag);

ALTER TABLE travelogue_like
    ADD CONSTRAINT uk_travelogue_like_travelogue_liker UNIQUE (travelogue_id, liker_id);

ALTER TABLE travelogue
    ADD CONSTRAINT fk_travelogue_author_id FOREIGN KEY (author_id) REFERENCES member (id);

ALTER TABLE travelogue_day
    ADD CONSTRAINT fk_travelogue_day_travelogue_id FOREIGN KEY (travelogue_id) REFERENCES travelogue (id);

ALTER TABLE travelogue_like
    ADD CONSTRAINT fk_travelogue_like_liker_id FOREIGN KEY (liker_id) REFERENCES member (id);

ALTER TABLE travelogue_like
    ADD CONSTRAINT fk_travelogue_like_travelogue_id FOREIGN KEY (travelogue_id) REFERENCES travelogue (id);

ALTER TABLE travelogue_photo
    ADD CONSTRAINT fk_travelogue_photo_travelogue_place_id FOREIGN KEY (travelogue_place_id) REFERENCES travelogue_place (id);

ALTER TABLE travelogue_place
    ADD CONSTRAINT fk_travelogue_place_place_id FOREIGN KEY (place_id) REFERENCES place (id);

ALTER TABLE travelogue_place
    ADD CONSTRAINT fk_travelogue_place_travelogue_day_id FOREIGN KEY (travelogue_day_id) REFERENCES travelogue_day (id);

ALTER TABLE travelogue_tag
    ADD CONSTRAINT fk_travelogue_tag_tag_id FOREIGN KEY (tag_id) REFERENCES tag (id);

ALTER TABLE travelogue_tag
    ADD CONSTRAINT fk_travelogue_tag_travelogue_id FOREIGN KEY (travelogue_id) REFERENCES travelogue (id);

ALTER TABLE travel_place_todo
    ADD CONSTRAINT fk_travel_place_todo_travel_plan_place_id FOREIGN KEY (travel_plan_place_id) REFERENCES travel_plan_place (id);

ALTER TABLE travel_plan
    ADD CONSTRAINT fk_travel_plan_author_id FOREIGN KEY (author_id) REFERENCES member (id);

ALTER TABLE travel_plan_day
    ADD CONSTRAINT fk_travel_plan_day_plan_id FOREIGN KEY (plan_id) REFERENCES travel_plan (id);

ALTER TABLE travel_plan_place
    ADD CONSTRAINT fk_travel_plan_place_plan_day_id FOREIGN KEY (plan_day_id) REFERENCES travel_plan_day (id);

ALTER TABLE travel_plan_place
    ADD CONSTRAINT fk_travel_plan_place_place_id FOREIGN KEY (place_id) REFERENCES place (id);
