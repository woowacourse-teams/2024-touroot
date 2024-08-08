import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { PRIMITIVE_COLORS } from "@styles/tokens";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  width: 100%;
  height: 100vh;
  max-width: 48rem;

  background-color: ${PRIMITIVE_COLORS.white};
  transform: translateX(-3.2rem);
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 1.4rem !important;
  padding-right: 4rem !important;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};

  font-size: ${(props) => props.theme.typography.mobile.bodyBold};

  &:focus-visible {
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

export const autocompleteStyles = css`
  .pac-container {
    margin-top: 5px;
    padding: 5px;
    border: none;

    background-color: #fff;

    box-shadow: none;
  }

  .pac-item {
    border: none;

    font-size: 1.4rem;
  }

  .pac-container .pac-item {
    padding: 8px;
    cursor: pointer;
  }

  .pac-container .pac-item:hover {
    background-color: ${PRIMITIVE_COLORS.blue[50]};
  }

  .pac-container .pac-item-query {
    color: #333;
    font-size: 1.4rem;
  }

  .pac-container .pac-icon:hover {
    background-image: url("https://i.pinimg.com/474x/71/74/46/71744691c23313e65b8bf8309640130d.jpg") !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: contain !important;
  }
`;

export const TipContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  padding: ${(props) => props.theme.spacing.m};
  gap: 1rem;

  p:first-of-type {
    ${(props) => props.theme.typography.mobile.detailBold}
  }

  p:nth-of-type(2) {
    ${(props) => props.theme.typography.mobile.detail}
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const InputIcon = styled.svg`
  position: absolute;
  top: 50%;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const ButtonContainer = styled.div`
  margin-top: auto;
  padding: 1.6rem;
`;
