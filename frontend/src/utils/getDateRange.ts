import addDaysToDateString from "./addDaysToDateString";

const getDateRange = ({
  daysLength = 0,
  startDate = "",
}: {
  daysLength?: number;
  startDate?: string;
}) => {
  if (!startDate) {
    return "";
  }

  if (daysLength <= 1) {
    return startDate;
  }

  const endDate = addDaysToDateString({
    dateString: startDate,
    daysToAdd: daysLength - 1,
  });

  return `${startDate} - ${endDate}`;
};

export default getDateRange;
