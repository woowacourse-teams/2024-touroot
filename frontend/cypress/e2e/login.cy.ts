describe("카카오 로그인 e2e 테스트", () => {
  it("카카오 로그인이 완료되면 메인 페이지로 이동된다.", () => {
    cy.simulateKakaoLogin();
  });
});
