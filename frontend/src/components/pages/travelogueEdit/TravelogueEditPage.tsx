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
import useTravelogueEdit from "@components/pages/travelogueEdit/hooks/useTravelogueEdit";
import useTravelogueInitialization from "@components/pages/travelogueEdit/hooks/useTravelogueInitialization";
import TravelogueDayAccordion from "@components/pages/travelogueRegister/TravelogueDayAccordion/TravelogueDayAccordion";

import useTravelogueFormState from "@hooks/pages/useTravelogueFormState";
import { useDragScroll } from "@hooks/useDragScroll";
import useToggle from "@hooks/useToggle";

import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";

import * as S from "./TravelogueEditPage.styled";

const TravelogueEditPage = () => {
  const [isOpen, handleOpenBottomSheet, handleCloseBottomSheet] = useToggle();

  const {
    state: { title, thumbnail, travelogueDays, selectedTagIDs, sortedTags, animationKey },
    handler: {
      onChangeTitle,
      onInitializeThumbnail,
      onChangeSelectedTagIDs,
      onResetThumbnail,
      onChangeThumbnail,
      onClickTag,
      onChangeTravelogueDays,
      onAddDay,
      onDeleteDay,
      onAddPlace,
      onDeletePlace,
      onChangeImageUrls,
      onDeleteImageUrls,
      onChangePlaceDescription,
    },
  } = useTravelogueFormState([]);

  const { isPuttingTraveloguePending, onEditTravelogue } = useTravelogueEdit(
    {
      title,
      thumbnail: thumbnail || (process.env.DEFAULT_THUMBNAIL_IMAGE ?? ""),
      tags: selectedTagIDs,
      days: travelogueDays,
    },
    handleCloseBottomSheet,
  );

  const { scrollRef, onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLUListElement>();

  useTravelogueInitialization({
    onChangeSelectedTagIDs,
    onChangeTitle,
    onChangeTravelogueDays,
    onInitializeThumbnail,
  });

  return (
    <>
      <S.Layout>
        <PageInfo mainText="여행기 수정" />

        <TextField title="제목" isRequired>
          {(id) => (
            <S.InputContainer>
              <Input
                id={id}
                value={title}
                maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
                placeholder="여행기 제목을 입력해주세요"
                onChange={(event) => onChangeTitle(event.target.value)}
              />
              <CharacterCount
                count={title.length}
                maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
              />
            </S.InputContainer>
          )}
        </TextField>

        <TextField
          title="태그"
          subTitle={`다녀온 여행에 대한 태그를 선택해 주세요. (최대 ${FORM_VALIDATIONS_MAP.tags.maxCount}개)`}
        >
          {(id) => (
            <S.TagsContainer>
              <S.ChipsContainer
                id={id}
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
          )}
        </TextField>

        <S.ThumbnailContainer>
          <TextField title="썸네일">
            {(id) => (
              <ThumbnailUpload
                id={id}
                previewUrls={[thumbnail]}
                onDeleteButton={onResetThumbnail}
                onChangeImage={(event) => onChangeThumbnail(event.target.files as FileList)}
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
                onClick={() => onAddDay()}
              >
                <Text textType="bodyBold">일자 추가하기</Text>
              </IconButton>
            </Accordion.Root>
          </GoogleMapLoadScript>
        </div>

        <Button variants="primary" onClick={handleOpenBottomSheet}>
          수정
        </Button>
      </S.Layout>

      <EditRegisterModalBottomSheet
        isOpen={isOpen}
        isPending={isPuttingTraveloguePending}
        mainText="여행기를 수정할까요?"
        subText="수정한 후에도 다시 여행기를 변경할 수 있어요!"
        onClose={handleCloseBottomSheet}
        onConfirm={onEditTravelogue}
      />
    </>
  );
};

export default TravelogueEditPage;
