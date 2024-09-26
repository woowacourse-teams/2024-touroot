import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravelTransformDetailContext } from "@contexts/TravelTransformDetailProvider";

import { usePostTravelogue, usePostUploadImages } from "@queries/index";

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

import { useTravelogueDays } from "@hooks/pages/useTravelogueDays";
import { useDragScroll } from "@hooks/useDragScroll";
import useLeadingDebounce from "@hooks/useLeadingDebounce";
import useMultiSelectionTag from "@hooks/useMultiSelectionTag";
import useUser from "@hooks/useUser";

import { DEBOUNCED_TIME } from "@constants/debouncedTime";
import { ERROR_MESSAGE_MAP } from "@constants/errorMessage";
import { FORM_VALIDATIONS_MAP } from "@constants/formValidation";
import { ROUTE_PATHS_MAP } from "@constants/route";


import getInitialTravelTitle from "@utils/getInitialTravelTitle";
import resizeAndConvertImage from "@utils/resizeAndConvertImage";


import * as S from "./TravelogueRegisterPage.styled";

const TravelogueRegisterPage = () => {
  const navigate = useNavigate();

  const { transformDetail } = useTravelTransformDetailContext();

  const [thumbnail, setThumbnail] = useState("");

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.slice(
      FORM_VALIDATIONS_MAP.title.minLength,
      FORM_VALIDATIONS_MAP.title.maxLength,
    );
    setTitle(title);
  };

  const { selectedTagIDs, handleClickTag, sortedTags, animationKey } = useMultiSelectionTag();

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

  const initialTitle = getInitialTravelTitle({ days: transformDetail?.days, type: "travelogue" });

  const [title, setTitle] = useState(initialTitle);

  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    thumbnailFileInputRef.current?.click();
  };

  const { mutateAsync: mutateAddImage, isPaused } = usePostUploadImages();

  const handleChangeThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = Array.from(e.target.files as FileList);

      const processedFiles = await Promise.all(files.map((file) => resizeAndConvertImage(file)));

      const thumbnail = await mutateAddImage(processedFiles);
      setThumbnail(thumbnail[0]);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };

  const { mutate: mutateRegisterTravelogue, isPending: isPostingTraveloguePending } =
    usePostTravelogue();

  const handleRegisterTravelogue = () => {
    mutateRegisterTravelogue(
      {
        title,
        thumbnail: thumbnail || (process.env.DEFAULT_THUMBNAIL_IMAGE ?? ""),
        tags: selectedTagIDs,
        days: travelogueDays,
      },
      {
        onSuccess: (data) => {
          handleCloseBottomSheet();
          navigate(ROUTE_PATHS_MAP.travelogue(data?.data?.id));
        },
      },
    );
  };

  const debouncedRegisterTravelogue = useLeadingDebounce(
    () => handleRegisterTravelogue(),
    DEBOUNCED_TIME,
  );

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

        <TextField title="제목" isRequired>
          {(id) => (
            <S.InputContainer>
              <Input
                id={id}
                value={title}
                maxLength={FORM_VALIDATIONS_MAP.title.maxLength}
                placeholder="여행기 제목을 입력해주세요"
                onChange={handleChangeTitle}
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
                onDeleteButton={() => setThumbnail("")}
                previewUrls={[thumbnail]}
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
              <IconButton
                size="16"
                iconType="plus"
                position="left"
                css={S.addButtonStyle}
                onClick={() => onAddDay()}
              >
                <Text textType="bodyBold">일자 추가하기</Text>
              </IconButton>
            }
          >
            <Accordion.Root>
              {travelogueDays.map((travelogueDay, dayIndex) => (
                <TravelogueDayAccordion
                  key={travelogueDay.id}
                  isPaused={isPaused}
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
          등록
        </Button>
      </S.Layout>

      <EditRegisterModalBottomSheet
        isOpen={isOpen}
        isPending={isPostingTraveloguePending}
        mainText="여행기를 등록할까요?"
        subText="등록한 후에도 다시 여행기를 수정할 수 있어요!"
        onClose={handleCloseBottomSheet}
        onConfirm={handleConfirmBottomSheet}
      />
    </>
  );
};

export default TravelogueRegisterPage;
