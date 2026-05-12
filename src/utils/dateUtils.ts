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
/** getDay() 인덱스(일=0)에서 위 'M~S' 배열로 변환 */
const SUNDAY_FIRST_TO_MONDAY_FIRST = [6, 0, 1, 2, 3, 4, 5] as const;

/** ISO 날짜의 영문 요일 약자 반환 */
export function weekdayInitialEN(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, (m ?? 1) - 1, d);
  return WEEKDAY_INITIALS_EN[SUNDAY_FIRST_TO_MONDAY_FIRST[date.getDay()]];
}

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

/**
 * startIso(포함)부터 endIso(포함)까지 하루 단위 ISO 문자열 배열을 과거→최근 순으로 반환.
 * 잘못된 범위(start > end)면 빈 배열.
 */
export function datesBetween(startIso: string, endIso: string): string[] {
  const [sy, sm, sd] = startIso.split('-').map(Number);
  const [ey, em, ed] = endIso.split('-').map(Number);
  const start = new Date(sy, (sm ?? 1) - 1, sd);
  const end = new Date(ey, (em ?? 1) - 1, ed);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  if (start.getTime() > end.getTime()) return [];
  const out: string[] = [];
  const cursor = new Date(start);
  while (cursor.getTime() <= end.getTime()) {
    out.push(toDateString(cursor.getTime()));
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

/** 'YYYY-MM' (selectedDate.year, selectedDate.month) 형식의 한국어 라벨 — '2026년 5월' 형태 */
export function formatMonthLabelKO(iso: string): string {
  const [y, m] = iso.split('-').map(Number);
  return `${y}년 ${m}월`;
}

function isoToLocalDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d);
}

/** iso를 포함하는 주(월요일 시작)의 7일을 월~일 순으로 반환 */
export function weekContaining(iso: string): string[] {
  const target = isoToLocalDate(iso);
  target.setHours(0, 0, 0, 0);
  const dayOfWeek = target.getDay();
  const offsetToMonday = (dayOfWeek + 6) % 7;
  const monday = new Date(target);
  monday.setDate(target.getDate() - offsetToMonday);
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(toDateString(d.getTime()));
  }
  return dates;
}

/** iso가 속한 달의 모든 날짜를 1일~말일 순으로 반환 */
export function datesInMonth(iso: string): string[] {
  const [y, m] = iso.split('-').map(Number);
  const monthIndex = (m ?? 1) - 1;
  const last = new Date(y, monthIndex + 1, 0).getDate();
  const dates: string[] = [];
  for (let day = 1; day <= last; day++) {
    dates.push(toDateString(new Date(y, monthIndex, day).getTime()));
  }
  return dates;
}

/** iso의 1일이 월~일 격자에서 차지하는 컬럼 오프셋 (월=0, 일=6) */
export function firstWeekdayOffset(iso: string): number {
  const [y, m] = iso.split('-').map(Number);
  const first = new Date(y, (m ?? 1) - 1, 1);
  return (first.getDay() + 6) % 7;
}

/**
 * iso를 n개월 만큼 이동한 ISO 반환. 같은 일이 새 달에 없으면 새 달의 말일로 clamp.
 * 예: '2026-01-31'을 +1 → '2026-02-28' (또는 윤년 -29)
 */
export function addMonthsClamped(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const monthIndex = (m ?? 1) - 1 + n;
  const targetYear = y + Math.floor(monthIndex / 12);
  const targetMonth = ((monthIndex % 12) + 12) % 12;
  const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
  const clampedDay = Math.min(d, lastDay);
  return toDateString(new Date(targetYear, targetMonth, clampedDay).getTime());
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
