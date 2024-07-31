import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import { useTransformDetailContext } from "@contexts/TravelogueProvider";
import { usePostTravelogue, usePostUploadImages } from "@queries/index";

import {
  Accordion,
  Button,
  DayContent,
  GoogleMapLoadScript,
  IconButton,
  Input,
  ModalBottomSheet,
  PageInfo,
  Text,
  ThumbnailUpload,
} from "@components/common";
import TravelogueMultiImageUpload from "@components/pages/travelogueRegister/TravelogueMultiImageUpload/TravelogueMultiImageUpload";

import { useTravelDays } from "@hooks/pages/useTravelDays";

import * as S from "./TravelogueRegisterPage.styled";

const MAX_TITLE_LENGTH = 20;

const TravelogueRegisterPage = () => {
  const { transformDetail } = useTransformDetailContext();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const {
    travelDays,
    onAddDay,
    onAddPlace,
    onDeleteDay,
    onChangePlaceDescription,
    onDeletePlace,
    onChangeImageUrls,
    onDeleteImageUrls,
  } = useTravelDays(transformDetail?.days ?? []);

  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    thumbnailFileInputRef.current?.click();
  };

  const handleChangeThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnail = await handleAddImage(Array.from(e.target.files as FileList));
    setThumbnail(thumbnail[0]);
  };

  const { mutateAsync: handleAddImage } = usePostUploadImages();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const handleConfirmBottomSheet = () => {
    handleRegisterTravelogue(
      { title, thumbnail, days: travelDays },
      {
        onSuccess: ({ data }) => {
          handleCloseBottomSheet();
          navigate(`/travelogue/${data.id}`);
        },
      },
    );
  };

  const { mutate: handleRegisterTravelogue } = usePostTravelogue();

  return (
    <>
      <S.Layout>
        <PageInfo mainText="여행기 등록" subText="소중한 여행기를 공유해주세요." />
        <Input
          value={title}
          maxLength={MAX_TITLE_LENGTH}
          label="제목"
          count={title.length}
          maxCount={MAX_TITLE_LENGTH}
          onChange={handleChangeTitle}
        />
        <S.PageInfoContainer>
          <Text
            css={css`
              font-weight: 700;
            `}
            textType="body"
          >
            썸네일
          </Text>
          <ThumbnailUpload
            previewUrls={[thumbnail]}
            fileInputRef={thumbnailFileInputRef}
            onChangeImage={handleChangeThumbnail}
            onClickButton={handleButtonClick}
          />
        </S.PageInfoContainer>
        <S.AccordionRootContainer>
          <GoogleMapLoadScript libraries={["places", "maps"]}>
            <Accordion.Root>
              {travelDays.map((travelDay, dayIndex) => (
                <DayContent
                  key={`${travelDay}-${dayIndex}`}
                  travelDay={travelDay}
                  dayIndex={dayIndex}
                  onAddPlace={onAddPlace}
                  onDeletePlace={onDeletePlace}
                  onDeleteDay={onDeleteDay}
                  onChangePlaceDescription={onChangePlaceDescription}
                >
                  {(placeIndex, imgUrls) => (
                    <TravelogueMultiImageUpload
                      imageUrls={imgUrls}
                      dayIndex={dayIndex}
                      placeIndex={placeIndex}
                      onChangeImageUrls={onChangeImageUrls}
                      onDeleteImageUrls={onDeleteImageUrls}
                      onRequestAddImage={handleAddImage}
                    />
                  )}
                </DayContent>
              ))}
            </Accordion.Root>
            <IconButton
              size="16"
              iconType="plus"
              position="left"
              css={[S.addButtonStyle, S.addDayButtonStyle]}
              onClick={() => onAddDay()}
            >
              일자 추가하기
            </IconButton>
          </GoogleMapLoadScript>
          <Button variants="primary" onClick={handleOpenBottomSheet}>
            등록
          </Button>
        </S.AccordionRootContainer>
      </S.Layout>
      <ModalBottomSheet
        isOpen={isOpen}
        mainText="여행기를 등록할까요?"
        subText="등록한 후에도 다시 여행기를 수정할 수 있어요!"
        onClose={handleCloseBottomSheet}
        onConfirm={handleConfirmBottomSheet}
      />
    </>
  );
};

export default TravelogueRegisterPage;
