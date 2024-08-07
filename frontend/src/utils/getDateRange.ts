import addDaysToDateString from "./addDaysToDateString";

const getDateRange = ({
  daysLength = 0,
  startDate = "2024-00-00",
}: {
  daysLength?: number;
  startDate?: string;
}) => {
  return daysLength > 1
    ? `${startDate} - ${addDaysToDateString({
        dateString: startDate,
        daysToAdd: daysLength,
      })}`
    : `${startDate}`;
};

export default getDateRange;
