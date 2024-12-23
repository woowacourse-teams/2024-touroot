package kr.touroot.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import kr.touroot.global.IntegrationTest;
import kr.touroot.global.ServiceTest;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.image.domain.ImageFile;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.member.domain.Member;
import kr.touroot.member.dto.request.MemberRequest;
import kr.touroot.member.dto.request.ProfileUpdateRequest;
import kr.touroot.member.fixture.MemberFixture;
import kr.touroot.member.helper.MemberTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;


@DisplayName("사용자 서비스")
@ServiceTest
class MemberServiceTest extends IntegrationTest {

    private final MemberService memberService;
    private final MemberTestHelper testHelper;
    private final DatabaseCleaner databaseCleaner;
    private final AwsS3Provider s3Provider;

    @Autowired
    public MemberServiceTest(
            MemberService memberService,
            MemberTestHelper testHelper,
            DatabaseCleaner databaseCleaner,
            AwsS3Provider s3Provider
    ) {
        this.memberService = memberService;
        this.testHelper = testHelper;
        this.databaseCleaner = databaseCleaner;
        this.s3Provider = s3Provider;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("ID를 기준으로 회원을 조회한다.")
    @Test
    void getById() {
        Member member = testHelper.persistMember();

        assertThat(memberService.getMemberById(member.getId()).getId())
                .isEqualTo(member.getId());
    }

    @DisplayName("ID를 기준으로 존재하지 않는 회원을 조회하면 예외가 발생한다.")
    @Test
    void getByIdNotExist() {
        assertThatThrownBy(() -> memberService.getMemberById(0L))
                .hasMessage("존재하지 않는 사용자입니다.");
    }

    @DisplayName("정상적인 값을 가진 요청이 주어지면 회원을 생성한다.")
    @Test
    void createMember() {
        MemberRequest request = MemberFixture.TOUROOT_LOCAL_USER.getCreateRequest();

        Long id = memberService.createMember(request);

        assertThat(id).isEqualTo(1L);
    }

    @DisplayName("중복된 이메일을 가진 회원을 생성하려하면 예외가 발생한다.")
    @Test
    void createMemberWithDuplicatedEmail() {
        Member member = testHelper.persistMember();
        MemberRequest duplicateRequest = new MemberRequest(member.getEmail(), "testPassword", "nickname",
                "https://dev.touroot.kr/images/f8c26e9f.png");

        assertThatThrownBy(() -> memberService.createMember(duplicateRequest))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이미 회원 가입되어 있는 이메일입니다.");
    }

    @DisplayName("멤버의 프로필을 업데이트 한다.")
    @Test
    void updateProfile() {
        Member member = testHelper.persistMember();
        MemberAuth memberAuth = new MemberAuth(member.getId());
        String newNickname = "newNickname";
        MultipartFile multipartFile = new MockMultipartFile("file", "image.jpg", "image/jpeg",
                "image content".getBytes());
        String newProfileImageUrl = s3Provider.uploadImages(List.of(new ImageFile(multipartFile)))
                .get(0)
                .replace("temporary", "images");
        ProfileUpdateRequest request = new ProfileUpdateRequest(newNickname, newProfileImageUrl);

        memberService.updateProfile(request, memberAuth);

        assertAll(
                () -> assertThat(memberService.getMemberById(member.getId()).getNickname())
                        .isEqualTo(newNickname),
                () -> assertThat(memberService.getMemberById(member.getId()).getProfileImageUrl())
                        .isEqualTo(newProfileImageUrl)
        );
    }
}
