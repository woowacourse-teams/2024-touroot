package kr.touroot.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.dto.ExceptionResponse;
import kr.touroot.member.dto.MyTravelogueResponse;
import kr.touroot.member.dto.ProfileResponse;
import kr.touroot.member.dto.request.ProfileUpdateRequest;
import kr.touroot.member.service.MyPageFacadeService;
import kr.touroot.travelplan.dto.response.TravelPlanResponse;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<Page<MyTravelogueResponse>> readTravelogues(
            @NotNull MemberAuth memberAuth,
            @Parameter(hidden = true)
            @PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        Page<MyTravelogueResponse> data = myPageFacadeService.readTravelogues(memberAuth, pageable);
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
    public ResponseEntity<Page<TravelPlanResponse>> readTravelPlans(
            @NotNull MemberAuth memberAuth,
            @Parameter(hidden = true)
            @PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        Page<TravelPlanResponse> data = myPageFacadeService.readTravelPlans(memberAuth, pageable);
        return ResponseEntity.ok(data);
    }

    @Operation(summary = "나의 프로필 정보 수정")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "내 프로필 정보 수정에 성공했을 때"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "요청 Body에 올바르지 않은 값이 전달되었을 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "로그인하지 않은 사용자가 프로필 정보 수정을 시도할 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @PatchMapping("/profile")
    public ResponseEntity<ProfileResponse> updateProfile(
            @Valid @RequestBody ProfileUpdateRequest request,
            @NotNull MemberAuth memberAuth
    ) {
        return ResponseEntity.ok(myPageFacadeService.updateProfile(request, memberAuth));
    }
}
