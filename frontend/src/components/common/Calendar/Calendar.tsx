import { useRef } from "react";

import IconButton from "@components/common/IconButton/IconButton";
import Text from "@components/common/Text/Text";

import useCalendar from "@hooks/useCalendar";
import useClickAway from "@hooks/useClickAway";

import { CYPRESS_DATA_MAP } from "@constants/cypress";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import * as S from "./Calendar.styled";

interface CalendarProps {
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

const Calendar = ({
  onSelectDate,
  onClose,
  ...props
}: CalendarProps & React.ComponentPropsWithoutRef<"div">) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarRef = useRef<HTMLDivElement>(null);

  useClickAway(calendarRef, onClose);
  const {
    calendarDetail,
    onMoveNextMonth: nextMonth,
    onMovePreviousMonth: prevMonth,
    weekdays,
  } = useCalendar();

  const isPreventPreviousMonthMoveButton = today.getMonth() === calendarDetail.month;

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    date: Date,
    isSelectable: boolean,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isSelectable) {
        onSelectDate(date);
      }
    }
  };

  return (
    <S.Layout ref={calendarRef} {...props}>
      <S.HeaderContainer>
        <IconButton
          size="12"
          color={PRIMITIVE_COLORS.white}
          iconType="prev-arrow"
          onClick={prevMonth}
          disabled={isPreventPreviousMonthMoveButton}
          aria-label={"이전 달 이동 버튼"}
          data-cy={CYPRESS_DATA_MAP.calendar.previousMonthMoveButton}
        />

        <Text
          aria-live="polite"
          textType="detail"
          css={S.boldTextStyle}
          data-cy={CYPRESS_DATA_MAP.calendar.headTitle}
        >
          {`${calendarDetail.year}년 ${calendarDetail.month + 1}월`}
          {isPreventPreviousMonthMoveButton && (
            <div aria-live="assertive" css={S.visualHiddenStyle}>
              이전 달로 이동하는 버튼을 누를 수 없습니다.
            </div>
          )}
        </Text>
        <IconButton
          size="12"
          color={PRIMITIVE_COLORS.white}
          iconType="next-arrow"
          onClick={nextMonth}
          aria-label="다음 달 이동 버튼"
          data-cy={CYPRESS_DATA_MAP.calendar.nextMonthMoveButton}
        />
      </S.HeaderContainer>
      <S.WeekdayHeaderContainer>
        {weekdays.map((day) => (
          <Text textType="detail" key={day}>
            {day}
          </Text>
        ))}
      </S.WeekdayHeaderContainer>
      <S.DaysGridContainer>
        {calendarDetail.days.map(({ date, isCurrentMonth }) => {
          const isSelectable = isCurrentMonth && date >= today;
          const formattedDate = date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <S.DayCell
              key={date.toString()}
              onClick={() => isSelectable && onSelectDate(date)}
              onKeyDown={(event) => handleKeyDown(event, date, isSelectable)}
              tabIndex={isSelectable ? 0 : -1}
              role="gridcell"
              aria-selected={isSelectable}
              aria-label={formattedDate}
              data-cy={CYPRESS_DATA_MAP.calendar.dayCell}
              $isCurrentMonth={isCurrentMonth}
              $isSelectable={isSelectable}
            >
              <Text tabIndex={-1} aria-hidden="true" textType="detail">
                {isCurrentMonth ? date.getDate() : ""}
              </Text>
            </S.DayCell>
          );
        })}
      </S.DaysGridContainer>
    </S.Layout>
  );
};

export default Calendar;
