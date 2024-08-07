import { useCallback, useState } from "react";

interface CalendarDetail {
  year: number;
  month: number;
  days: Array<{ date: Date; isCurrentMonth: boolean }>;
}

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const useCalendar = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  const getDaysInMonth = useCallback((year: number, month: number): Date[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, date) => new Date(year, month, date + 1));
  }, []);

  const getCalendarDetail = useCallback((): CalendarDetail => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = getDaysInMonth(year, month);

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayIndex = firstDayOfMonth.getDay();

    const prevMonthDays = Array.from({ length: startingDayIndex }, (_, i) => {
      const day = new Date(year, month, -i);
      return { date: day, isCurrentMonth: false };
    }).reverse();

    const currentMonthDays = days.map((day) => ({ date: day, isCurrentMonth: true }));

    const nextMonthDays = Array.from(
      { length: 7 * 6 - (prevMonthDays.length + currentMonthDays.length) },
      (_, i) => {
        const day = new Date(year, month + 1, i + 1);
        return { date: day, isCurrentMonth: false };
      },
    );

    return {
      year,
      month,
      days: [...prevMonthDays, ...currentMonthDays, ...nextMonthDays],
    };
  }, [currentDate, getDaysInMonth]);

  const onMoveNextMonth = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  const onMovePreviousMonth = useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  return {
    calendarDetail: getCalendarDetail(),
    onMoveNextMonth,
    onMovePreviousMonth,
    setCurrentDate,
    weekdays: WEEK_DAYS,
  };
};

export default useCalendar;
