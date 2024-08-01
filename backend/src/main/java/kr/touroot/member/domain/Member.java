package kr.touroot.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Member extends BaseEntity {

    public static final int NICKNAME_MIN_LENGTH = 1;
    public static final int NICKNAME_MAX_LENGTH = 20;

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
        validateNicknameLength(nickname);
    }

    private void validateNotNull(Long kakaoId, String nickname, String profileImageUri) {
        if (kakaoId == null || nickname == null || profileImageUri == null) {
            throw new BadRequestException("카카오 아이디, 닉네임, 프로필 이미지는 비어 있을 수 없습니다");
        }
    }

    private void validateNotBlank(String nickname, String profileImageUri) {
        if (nickname.isBlank() || profileImageUri.isBlank()) {
            throw new BadRequestException("닉네임, 프로필 이미지는 비어 있을 수 없습니다");
        }
    }

    private void validateNicknameLength(String nickname) {
        if (NICKNAME_MIN_LENGTH > nickname.length() || nickname.length() > NICKNAME_MAX_LENGTH) {
            throw new BadRequestException(
                    "닉네임은 " + NICKNAME_MIN_LENGTH + "자 이상, " + NICKNAME_MAX_LENGTH + "자 이하여야 합니다"
            );
        }
    }
}
