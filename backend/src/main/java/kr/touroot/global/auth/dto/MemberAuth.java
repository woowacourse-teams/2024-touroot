package kr.touroot.global.auth.dto;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotNull;

@Hidden
public record MemberAuth(@NotNull Long memberId) {
}
