const addDaysToDateString = ({
  dateString,
  daysToAdd,
}: {
  dateString: string;
  daysToAdd: number;
}) => {
  const date = new Date(dateString);

  date.setDate(date.getDate() + daysToAdd);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default addDaysToDateString;
