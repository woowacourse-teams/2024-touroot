import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Global, css } from "@emotion/react";

import { Autocomplete } from "@react-google-maps/api";

import { PlaceInfo } from "@type/domain/common";

import { Button } from "@components/common";

import { CYPRESS_DATA_MAP } from "@constants/cypress";

import * as S from "./GoogleSearchPopup.styled";

interface GoogleSearchPopupProps {
  onClosePopup: () => void;
  onSearchPlaceInfo: (placeInfo: PlaceInfo) => void;
}

const GoogleSearchPopup = ({ onClosePopup, onSearchPlaceInfo }: GoogleSearchPopupProps) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);

    const pac = document.querySelector(".pac-container") as HTMLElement;
    if (pac) pac.classList.add("custom-pac-container");
  };

  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      if (place && place.geometry && place.geometry.location && place.address_components) {
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        const countryCode = place.address_components.find((component) =>
          component.types.includes("country"),
        )?.short_name;

        const placeInfo: PlaceInfo = {
          placeName: place.name || "",
          position: newCenter,
          countryCode: countryCode || "",
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

  return createPortal(
    <div css={S.layoutStyle}>
      <S.Layout data-cy={CYPRESS_DATA_MAP.googleSearchPopup.container}>
        <Global styles={S.autocompleteStyles} />
        <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
          <S.InputContainer>
            <S.StyledInput
              ref={inputRef}
              type="text"
              placeholder="예) 영동대로 517, 삼성동 159"
              data-cy={CYPRESS_DATA_MAP.googleSearchPopup.searchInput}
              aria-label="장소 검색 입력창. 도로명, 지역명, 건물 번호 등을 입력하세요. 자동완성 결과가 나타나면 화살표 키로 원하는 장소를 선택할 수 있습니다."
            />
          </S.InputContainer>
        </Autocomplete>
        <S.TipContainer>
          <p>tip</p>
          <p>
            도로명이나 지역명을 이용해서 검색해 보세요. 건물 번호, 번지를 함께 입력하지면 더욱
            정확한 결과가 검색됩니다.
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
    </div>,
    document.body,
  );
};

export default GoogleSearchPopup;
