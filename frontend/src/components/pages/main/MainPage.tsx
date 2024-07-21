import { TravelogueOverview } from "types";

import { Header } from "@components/common";

import * as S from "./MainPage.styled";
import TravelogueCard from "./TravelogueCard/TravelogueCard";

const MainPage = () => {
  return (
    <>
      <Header />
      <S.MainPageContentContainer>
        <S.MainPageHeaderContainer>
          <h1>지금 뜨고 있는 여행기</h1>
          <p>다른 이들의 여행을 한 번 구경해보세요.</p>
        </S.MainPageHeaderContainer>
        <S.MainPageTraveloguesList>
          {mockData.map(({ userAvatar, id, title, thumbnail, likes }) => (
            <TravelogueCard travelogueOverview={{ userAvatar, id, title, thumbnail, likes }} />
          ))}
        </S.MainPageTraveloguesList>
      </S.MainPageContentContainer>
    </>
  );
};

export default MainPage;

const mockData: TravelogueOverview[] = [
  {
    id: 1,
    userAvatar: "https://i.pinimg.com/736x/34/72/86/34728679b96d99ab01537f7a72cadf42.jpg",
    title: "도쿄 여행 야무지게 말아주기",
    thumbnail: "https://i.pinimg.com/736x/22/c5/d8/22c5d87871f44e592db0fd8c0d1e3dc1.jpg",
    likes: 3,
  },
  {
    id: 2,
    userAvatar: "",
    title: "갱얼쥐랑 캠핑 🐶",
    thumbnail: "https://i.pinimg.com/564x/20/bb/6d/20bb6d47bb88b8df862520c19c18600a.jpg",
    likes: 10,
  },
  {
    id: 3,
    userAvatar: "",
    title: "너무 좋았던 뉴욕 3박 4일 여행기",
    thumbnail: "https://i.pinimg.com/564x/ec/41/40/ec4140e69bd135b2a4ebb71c1fa43adf.jpg",
    likes: 8,
  },
  {
    id: 4,
    userAvatar: "",
    title: "알로하오에~ 🕺 단짝과의 하와이 여행",
    thumbnail: "https://i.pinimg.com/564x/71/be/c7/71bec7b00fe5c976a812c90e508a0580.jpg",
    likes: 2,
  },
  {
    id: 5,
    userAvatar: "",
    title: "안가면 후회하면 삿포로 여행지",
    thumbnail: "https://i.pinimg.com/564x/e2/ce/d4/e2ced4ad1c4454f9d7d5b00981ea6108.jpg",
    likes: 9,
  },
];
