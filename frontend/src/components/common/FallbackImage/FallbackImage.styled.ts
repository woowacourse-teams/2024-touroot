import styled from "@emotion/styled";

export const Fallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  background-color: #eee;

  ${(props) => props.theme.typography.mobile.detailBold};
  color: #9e9e9e;
`;
