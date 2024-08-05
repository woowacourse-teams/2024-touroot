package kr.touroot.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.dto.ExceptionResponse;
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
@RequestMapping("/api/v1/member/me")
public class MyPageController {

    private final MyPageFacadeService myPageFacadeService;

    @Operation(summary = "나의 프로필 정보 조회")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "내 프로필 정보 조회에 성공했을 때"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "로그인하지 않은 사용자가 프로필 정보 조회에 시도할 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> readProfile(@NotNull MemberAuth memberAuth) {
        ProfileResponse data = myPageFacadeService.readProfile(memberAuth);
        return ResponseEntity.ok(data);
    }

    @Operation(summary = "내 여행기 조회")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "내 여행기 조회에 성공했을 때"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "로그인하지 않은 사용자가 조회를 시도할 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
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

    @Operation(summary = "내 여행 계획 조회")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "내 여행 계획 조회에 성공했을 때"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "로그인하지 않은 사용자가 조회를 시도할 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
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
