import { BackIcon, Hamburger } from "@assets/svg";

interface IconButtonProps {
  variants: "back" | "hamburger" | "logo";
  onClickButton?: () => void;
}

const ICON_MAP: Record<IconButtonProps["variants"], JSX.Element> = {
  back: <BackIcon />,
  logo: <></>,
  hamburger: <Hamburger />,
};

const IconButton = ({ variants, onClickButton }: IconButtonProps) => {
  return <button onClick={onClickButton}>{ICON_MAP[variants]}</button>;
};

export default IconButton;
