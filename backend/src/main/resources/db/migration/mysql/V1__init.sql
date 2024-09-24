-- 테이블 생성
CREATE TABLE member
(
    created_at        TIMESTAMP(6) NOT NULL,
    deleted_at        TIMESTAMP(6),
    id                BIGINT AUTO_INCREMENT,
    kakao_id          BIGINT,
    modified_at       TIMESTAMP(6),
    email             VARCHAR(255),
    nickname          VARCHAR(255) NOT NULL,
    password          VARCHAR(255),
    profile_image_url VARCHAR(255) NOT NULL,
    login_type        ENUM('DEFAULT','KAKAO') NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE place
(
    created_at      TIMESTAMP(6) NOT NULL,
    deleted_at      TIMESTAMP(6),
    id              BIGINT AUTO_INCREMENT,
    modified_at     TIMESTAMP(6),
    google_place_id VARCHAR(255),
    latitude        VARCHAR(255) NOT NULL,
    longitude       VARCHAR(255) NOT NULL,
    name            VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tag
(
    id  BIGINT AUTO_INCREMENT,
    tag VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE travel_plan
(
    start_date  DATE         NOT NULL,
    author_id   BIGINT       NOT NULL,
    created_at  TIMESTAMP(6) NOT NULL,
    deleted_at  TIMESTAMP(6),
    id          BIGINT AUTO_INCREMENT,
    modified_at TIMESTAMP(6),
    share_key   BINARY(16) NOT NULL,
    title       VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES member (id)
);

CREATE TABLE travelogue
(
    author_id   BIGINT       NOT NULL,
    created_at  TIMESTAMP(6) NOT NULL,
    deleted_at  TIMESTAMP(6),
    id          BIGINT AUTO_INCREMENT,
    modified_at TIMESTAMP(6),
    title       VARCHAR(20)  NOT NULL,
    thumbnail   VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_id) REFERENCES member (id)
);

CREATE TABLE travel_plan_day
(
    plan_day_order INT          NOT NULL,
    created_at     TIMESTAMP(6) NOT NULL,
    deleted_at     TIMESTAMP(6),
    id             BIGINT AUTO_INCREMENT,
    modified_at    TIMESTAMP(6),
    plan_id        BIGINT       NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (plan_id) REFERENCES travel_plan (id);
);

CREATE TABLE travel_plan_place
(
    plan_place_order INT          NOT NULL,
    created_at       TIMESTAMP(6) NOT NULL,
    deleted_at       TIMESTAMP(6),
    id               BIGINT AUTO_INCREMENT,
    modified_at      TIMESTAMP(6),
    place_id         BIGINT       NOT NULL,
    plan_day_id      BIGINT       NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (place_id) REFERENCES place (id),
    FOREIGN KEY (plan_day_id) REFERENCES travel_plan_day (id)
);

CREATE TABLE travel_place_todo
(
    is_checked           BOOLEAN      NOT NULL,
    todo_order           INT          NOT NULL,
    created_at           TIMESTAMP(6) NOT NULL,
    deleted_at           TIMESTAMP(6),
    id                   BIGINT AUTO_INCREMENT,
    modified_at          TIMESTAMP(6),
    travel_plan_place_id BIGINT       NOT NULL,
    content              VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (travel_plan_place_id) REFERENCES travel_plan_place (id)
);

CREATE TABLE travelogue_day
(
    day_order     INT          NOT NULL,
    created_at    TIMESTAMP(6) NOT NULL,
    deleted_at    TIMESTAMP(6),
    id            BIGINT AUTO_INCREMENT,
    modified_at   TIMESTAMP(6),
    travelogue_id BIGINT       NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (travelogue_id) REFERENCES travelogue (id)
);

CREATE TABLE travelogue_place
(
    place_order       INT          NOT NULL,
    created_at        TIMESTAMP(6) NOT NULL,
    deleted_at        TIMESTAMP(6),
    id                BIGINT AUTO_INCREMENT,
    modified_at       TIMESTAMP(6),
    place_id          BIGINT       NOT NULL,
    travelogue_day_id BIGINT       NOT NULL,
    descriptiON      VARCHAR(300),
    PRIMARY KEY (id),
    FOREIGN KEY (place_id) REFERENCES place (id),
    FOREIGN KEY (travelogue_day_id) REFERENCES travelogue_day (id)
);

CREATE TABLE travelogue_photo
(
    photo_order         INT          NOT NULL,
    created_at          TIMESTAMP(6) NOT NULL,
    deleted_at          TIMESTAMP(6),
    id                  BIGINT AUTO_INCREMENT,
    modified_at         TIMESTAMP(6),
    travelogue_place_id BIGINT       NOT NULL,
    photo_key           VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (travelogue_place_id) REFERENCES travelogue_place (id)
);

CREATE TABLE travelogue_tag
(
    id            BIGINT AUTO_INCREMENT,
    tag_id        BIGINT NOT NULL,
    travelogue_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (tag_id) REFERENCES tag (id),
    FOREIGN KEY (travelogue_id) REFERENCES travelogue (id)
);

CREATE TABLE travelogue_like
(
    id            BIGINT AUTO_INCREMENT,
    liker_id      BIGINT NOT NULL,
    travelogue_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (travelogue_id, liker_id),
    FOREIGN KEY (liker_id) REFERENCES member (id),
    FOREIGN KEY (travelogue_id) REFERENCES travelogue (id)
);

CREATE INDEX member_kakao_id_idx ON member (kakao_id);

CREATE INDEX place_name_latitude_longitude_idx ON place (name, latitude, longitude);

CREATE INDEX travel_plan_share_key_idx ON travel_plan (share_key);
