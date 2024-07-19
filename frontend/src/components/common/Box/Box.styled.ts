import styled from "@emotion/styled";

export const Box = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  width: 100%;
  height: 3.98rem;
  padding-left: 1.6rem;
  border: 1px solid ${(props) => props.theme.color.borderGray};

  border-radius: 4px;
`;

export const PlaceName = styled.span`
  ${({ theme }) => theme.typography.detailBold}
`;

export const TagList = styled.ul`
  display: flex;
  gap: 0.4rem;

  color: #616161;
`;

export const Tag = styled.li`
  ${(props) => props.theme.typography.detail}
  color: ${(props) => props.theme.color.darkGray}
`;
