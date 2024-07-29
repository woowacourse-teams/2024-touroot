package woowacourse.touroot.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import woowacourse.touroot.global.entity.BaseEntity;
import woowacourse.touroot.global.exception.BadRequestException;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long kakaoId;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String profileImageUri;

    public Member(Long id, Long kakaoId, String nickname, String profileImageUri) {
        validate(kakaoId, nickname, profileImageUri);
        this.id = id;
        this.kakaoId = kakaoId;
        this.nickname = nickname;
        this.profileImageUri = profileImageUri;
    }

    public Member(Long kakaoId, String nickname, String profileImageUri) {
        this(null, kakaoId, nickname, profileImageUri);
    }

    private void validate(Long kakaoId, String nickname, String profileImageUri) {
        validateNotNull(kakaoId, nickname, profileImageUri);
        validateNotBlank(nickname, profileImageUri);
    }

    private void validateNotNull(Long kakaoId, String nickname, String profileImageUri) {
        if (kakaoId == null || nickname == null || profileImageUri == null) {
            throw new BadRequestException("카카오 아이디, 닉네임, 프로필 이미지는 비어 있을 수 없습니다");
        }
    }

    private void validateNotBlank(String nickname, String profileImageUri) {
        if (nickname.isBlank() || profileImageUri.isBlank()) {
            throw new BadRequestException("닉네임, 프로필 이미지는 비어있을 수 없습니다");
        }
    }
}
