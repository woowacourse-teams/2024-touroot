import { useCallback, useState } from "react";

import { css } from "@emotion/react";



import {
  Accordion,
  Button,
  GoogleMapLoadScript,
  GoogleMapView,
  GoogleSearchPopup,
  IconButton,
  Input,
  ModalBottomSheet,
  MultiImageUpload,
  PageInfo,
  Text,
  Textarea,
  ThumbnailUpload,
} from "@components/common";

import { useImageUpload } from "@hooks/index";

import * as S from "./TravelogueRegisterPage.styled";
import { Day, Place, Travelogue } from "@type/domain/travelogue";

const Day = ({
  day,
  dayIndex,
  travelogue,
  handleDeleteDay,
  handleSearchPlaceInfo,
  handleDeletePlace,
  setTravelogue,
  handleAddPlace,
  isPopupOpen,
  setIsPopupOpen,
}: {
  day: Day;
  dayIndex: number;
  handleDeleteDay: (dayIndex: number) => void;
  handleDeletePlace: (dayIndex: number, placeIndex: number) => void;
  travelogue: Travelogue;
  setTravelogue: React.Dispatch<React.SetStateAction<Travelogue>>;
  handleAddPlace: (dayIndex: number) => void;
  isPopupOpen: boolean;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearchPlaceInfo: ({
    placeInfo,
    dayIndex,
    placeIndex,
  }: {
    placeInfo: Pick<Place, "name" | "position">;
    dayIndex: number;
    placeIndex: number;
  }) => void;
}) => {
  const { previewUrls, fileInputRef, handleImageChange, handleDeleteImage, handleButtonClick } =
    useImageUpload({
      multiple: true,
      maxCount: 10,
    });

  return (
    <Accordion.Item key={`${day}-${dayIndex}}`} value={`day-${dayIndex}`}>
      <Accordion.Trigger onDeleteItem={() => handleDeleteDay(dayIndex)}>
        {`Day ${dayIndex + 1}`}
      </Accordion.Trigger>
      <Accordion.Content>
        <Accordion.Root>
          <GoogleMapView places={day.places.map((place) => {
            return { lat: Number(place.position.lat), lng: Number(place.position.lng)}})} />

          {day.places.map((place, placeIndex) => (
            <Accordion.Item key={`${place}-${dayIndex}}`} value={`place-${dayIndex}-${placeIndex}`}>
              <Accordion.Trigger onDeleteItem={() => handleDeletePlace(dayIndex, placeIndex)}>
                {place.name || `장소 ${placeIndex + 1}`}
              </Accordion.Trigger>
              <Accordion.Content>
                <MultiImageUpload
                  previewUrls={previewUrls}
                  fileInputRef={fileInputRef}
                  handleImageChange={(e) => {
                    handleImageChange(e);
                    setTravelogue((prevTravelogue) => {
                      const newTravelogue = { ...prevTravelogue };
                      newTravelogue.days[dayIndex].places[placeIndex].photoUrls = [
                        ...newTravelogue.days[dayIndex].places[placeIndex].photoUrls,
                      ];
                      return newTravelogue;
                    });
                  }}
                  handleDeleteImage={(index) => {
                    handleDeleteImage(index);
                    setTravelogue((prevTravelogue) => {
                      const newTravelogue = { ...prevTravelogue };
                      newTravelogue.days[dayIndex].places[placeIndex].photoUrls.splice(index, 1);
                      return newTravelogue;
                    });
                  }}
                  handleButtonClick={handleButtonClick}
                  css={css`
                    margin-bottom: 1.6rem;
                  `}
                />
                <Textarea
                  placeholder="장소에 대한 간단한 설명을 남겨주세요"
                  onChange={(e) => {
                    const newTravelogue = { ...travelogue };
                    newTravelogue.days[dayIndex].places[placeIndex].description = e.target.value;
                    setTravelogue(newTravelogue);
                  }}
                  count={travelogue.days[dayIndex].places[placeIndex].description?.length || 0}
                  maxLength={300}
                  maxCount={300}
                />
              </Accordion.Content>
              {isPopupOpen && (
                <GoogleSearchPopup
                  onSearchPlaceInfo={(placeInfo) =>
                    handleSearchPlaceInfo({ placeInfo, dayIndex, placeIndex })
                  }
                />
              )}
            </Accordion.Item>
          ))}
        </Accordion.Root>
        <IconButton
          size="16"
          iconType="plus"
          position="left"
          css={[S.addTravelAddButtonStyle, S.addDayButtonStyle]}
          onClick={() => {
            setIsPopupOpen(true);
            handleAddPlace(dayIndex);
          }}
        >
          장소 추가하기
        </IconButton>
      </Accordion.Content>
    </Accordion.Item>
  );
};

