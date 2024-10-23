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
import useTravelogueRegister from "@components/pages/travelogueRegister/hooks/useTravelogueRegister";

import useTravelogueFormState from "@hooks/pages/useTravelogueFormState/useTravelogueFormState";
import useAuthRedirect from "@hooks/useAuthRedirect";
import { useDragScroll } from "@hooks/useDragScroll";
import useToggle from "@hooks/useToggle";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

import * as S from "./TravelogueRegisterPage.styled";

const TravelogueRegisterPage = () => {
  const [isOpen, handleOpenBottomSheet, handleCloseBottomSheet] = useToggle();

  const { transformDetail } = useTravelTransformDetailContext();

  const {
    state: {
      title,
      thumbnail,
      travelogueDays,
      selectedTagIDs,
      sortedTags,
      multiSelectionTagAnimationKey,
    },
    handler: {
      handleChangeTitle,
      handleChangeThumbnail,
      handleResetThumbnail,
      handleClickTag,
      handleAddDay,
      handleDeleteDay,
      handleAddPlace,
      handleDeletePlace,
      handleChangeImageUrls,
      handleDeleteImageUrls,
      handleChangePlaceDescription,
    },
    errorMessages: { titleErrorMessage, travelogueDaysErrorMessage },
    isEnabledForm,
  } = useTravelogueFormState(transformDetail?.days ?? []);

  const payload = {
    title,
    thumbnail: thumbnail || (process.env.DEFAULT_THUMBNAIL_IMAGE ?? ""),
    tags: selectedTagIDs,
    days: travelogueDays,
  };

  const { handleDebouncedSubmitTravelogue, isPostingTraveloguePending } = useTravelogueRegister(
    payload,
    handleCloseBottomSheet,
  );

  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDragScroll<HTMLUListElement>();

  useAuthRedirect();

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
                placeholder="여행기 제목을 입력해주세요"
                onChange={(event) => handleChangeTitle(event.target.value)}
              />
              <S.TitleMessageContainer>
                {titleErrorMessage && (
                  <Text textType="detail" css={S.errorTextStyle}>
                    {titleErrorMessage}
                  </Text>
                )}
                <CharacterCount
                  count={title.length}
                  maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
                  css={S.characterCountStyle}
                />
              </S.TitleMessageContainer>
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
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            {sortedTags.map((tag, index) => (
              <Chip
                key={`${tag.id}-${multiSelectionTagAnimationKey}`}
                index={index}
                label={tag.tag}
                isSelected={selectedTagIDs.includes(tag.id)}
                onClick={() => handleClickTag(tag.id)}
              />
            ))}
          </S.ChipsContainer>
        </S.TagsContainer>

        <S.ThumbnailContainer>
          <TextField title="썸네일">
            {(id) => (
              <ThumbnailUpload
                id={id}
                onDeleteButton={handleResetThumbnail}
                previewUrls={[thumbnail]}
                onChangeImage={(event) => handleChangeThumbnail(event.target.files as FileList)}
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
                onClick={handleAddDay}
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
                  onAddPlace={handleAddPlace}
                  onDeletePlace={handleDeletePlace}
                  onDeleteDay={handleDeleteDay}
                  onChangePlaceDescription={handleChangePlaceDescription}
                  onChangeImageUrls={handleChangeImageUrls}
                  onDeleteImageUrls={handleDeleteImageUrls}
                />
              ))}
              <IconButton
                size="16"
                iconType="plus"
                position="left"
                css={S.addButtonStyle}
                onClick={handleAddDay}
              >
                <Text textType="bodyBold">일자 추가하기</Text>
              </IconButton>
              {travelogueDaysErrorMessage && (
                <Text textType="detail" css={S.errorTextStyle}>
                  {travelogueDaysErrorMessage}
                </Text>
              )}
            </Accordion.Root>
          </GoogleMapLoadScript>
        </div>

        <Button disabled={!isEnabledForm} variants="primary" onClick={handleOpenBottomSheet}>
          등록
        </Button>
      </S.Layout>

      <EditRegisterModalBottomSheet
        isOpen={isOpen}
        isPending={isPostingTraveloguePending}
        mainText="여행기를 등록할까요?"
        subText="등록한 후에도 다시 여행기를 수정할 수 있어요!"
        onClose={handleCloseBottomSheet}
        onConfirm={handleDebouncedSubmitTravelogue}
      />
    </>
  );
};

export default TravelogueRegisterPage;
