import { useCallback, useEffect, useRef, useState } from "react";

import { Global, css } from "@emotion/react";

import { Autocomplete } from "@react-google-maps/api";

import type { TravelTransformPlace } from "@type/domain/travelTransform";

import { Button } from "@components/common";

import * as S from "./GoogleSearchPopup.styled";

interface GoogleSearchPopupProps {
  onClosePopup: () => void;
  onSearchPlaceInfo: (placeInfo: Pick<TravelTransformPlace, "placeName" | "position">) => void;
}

const GoogleSearchPopup = ({ onClosePopup, onSearchPlaceInfo }: GoogleSearchPopupProps) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);

    const pac = document.querySelector(".pac-container") as HTMLElement;
    if (pac) pac.classList.add("custom-pac-container");
  };

  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        const placeInfo: Pick<TravelTransformPlace, "placeName" | "position"> = {
          placeName: place.name || "",
          position: newCenter,
        };

        onSearchPlaceInfo(placeInfo);
      }
    }
  }, [autocomplete, onSearchPlaceInfo]);

  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      // 입력 필드에 포커스가 있을 때만 엔터 키 이벤트 처리
      if (event.key === "Enter" && document.activeElement === inputRef.current) {
        event.preventDefault();
        onPlaceChanged();
      }
    };

    document.addEventListener("keydown", handleEnterKey);
    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, [onPlaceChanged]);

  return (
    <S.Layout>
      <Global styles={S.autocompleteStyles} />
      <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
        <S.InputContainer>
          <S.StyledInput ref={inputRef} type="text" placeholder="예) 영동대로 517, 삼성동 159" />
        </S.InputContainer>
      </Autocomplete>
      <S.TipContainer>
        <p>tip</p>
        <p>
          도로명이나 지역명을 이용해서 검색해 보세요. 건물 번호, 번지를 함께 입력하지면 더욱 정확한
          결과가 검색됩니다.
        </p>
      </S.TipContainer>

      <S.ButtonContainer>
        <Button
          css={css`
            width: 100%;
          `}
          onClick={onClosePopup}
          variants="secondary"
        >
          취소
        </Button>
      </S.ButtonContainer>
    </S.Layout>
  );
};

export default GoogleSearchPopup;
