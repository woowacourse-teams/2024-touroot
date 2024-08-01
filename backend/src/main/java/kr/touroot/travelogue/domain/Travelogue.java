package kr.touroot.travelogue.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.net.URL;
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Travelogue extends BaseEntity {

    private static final int MIN_TITLE_LENGTH = 1;
    private static final int MAX_TITLE_LENGTH = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String title;

    @Column(nullable = false)
    private String thumbnail;

    private Travelogue(Long id, String title, String thumbnail) {
        validate(title, thumbnail);
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
    }

    public Travelogue(String title, String thumbnail) {
        this(null, title, thumbnail);
    }

    private void validate(String title, String thumbnail) {
        validateNotNull(title, thumbnail);
        validateNotBlank(title, thumbnail);
        validateTitleLength(title);
        validateThumbnailFormat(thumbnail);
    }

    private void validateNotNull(String title, String thumbnail) {
        if (title == null || thumbnail == null) {
            throw new BadRequestException("여행기 제목, 여행기 썸네일은 비어있을 수 없습니다");
        }
    }

    private void validateNotBlank(String title, String thumbnail) {
        if (title.isBlank() || thumbnail.isBlank()) {
            throw new BadRequestException("여행기 제목, 여행기 썸네일은 비어있을 수 없습니다");
        }
    }

    private void validateTitleLength(String title) {
        if (MIN_TITLE_LENGTH > title.length() || title.length() > MAX_TITLE_LENGTH) {
            throw new BadRequestException("여행기 제목은 " + MIN_TITLE_LENGTH + "자 이상, " + MAX_TITLE_LENGTH + "자 이하여야 합니다");
        }
    }

    private void validateThumbnailFormat(String thumbnailUri) {
        try {
            new URL(thumbnailUri).toURI();
        } catch (Exception e) {
            throw new BadRequestException("이미지 url 형식이 잘못되었습니다");
        }
    }
}
