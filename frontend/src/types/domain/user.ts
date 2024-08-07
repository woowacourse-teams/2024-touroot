export interface AuthTokenResponse {
  accessToken: string;
}

export interface UserResponse extends AuthTokenResponse {
  nickname: string;
  profileImageUrl: string;
}
