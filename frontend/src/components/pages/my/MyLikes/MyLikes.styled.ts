import styled from "@emotion/styled";

export const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: ${(props) => props.theme.spacing.m};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.m};

  width: 100%;
  padding: 0 ${(props) => props.theme.spacing.l};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing.s};
`;

export const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.m};

  width: 100%;
`;

export const BoxButton = styled.button`
  display: flex;
  gap: ${(props) => props.theme.spacing.m};
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  padding: ${(props) => props.theme.spacing.m};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 10px;
`;
