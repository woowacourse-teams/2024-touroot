import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { usePostUploadImages } from "@queries/index";
import { useGetTravelogue } from "@queries/useGetTravelogue";
import { usePutTravelogue } from "@queries/usePutTravelogue";

import {
  Accordion,
  Button,
  Chip,
  GoogleMapLoadScript,
  IconButton,
  Input,
  ModalBottomSheet,
  PageInfo,
  TextField,
  ThumbnailUpload,
} from "@components/common";
import TravelogueDayAccordion from "@components/pages/travelogueRegister/TravelogueDayAccordion/TravelogueDayAccordion";

import { useTravelogueDays } from "@hooks/pages/useTravelogueDays";
import { useDragScroll } from "@hooks/useDragScroll";
import useLeadingDebounce from "@hooks/useLeadingDebounce";
import useTagSelection from "@hooks/useTagSelection";
import useUser from "@hooks/useUser";

import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { ROUTE_PATHS_MAP } from "@constants/route";

import { extractID } from "@utils/extractId";

import * as S from "./TravelogueEditPage.styled";

const TravelogueEditPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const id = extractID(location.pathname);

  const { data } = useGetTravelogue(id);

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.slice(
      FORM_VALIDATIONS_MAP.title.minLength,
      FORM_VALIDATIONS_MAP.title.maxLength,
    );
    setTitle(title);
  };

  const { selectedTagIDs, onChangeSelectedTagIDs, handleClickTag, createSortedTags } =
    useTagSelection();

  const sortedTags = createSortedTags();

  const { scrollRef, onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLUListElement>();

  const {
    travelogueDays,
    onChangeTravelogueDays,
    onAddDay,
    onAddPlace,
    onDeleteDay,
    onChangePlaceDescription,
    onDeletePlace,
    onChangeImageUrls,
    onDeleteImageUrls,
  } = useTravelogueDays([]);

  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    thumbnailFileInputRef.current?.click();
  };

  const { mutateAsync: mutateAddImage, isPaused } = usePostUploadImages();

  const handleChangeThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnail = await mutateAddImage(Array.from(e.target.files as FileList));
    setThumbnail(thumbnail[0]);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };

  const { mutate: mutateTravelogueEdit } = usePutTravelogue();

  const handleEditTravelogue = () => {
    mutateTravelogueEdit(
      {
        travelogue: { title, thumbnail, tags: selectedTagIDs, days: travelogueDays },
        id: Number(id),
      },
      {
        onSuccess: (data) => {
          handleCloseBottomSheet();
          navigate(ROUTE_PATHS_MAP.travelogue(data?.data?.id));
        },
      },
    );
  };

  const debouncedEditTravelogue = useLeadingDebounce(() => handleEditTravelogue(), DEBOUNCED_TIME);

  const handleConfirmBottomSheet = () => {
    debouncedEditTravelogue();
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setThumbnail(data.thumbnail);
      onChangeSelectedTagIDs(data.tags.map((tag) => tag.id));
      onChangeTravelogueDays(data.days);
    }
  }, [data, onChangeSelectedTagIDs, onChangeTravelogueDays]);

  const { user } = useUser();

  useEffect(() => {
    const isAuthor = data?.authorId === user?.memberId;

    if (data && !isAuthor) {
      alert(ERROR_MESSAGE_MAP.api.travelogueEditOnlyWriter);
      navigate(ROUTE_PATHS_MAP.back);
    }
  }, [user, navigate, data]);

  return (
    <>
      <S.Layout>
        <PageInfo mainText="여행기 수정" />

        <TextField title="제목" isRequired>
          {(id) => (
            <Input
              id={id}
              value={title}
              maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
              placeholder="여행기 제목을 입력해주세요"
              count={title.length}
              maxCount={FORM_VALIDATIONS_MAP.title.maxLength}
              onChange={handleChangeTitle}
            />
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
          )}
        </TextField>

        <S.ThumbnailContainer>
          <TextField title="썸네일">
            {(id) => (
              <ThumbnailUpload
                id={id}
                previewUrls={[thumbnail]}
                onDeleteButton={() => setThumbnail("")}
                fileInputRef={thumbnailFileInputRef}
                onChangeImage={handleChangeThumbnail}
                onClickButton={handleButtonClick}
              />
            )}
          </TextField>
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
                  isPaused={isPaused}
                  key={travelogueDay.id}
                  travelogueDay={travelogueDay}
                  dayIndex={dayIndex}
                  onAddPlace={onAddPlace}
                  onDeletePlace={onDeletePlace}
                  onDeleteDay={onDeleteDay}
                  onChangePlaceDescription={onChangePlaceDescription}
                  onChangeImageUrls={onChangeImageUrls}
                  onDeleteImageUrls={onDeleteImageUrls}
                  onRequestAddImage={mutateAddImage}
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
            수정
          </Button>
        </div>
      </S.Layout>

      <ModalBottomSheet
        isOpen={isOpen}
        mainText="여행기를 수정할까요?"
        subText="수정한 후에도 다시 여행기를 변경할 수 있어요!"
        secondaryButtonLabel="취소"
        primaryButtonLabel="확인"
        onClose={handleCloseBottomSheet}
        onConfirm={handleConfirmBottomSheet}
      />
    </>
  );
};

export default TravelogueEditPage;
