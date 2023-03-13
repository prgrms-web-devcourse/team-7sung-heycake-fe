import { differenceInHours, differenceInMinutes, parseISO } from 'date-fns';

function formatCommentDate(dateString: string) {
  const date = parseISO(dateString);
  const now = new Date();

  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);

  if (minutesDiff < 1) {
    return '방금 전';
  }
  if (hoursDiff < 1) {
    return `${minutesDiff}분 전`;
  }
  return dateString.substring(0, 10);
}

export default formatCommentDate;
