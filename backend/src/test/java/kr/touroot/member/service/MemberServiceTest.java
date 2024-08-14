package kr.touroot.member.service;

import static kr.touroot.member.fixture.MemberRequestFixture.DUPLICATE_EMAIL_MEMBER;
import static kr.touroot.member.fixture.MemberRequestFixture.DUPLICATE_NICKNAME_MEMBER;
import static kr.touroot.member.fixture.MemberRequestFixture.VALID_MEMBER;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.authentication.infrastructure.PasswordEncryptor;
import kr.touroot.global.ServiceTest;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.member.domain.Member;
import kr.touroot.member.dto.request.MemberRequest;
import kr.touroot.member.dto.request.ProfileUpdateRequest;
import kr.touroot.member.helper.MemberTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

@DisplayName("사용자 서비스")
@Import(value = {MemberService.class, MemberTestHelper.class, PasswordEncryptor.class})
@ServiceTest
class MemberServiceTest {

    private final MemberService memberService;
    private final MemberTestHelper testHelper;
    private final DatabaseCleaner databaseCleaner;

    @Autowired
    public MemberServiceTest(
            MemberService memberService,
            MemberTestHelper testHelper,
            DatabaseCleaner databaseCleaner
    ) {
        this.memberService = memberService;
        this.testHelper = testHelper;
        this.databaseCleaner = databaseCleaner;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("ID를 기준으로 회원을 조회한다.")
    @Test
    void getById() {
        Member member = testHelper.persistMember();

        assertThat(memberService.getById(member.getId()).getId())
                .isEqualTo(member.getId());
    }

    @DisplayName("ID를 기준으로 존재하지 않는 회원을 조회하면 예외가 발생한다.")
    @Test
    void getByIdNotExist() {
        assertThatThrownBy(() -> memberService.getById(0L))
                .hasMessage("존재하지 않는 사용자입니다.");
    }

    @DisplayName("정상적인 값을 가진 요청이 주어지면 회원을 생성한다.")
    @Test
    void createMember() {
        MemberRequest request = VALID_MEMBER.getRequest();

        Long id = memberService.createMember(request);

        assertThat(id).isEqualTo(1L);
    }

    @DisplayName("중복된 이메일을 가진 회원을 생성하려하면 예외가 발생한다.")
    @Test
    void createMemberWithDuplicatedEmail() {
        testHelper.persistMember();
        MemberRequest request = DUPLICATE_EMAIL_MEMBER.getRequest();

        assertThatThrownBy(() -> memberService.createMember(request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이미 회원 가입되어 있는 이메일입니다.");
    }

    @DisplayName("중복된 이메일을 가진 회원을 생성하려하면 예외가 발생한다.")
    @Test
    void createMemberWithDuplicatedNickname() {
        testHelper.persistMember();
        MemberRequest request = DUPLICATE_NICKNAME_MEMBER.getRequest();

        assertThatThrownBy(() -> memberService.createMember(request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이미 사용 중인 닉네임입니다.");
    }

    @DisplayName("멤버의 프로필을 업데이트 한다.")
    @Test
    void updateProfile() {
        Member member = testHelper.persistMember();
        MemberAuth memberAuth = new MemberAuth(member.getId());
        ProfileUpdateRequest request = new ProfileUpdateRequest("newNickname");

        memberService.updateProfile(request, memberAuth);

        assertThat(memberService.getById(member.getId()).getNickname())
                .isEqualTo("newNickname");
    }
}
