import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import { usePostTravelogue, usePostUploadImages } from "@queries/index";

import {
  Accordion,
  Button,
  GoogleMapLoadScript,
  IconButton,
  Input,
  ModalBottomSheet,
  PageInfo,
  Text,
  ThumbnailUpload,
} from "@components/common";
import TravelogueDayAccordion from "@components/pages/travelogueRegister/TravelogueDayAccordion/TravelogueDayAccordion";

import { useTravelogueDays } from "@hooks/pages/useTravelogueDays";
import useUser from "@hooks/useUser";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { ROUTE_PATHS_MAP } from "@constants/route";

import * as S from "./TravelogueEditPage.styled";

const MIN_TITLE_LENGTH = 0;
const MAX_TITLE_LENGTH = 20;

const TravelogueEditPage = () => {
  const { transformDetail } = useTravelTransformDetailContext();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.slice(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
    setTitle(title);
  };

  const {
    travelogueDays,
    onAddDay,
    onAddPlace,
    onDeleteDay,
    onChangePlaceDescription,
    onDeletePlace,
    onChangeImageUrls,
    onDeleteImageUrls,
  } = useTravelogueDays(transformDetail?.days ?? []);

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
      { title, thumbnail, days: travelogueDays },
      {
        onSuccess: (data) => {
          handleCloseBottomSheet();
          navigate(ROUTE_PATHS_MAP.travelogue(data?.data?.id));
        },
      },
    );
  };

  const { mutate: handleRegisterTravelogue } = usePostTravelogue();

  const { user } = useUser();

  const { saveTransformDetail } = useTravelTransformDetailContext();

  useEffect(() => {
    if (!user?.accessToken) {
      alert(ERROR_MESSAGE_MAP.api.login);
      navigate(ROUTE_PATHS_MAP.login);
    }

    return () => {
      saveTransformDetail(null);
    };
  }, [user?.accessToken, navigate]);

  return (
    <>
      <S.Layout>
        <PageInfo mainText="여행기 수정" />
        <Input
          value={title}
          maxLength={MAX_TITLE_LENGTH}
          label="제목"
          placeholder="여행기 제목을 입력해주세요"
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
          <GoogleMapLoadScript
            loadingElement={
              <S.LoadingWrapper>
                <IconButton
                  size="16"
                  iconType="plus"
                  position="left"
                  css={[S.addButtonStyle, S.addDayButtonStyle, S.loadingButtonStyle]}
                  onClick={() => onAddDay()}
                >
                  일자 추가하기
                </IconButton>
              </S.LoadingWrapper>
            }
            libraries={["places", "maps"]}
          >
            <Accordion.Root>
              {travelogueDays.map((travelogueDay, dayIndex) => (
                <TravelogueDayAccordion
                  key={travelogueDay.id}
                  travelogueDay={travelogueDay}
                  dayIndex={dayIndex}
                  onAddPlace={onAddPlace}
                  onDeletePlace={onDeletePlace}
                  onDeleteDay={onDeleteDay}
                  onChangePlaceDescription={onChangePlaceDescription}
                  onChangeImageUrls={onChangeImageUrls}
                  onDeleteImageUrls={onDeleteImageUrls}
                  onRequestAddImage={handleAddImage}
                />
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
            수정
          </Button>
        </S.AccordionRootContainer>
      </S.Layout>
      {isOpen && (
        <ModalBottomSheet
          isOpen={isOpen}
          mainText="여행기를 수정할까요?"
          subText="수정한 후에도 재수정이 가능해요!"
          secondaryButtonLabel="취소"
          primaryButtonLabel="수정"
          onClose={handleCloseBottomSheet}
          onConfirm={handleConfirmBottomSheet}
        />
      )}
    </>
  );
};

export default TravelogueEditPage;
