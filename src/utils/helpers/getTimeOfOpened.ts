type StatusType = 'closed' | 'opened';

const getIssueStatus = (dateString: string, statusType: StatusType): string => {
  const date = new Date(dateString);
  const now = new Date();

  const result = statusType === 'closed'
    ? 'closed'
    : 'opened';

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return `${result}just now`;
  }

  if (diffMinutes < 60) {
    return `${result} ${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  if (diffHours < 24) {
    return `${result} ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  }

  if (diffDays < 30) {
    return `${result} ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }

  if (diffMonths < 12) {
    return `${result} ${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  }

  return `${result} ${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
};

export default getIssueStatus;
