import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import { usePostTravelogue, usePostUploadImages } from "@queries/index";

import {
  Accordion,
  Button,
  Chip,
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
import { useDragScroll } from "@hooks/useDragScroll";
import useLeadingDebounce from "@hooks/useLeadingDebounce";
import useTagSelection from "@hooks/useTagSelection";
import useUser from "@hooks/useUser";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { ROUTE_PATHS_MAP } from "@constants/route";

import * as S from "./TravelogueRegisterPage.styled";

const TravelogueRegisterPage = () => {
  const navigate = useNavigate();

  const { transformDetail } = useTravelTransformDetailContext();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.slice(
      FORM_VALIDATIONS_MAP.title.minLength,
      FORM_VALIDATIONS_MAP.title.maxLength,
    );
    setTitle(title);
  };

  const { selectedTagIDs, handleClickTag, createSortedTags } = useTagSelection();

  const sortedTags = createSortedTags();

  const { scrollRef, onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLUListElement>();

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

  const { mutateAsync: handleAddImage } = usePostUploadImages();

  const handleChangeThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnail = await handleAddImage(Array.from(e.target.files as FileList));
    setThumbnail(thumbnail[0]);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };

  const { mutate: registerTravelogueMutate } = usePostTravelogue();

  const handleRegisterTravelogue = () => {
    registerTravelogueMutate(
      { title, thumbnail, tags: selectedTagIDs, days: travelogueDays },
      {
        onSuccess: (data) => {
          handleCloseBottomSheet();
          navigate(ROUTE_PATHS_MAP.travelogue(data?.data?.id));
        },
      },
    );
  };

  const debouncedRegisterTravelogue = useLeadingDebounce(() => handleRegisterTravelogue(), 3000);

  const handleConfirmBottomSheet = () => {
    debouncedRegisterTravelogue();
  };

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
        <PageInfo mainText="여행기 등록" subText="소중한 여행기를 공유해 주세요." />

        <Input
          value={title}
          maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
          label="제목"
          count={title.length}
          maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
          onChange={handleChangeTitle}
        />

        <S.TagsContainer>
          <Text textType="bodyBold">태그</Text>
          <Text textType="detail" css={S.subTextColor}>
            {`다녀온 여행에 대한 태그를 선택해 주세요. (최대 ${FORM_VALIDATIONS_MAP.tags.maxCount}개)`}
          </Text>
          <S.ChipsContainer
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            {sortedTags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.tag}
                isSelected={selectedTagIDs.includes(tag.id)}
                onClick={() => handleClickTag(tag.id)}
              />
            ))}
          </S.ChipsContainer>
        </S.TagsContainer>

        <S.ThumbnailContainer>
          <Text textType="bodyBold">썸네일</Text>
          <ThumbnailUpload
            previewUrls={[thumbnail]}
            fileInputRef={thumbnailFileInputRef}
            onChangeImage={handleChangeThumbnail}
            onClickButton={handleButtonClick}
          />
        </S.ThumbnailContainer>

        <div>
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
            <Accordion.Root css={S.accordionRootStyle}>
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
              css={[S.addButtonStyle]}
              onClick={() => onAddDay()}
            >
              일자 추가하기
            </IconButton>
          </GoogleMapLoadScript>
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
        onConfirm={handleConfirmBottomSheet}
      />
    </>
  );
};

export default TravelogueRegisterPage;
