import styled from "@emotion/styled";

export const FloatingButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  right: max(0vw + 2rem, calc(50vw - 22rem));
  bottom: 2rem;
  z-index: ${({ theme }) => theme.zIndex.floating};
`;

export const MainButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);

  background-color: ${({ theme }) => theme.colors.primary};

  cursor: pointer;
`;
