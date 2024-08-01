package kr.touroot.member;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.dto.ProfileReadResponse;
import kr.touroot.member.service.MyPageFacadeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "마이 페이지")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/member/me")
public class MyPageController {

    private final MyPageFacadeService myPageFacadeService;

    @GetMapping("/profile")
    public ResponseEntity<ProfileReadResponse> readProfile(
            @NotNull MemberAuth memberAuth
    ) {
        ProfileReadResponse data = myPageFacadeService.readProfile(memberAuth);
        return ResponseEntity.ok(data);
    }
}
