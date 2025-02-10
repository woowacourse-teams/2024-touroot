export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  memberId: number;
}

export interface UserResponse extends AuthTokenResponse {
  nickname: string;
  profileImageUrl: string;
}
