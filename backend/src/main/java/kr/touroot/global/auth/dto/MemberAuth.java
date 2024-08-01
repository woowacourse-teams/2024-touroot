package kr.touroot.global.auth.dto;

import jakarta.validation.constraints.NotNull;

public record MemberAuth(@NotNull Long memberId) {
}
