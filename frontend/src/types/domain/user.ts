export interface AuthTokenResponse {
  accessToken: string;
  memberId: number;
}

export interface UserResponse extends AuthTokenResponse {
  nickname: string;
  profileImageUrl: string;
}
