import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import {
  Accordion,
  Button,
  CharacterCount,
  Chip,
  EditRegisterModalBottomSheet,
  GoogleMapLoadScript,
  IconButton,
  Input,
  PageInfo,
  Text,
  TextField,
  ThumbnailUpload,
} from "@components/common";
import TravelogueDayAccordion from "@components/pages/travelogueRegister/TravelogueDayAccordion/TravelogueDayAccordion";
import useTravelogueForm from "@components/pages/travelogueRegister/hooks/useTravelogueForm";

import { useDragScroll } from "@hooks/useDragScroll";
import useUser from "@hooks/useUser";

import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { ROUTE_PATHS_MAP } from "@constants/route";

import * as S from "./TravelogueRegisterPage.styled";

const TravelogueRegisterPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const { transformDetail } = useTravelTransformDetailContext();

  const {
    state: {
      title,
      thumbnail,
      travelogueDays,
      selectedTagIDs,
      sortedTags,
      animationKey,
      isPostingTraveloguePending,
    },
    handler: {
      onChangeTitle,
      onChangeThumbnail,
      onResetThumbnail,
      onClickTag,
      onAddDay,
      onDeleteDay,
      onAddPlace,
      onDeletePlace,
      onChangeImageUrls,
      onDeleteImageUrls,
      onChangePlaceDescription,
      onSubmitTravelogue,
    },
  } = useTravelogueForm(transformDetail?.days ?? [], handleCloseBottomSheet);

  const { scrollRef, onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLUListElement>();

  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    thumbnailFileInputRef.current?.click();
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

        <TextField title="제목" isRequired>
          {(id) => (
            <S.InputContainer>
              <Input
                id={id}
                value={title}
                maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
                placeholder="여행기 제목을 입력해주세요"
                onChange={onChangeTitle}
              />
              <CharacterCount
                count={title.length}
                maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
              />
            </S.InputContainer>
          )}
        </TextField>

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
            {sortedTags.map((tag, index) => (
              <Chip
                key={`${tag.id}-${animationKey}`}
                index={index}
                label={tag.tag}
                isSelected={selectedTagIDs.includes(tag.id)}
                onClick={() => onClickTag(tag.id)}
              />
            ))}
          </S.ChipsContainer>
        </S.TagsContainer>

        <S.ThumbnailContainer>
          <TextField title="썸네일">
            {(id) => (
              <ThumbnailUpload
                id={id}
                onDeleteButton={onResetThumbnail}
                previewUrls={[thumbnail]}
                fileInputRef={thumbnailFileInputRef}
                onChangeImage={(event) => onChangeThumbnail(event.target.files as FileList)}
                onClickButton={handleButtonClick}
              />
            )}
          </TextField>
        </S.ThumbnailContainer>

        <div>
          <GoogleMapLoadScript
            loadingElement={
              <IconButton
                size="16"
                iconType="plus"
                position="left"
                css={S.addButtonStyle}
                onClick={onAddDay}
              >
                <Text textType="bodyBold">일자 추가하기</Text>
              </IconButton>
            }
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
                />
              ))}
              <IconButton
                size="16"
                iconType="plus"
                position="left"
                css={S.addButtonStyle}
                onClick={onAddDay}
              >
                <Text textType="bodyBold">일자 추가하기</Text>
              </IconButton>
            </Accordion.Root>
          </GoogleMapLoadScript>
        </div>

        <Button variants="primary" onClick={handleOpenBottomSheet}>
          등록
        </Button>
      </S.Layout>

      <EditRegisterModalBottomSheet
        isOpen={isOpen}
        isPending={isPostingTraveloguePending}
        mainText="여행기를 등록할까요?"
        subText="등록한 후에도 다시 여행기를 수정할 수 있어요!"
        onClose={handleCloseBottomSheet}
        onConfirm={onSubmitTravelogue}
      />
    </>
  );
};

export default TravelogueRegisterPage;
