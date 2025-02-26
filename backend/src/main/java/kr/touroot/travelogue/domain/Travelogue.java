package kr.touroot.travelogue.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.member.domain.Member;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE travelogue SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@Entity
public class Travelogue extends BaseEntity {

    private static final int MIN_TITLE_LENGTH = 1;
    private static final int MAX_TITLE_LENGTH = 20;
    private static final int LIKE_COUNT_WEIGHT = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Member author;

    @Column(nullable = false, length = 20)
    private String title;

    @Column(nullable = false)
    private String thumbnail;

    @Column(nullable = false)
    private Long likeCount;

    @OneToMany(mappedBy = "travelogue", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TravelogueDay> travelogueDays = new ArrayList<>();

    private Travelogue(Long id, Member author, String title, String thumbnail, Long likeCount) {
        validate(author, title, thumbnail);
        this.id = id;
        this.author = author;
        this.title = title;
        this.thumbnail = thumbnail;
        this.likeCount = likeCount;
    }

    public Travelogue(Member author, String title, String thumbnail) {
        this(null, author, title, thumbnail, 0L);
    }

    private void validate(Member author, String title, String thumbnail) {
        validateNotNull(author, title, thumbnail);
        validateNotBlank(title, thumbnail);
        validateTitleLength(title);
        validateThumbnailFormat(thumbnail);
    }

    private void validateNotNull(Member author, String title, String thumbnail) {
        if (title == null || thumbnail == null || author == null) {
            throw new BadRequestException("작성자, 여행기 제목, 그리고 여행기 썸네일은 비어있을 수 없습니다");
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

    private void validateThumbnailFormat(String thumbnailUrl) {
        try {
            new URL(thumbnailUrl).toURI();
        } catch (Exception e) {
            throw new BadRequestException("이미지 url 형식이 잘못되었습니다");
        }
    }

    public void update(String title, String thumbnail) {
        this.title = title;
        this.thumbnail = thumbnail;
    }

    public void updateThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public void addDay(TravelogueDay day) {
        day.updateTravelogue(this);
        travelogueDays.add(day);
    }

    public void updateDays(List<TravelogueDay> travelogueDays) {
        this.travelogueDays.clear();
        travelogueDays.forEach(this::addDay);
    }

    public void increaseLikeCount() {
        likeCount += LIKE_COUNT_WEIGHT;
    }

    public void decreaseLikeCount() {
        likeCount -= LIKE_COUNT_WEIGHT;
    }

    public boolean isAuthor(Member author) {
        return Objects.equals(author.getId(), this.author.getId());
    }

    public String getAuthorNickname() {
        return author.getNickname();
    }

    public String getAuthorProfileImageUrl() {
        return author.getProfileImageUrl();
    }

    public Long getAuthorId() {
        return author.getId();
    }
}
