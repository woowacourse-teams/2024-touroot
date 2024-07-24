import { BackIcon, DoubleRightArrow, Hamburger } from "@assets/svg";

import Drawer from "../Drawer/Drawer";
import * as S from "./Header.styled";

const headerMenus = ["마이페이지", "로그아웃"];

const Header = () => {
  return (
    <Drawer>
      <S.HeaderLayout>
        <BackIcon />
        <Drawer.Trigger>
          <Hamburger />
        </Drawer.Trigger>
      </S.HeaderLayout>

      <Drawer.Header>
        <S.DrawHeaderContainer>
          <Drawer.Trigger>
            <DoubleRightArrow />
          </Drawer.Trigger>
        </S.DrawHeaderContainer>
      </Drawer.Header>
      <Drawer.Content>
        <S.MenuList>
          {headerMenus.map((menu, index) => (
            <S.MenuItem key={index}>{menu}</S.MenuItem>
          ))}
        </S.MenuList>
      </Drawer.Content>
    </Drawer>
  );
};

export default Header;
