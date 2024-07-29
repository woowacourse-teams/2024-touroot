import styled from "@emotion/styled";

export const Layout = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  svg {
    margin-bottom: 0.2rem;
  }
`;

export const Title = styled.h2`
  ${({ theme }) => theme.typography.mobile.bodyBold}
`;
