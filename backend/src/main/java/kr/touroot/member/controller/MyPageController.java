package kr.touroot.member.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.dto.MyTravelPlanResponse;
import kr.touroot.member.dto.MyTraveloguesResponse;
import kr.touroot.member.dto.ProfileResponse;
import kr.touroot.member.service.MyPageFacadeService;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public ResponseEntity<ProfileResponse> readProfile(@NotNull MemberAuth memberAuth) {
        ProfileResponse data = myPageFacadeService.readProfile(memberAuth);
        return ResponseEntity.ok(data);
    }

    @PageableAsQueryParam
    @GetMapping("/travelogues")
    public ResponseEntity<Page<MyTraveloguesResponse>> readTravelogues(
            @NotNull MemberAuth memberAuth,
            @Parameter(hidden = true)
            @PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        Page<MyTraveloguesResponse> data = myPageFacadeService.readTravelogues(memberAuth, pageable);
        return ResponseEntity.ok(data);
    }

    @PageableAsQueryParam
    @GetMapping("/travel-plans")
    public ResponseEntity<Page<MyTravelPlanResponse>> readTravelPlans(
            @NotNull MemberAuth memberAuth,
            @Parameter(hidden = true)
            @PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        Page<MyTravelPlanResponse> data = myPageFacadeService.readTravelPlans(memberAuth, pageable);
        return ResponseEntity.ok(data);
    }
}
