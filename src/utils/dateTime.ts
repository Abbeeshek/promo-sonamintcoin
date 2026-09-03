export const getBrowserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
  } catch (e) {
    return 'Asia/Kolkata';
  }
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatTime = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export const formatDateTime = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
};

export const isValidFutureDate = (dateStr: string, timeStr: string): boolean => {
  if (!dateStr || !timeStr) return false;
  const combined = new Date(`${dateStr}T${timeStr}`);
  if (isNaN(combined.getTime())) return false;
  return combined.getTime() > Date.now();
};

export interface CalendarDay {
  date: Date;
  dateString: string;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export const getDaysInMonthGrid = (year: number, month: number): CalendarDay[] => {
  const grid: CalendarDay[] = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun
  const totalDays = lastDayOfMonth.getDate();

  const todayStr = new Date().toISOString().split('T')[0];

  // Previous month padding days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthLastDay - i);
    const dateString = d.toISOString().split('T')[0];
    grid.push({
      date: d,
      dateString,
      isCurrentMonth: false,
      isToday: dateString === todayStr,
    });
  }

  // Current month days
  for (let day = 1; day <= totalDays; day++) {
    const d = new Date(year, month, day);
    const dateString = d.toISOString().split('T')[0];
    grid.push({
      date: d,
      dateString,
      isCurrentMonth: true,
      isToday: dateString === todayStr,
    });
  }

  // Next month padding days to complete 35 or 42 grid cells
  const remaining = (7 - (grid.length % 7)) % 7;
  for (let day = 1; day <= remaining; day++) {
    const d = new Date(year, month + 1, day);
    const dateString = d.toISOString().split('T')[0];
    grid.push({
      date: d,
      dateString,
      isCurrentMonth: false,
      isToday: dateString === todayStr,
    });
  }

  return grid;
};
