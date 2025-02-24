import styled from "@emotion/styled";

export const Box = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  width: 100%;
  height: 4.8rem;
  padding: 0 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

export const PlaceName = styled.span`
  ${({ theme }) => theme.typography.mobile.detailBold}
`;

export const TagList = styled.ul`
  display: flex;
  gap: 0.4rem;

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Tag = styled.li`
  ${({ theme }) => theme.typography.mobile.detail}
  color: ${({ theme }) => theme.colors.text.secondary}
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
