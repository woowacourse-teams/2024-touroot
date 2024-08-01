package kr.touroot.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.net.URL;
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
    private String profileImageUrl;

    public Member(Long id, Long kakaoId, String nickname, String profileImageUrl) {
        validate(kakaoId, nickname, profileImageUrl);
        this.id = id;
        this.kakaoId = kakaoId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }

    public Member(Long kakaoId, String nickname, String profileImageUrl) {
        this(null, kakaoId, nickname, profileImageUrl);
    }

    private void validate(Long kakaoId, String nickname, String profileImageUrl) {
        validateNotNull(kakaoId, nickname, profileImageUrl);
        validateNotBlank(nickname, profileImageUrl);
        validateNicknameLength(nickname);
        validateProfileImageUrl(profileImageUrl);
    }

    private void validateNotNull(Long kakaoId, String nickname, String profileImageUrl) {
        if (kakaoId == null || nickname == null || profileImageUrl == null) {
            throw new BadRequestException("카카오 아이디, 닉네임, 프로필 이미지는 비어 있을 수 없습니다");
        }
    }

    private void validateNotBlank(String nickname, String profileImageUrl) {
        if (nickname.isBlank() || profileImageUrl.isBlank()) {
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

    private void validateProfileImageUrl(String profileImageUrl) {
        try {
            new URL(profileImageUrl).toURI();
        } catch (Exception e) {
            throw new BadRequestException("이미지 url 형식이 잘못되었습니다");
        }
    }
}