const TravelogueRegisterPage = () => {
  const [travelogue, setTravelogue] = useState<Travelogue>({
    title: "",
    thumbnail: "",
    days: [],
  });

  const handleAddDay = () => {
    setTravelogue((prev) => ({
      ...prev,
      days: [...prev.days, { places: [] }],
    }));
  };

  const handleDeleteDay = (dayIndex: number) => {
    setTravelogue((prev) => ({
      ...prev,
      days: prev.days.filter((_, index) => index !== dayIndex),
    }));
  };

  const handleAddPlace = (dayIndex: number) => {
    setTravelogue((prev) => {
      const newDays = [...prev.days];
      newDays[dayIndex].places.push({
        name: "",
        photoUrls: [],
        description: "",
        position: { lat: '0', lng: '0' },
      });
      return { ...prev, days: newDays };
    });
  };

  const handleDeletePlace = (dayIndex: number, placeIndex: number) => {
    setTravelogue((prev) => {
      const newDays = [...prev.days];
      newDays[dayIndex].places = newDays[dayIndex].places.filter(
        (_, index) => index !== placeIndex,
      );
      return { ...prev, days: newDays };
    });
  };

  const MAX_TITLE_LENGTH = 20;

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTravelogue((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };

  // thumbnail
  const {
    previewUrls: thumbnailPreviewUrls,
    fileInputRef: thumbnailFileInputRef,
    handleImageChange: handleThumbnailImageChange,
    handleButtonClick: handleThumbnailButtonClick,
  } = useImageUpload();

  const handleChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleThumbnailImageChange(e);
    setTravelogue((prev) => ({
      ...prev,
      thumbnail: e.target.value,
    }));
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSearchPlaceInfo = useCallback(
    ({
      placeInfo,
      dayIndex,
      placeIndex,
    }: {
      placeInfo: Pick<Place, "name" | "position">;
      dayIndex: number;
      placeIndex: number;
    }) => {
      setTravelogue((prev) => {
        const newTravelogue = { ...prev };

        newTravelogue.days[dayIndex].places[placeIndex] = {
          ...newTravelogue.days[dayIndex].places[placeIndex],
          name: placeInfo.name,
          position: {
            lat: placeInfo.position.lat,
            lng: placeInfo.position.lng,
          },
        };

        return newTravelogue;
      });

      setIsPopupOpen(false); // 팝업 닫기
    },
    [],
  );

  return (
    <>
      <S.Layout>
        <PageInfo mainText="여행기 등록" subText="소중한 여행기를 공유해주세요." />
        <Input
          maxLength={MAX_TITLE_LENGTH}
          label="제목"
          count={travelogue.title.length}
          maxCount={MAX_TITLE_LENGTH}
          onChange={handleChangeTitle}
          value={travelogue.title}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          `}
        >
          <Text
            css={css`
              font-weight: 700;
            `}
            textType="body"
          >
            썸네일
          </Text>
          <ThumbnailUpload
            previewUrls={thumbnailPreviewUrls}
            fileInputRef={thumbnailFileInputRef}
            onChangeImage={handleChangeThumbnail}
            onClickButton={handleThumbnailButtonClick}
          />
        </div>

        <div css={S.accordionRootStyle}>
          <GoogleMapLoadScript libraries={["places", "maps"]}>
            <Accordion.Root>
              {travelogue.days.map((day, dayIndex) => (
                <Day
                  handleSearchPlaceInfo={handleSearchPlaceInfo}
                  key={`${day}-${dayIndex}`}
                  day={day}
                  dayIndex={dayIndex}
                  travelogue={travelogue}
                  isPopupOpen={isPopupOpen}
                  setIsPopupOpen={setIsPopupOpen}
                  handleAddPlace={handleAddPlace}
                  handleDeleteDay={handleDeleteDay}
                  handleDeletePlace={handleDeletePlace}
                  setTravelogue={setTravelogue}
                />
              ))}
            </Accordion.Root>
          </GoogleMapLoadScript>
          <IconButton
            size="16"
            iconType="plus"
            position="left"
            css={[S.addButtonStyle, S.addDayButtonStyle]}
            onClick={handleAddDay}
          >
            일자 추가하기
          </IconButton>
          <Button variants="primary" onClick={handleOpenBottomSheet}>
            등록
          </Button>
        </div>
      </S.Layout>
      <ModalBottomSheet
        isOpen={isOpen}
        mainText="여행기를 등록할까요?"
        subText="등록한 후에도 다시 여행기를 수정할 수 있어요!"
        onClose={handleCloseBottomSheet}
        onConfirm={() => {
          handleCloseBottomSheet();
        }}
      />
    </>
  );
};

export default TravelogueRegisterPage;
