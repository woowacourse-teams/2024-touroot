export interface CalendarDetail {
  year: number;
  month: number;
  days: Array<{ date: Date; isCurrentMonth: boolean }>;
}
