import styled from "@emotion/styled";

export const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: ${(props) => props.theme.spacing.m};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing.s};
`;

export const TraveloguesList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${(props) => props.theme.spacing.m};
`;
