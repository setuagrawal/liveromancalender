export const getWeekDates = (startDate: Date): Date[] => {
  const dates: Date[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  
  return dates;
};

export const formatWeekRange = (startDate: Date): string => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  
  const startMonth = startDate.toLocaleName('it-IT', { month: 'long' });
  const endMonth = endDate.toLocaleName('it-IT', { month: 'long' });
  const year = startDate.getFullYear();
  
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.getDate()}-${endDate.getDate()} ${startMonth} ${year}`;
  } else {
    return `${startDate.getDate()} ${startMonth} - ${endDate.getDate()} ${endMonth} ${year}`;
  }
};