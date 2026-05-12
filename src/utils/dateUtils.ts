const WEEKDAYS_KO = ['일', '월', '화', '수', '목', '금', '토'] as const;

/** Unix timestamp(ms)를 'YYYY-MM-DD' 로컬 ISO 날짜 문자열로 변환 */
export function toDateString(timestamp: number): string {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** 오늘 날짜(YYYY-MM-DD) */
export function todayString(): string {
  return toDateString(Date.now());
}

/** 오늘 포함 최근 N일을 과거→오늘 순서로 반환 */
export function recentDates(count: number): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dates: string[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(toDateString(d.getTime()));
  }
  return dates;
}

interface DateLabel {
  weekday: string;
  day: string;
  isToday: boolean;
}

/** 날짜 스트립 칩에 표시할 라벨 분해 */
export function formatDateLabel(iso: string): DateLabel {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, (m ?? 1) - 1, d);
  return {
    weekday: WEEKDAYS_KO[date.getDay()],
    day: String(date.getDate()),
    isToday: iso === todayString(),
  };
}

/** Unix timestamp를 'HH:mm' 형식으로 */
export function formatTime(timestamp: number): string {
  const d = new Date(timestamp);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

/** 주간 캘린더에 표시할 영문 요일 약자 (월요일 시작) */
export const WEEKDAY_INITIALS_EN = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

/** 이번 주(월요일 시작) 월~일 7일을 'YYYY-MM-DD' 배열로 반환 */
export function thisWeekDates(): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayOfWeek = today.getDay();
  const offsetToMonday = (dayOfWeek + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - offsetToMonday);

  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(toDateString(d.getTime()));
  }
  return dates;
}

/** Unix timestamp를 '오전 08:00am' / '오후 01:00pm' 형식으로 */
export function formatTimeAMPM(timestamp: number): string {
  const d = new Date(timestamp);
  const hours24 = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const isPM = hours24 >= 12;
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const period = isPM ? '오후' : '오전';
  const ampm = isPM ? 'pm' : 'am';
  return `${period} ${String(hours12).padStart(2, '0')}:${minutes}${ampm}`;
}
