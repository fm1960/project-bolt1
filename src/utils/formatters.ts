// Format date to a readable format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Format duration from now
export const formatTimeFromNow = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }
  
  return formatDate(dateString);
};

// Format time to days, hours, or minutes depending on duration
export const formatDuration = (durationInHours: number): string => {
  if (durationInHours < 1) {
    return `${Math.round(durationInHours * 60)} minutes`;
  } else if (durationInHours < 24) {
    return `${Math.round(durationInHours)} hour${durationInHours === 1 ? '' : 's'}`;
  } else {
    const days = Math.floor(durationInHours / 24);
    const hours = Math.round(durationInHours % 24);
    return hours > 0 
      ? `${days} day${days === 1 ? '' : 's'}, ${hours} hour${hours === 1 ? '' : 's'}`
      : `${days} day${days === 1 ? '' : 's'}`;
  }
};