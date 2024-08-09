import { useRef } from "react";

import IconButton from "@components/common/IconButton/IconButton";
import Text from "@components/common/Text/Text";

import useCalendar from "@hooks/useCalendar";
import useClickAway from "@hooks/useClickAway";

import { PRIMITIVE_COLORS } from "@styles/tokens";

import * as S from "./Calendar.styled";

interface CalendarProps {
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

const Calendar = ({ onSelectDate, onClose }: CalendarProps) => {
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

  return (
    <S.Layout ref={calendarRef}>
      <S.HeaderContainer>
        <IconButton
          size="12"
          color={PRIMITIVE_COLORS.white}
          iconType="prev-arrow"
          onClick={prevMonth}
          disabled={today.getMonth() === calendarDetail.month}
        />
        <Text textType="detail" css={S.boldTextStyle}>
          {calendarDetail.year}년 {calendarDetail.month + 1}월
        </Text>
        <IconButton
          size="12"
          color={PRIMITIVE_COLORS.white}
          iconType="next-arrow"
          onClick={nextMonth}
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
          return (
            <S.DayCell
              key={date.toString()}
              $isCurrentMonth={isCurrentMonth}
              $isSelectable={isSelectable}
              onClick={() => isSelectable && onSelectDate(date)}
            >
              <Text textType="detail">{date.getDate()}</Text>
            </S.DayCell>
          );
        })}
      </S.DaysGridContainer>
    </S.Layout>
  );
};

export default Calendar;
