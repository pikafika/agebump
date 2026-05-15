import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { db } from '../lib/firebase';

type EventName =
  | 'session_start'
  | 'screen_view'
  | 'food_analyzed'
  | 'guide_generated'
  | 'record_saved'
  | 'record_deleted'
  | 'account_link_started'
  | 'account_link_completed'
  | 'api_error'
  | 'onboarding_completed';

type EventProperties = Record<string, string | number | boolean | null>;

const platform = Platform.OS;
const appVersion = (Constants.expoConfig?.version ?? 'unknown') as string;

async function track(
  userId: string | null,
  eventName: EventName,
  properties: EventProperties = {}
): Promise<void> {
  try {
    await addDoc(collection(db, 'analytics_events'), {
      userId,
      eventName,
      properties,
      platform,
      appVersion,
      createdAt: serverTimestamp(),
    });
  } catch {
    // 분석 실패는 앱 동작에 영향을 주지 않음
  }
}

export const analyticsService = {
  trackSessionStart: (userId: string | null) =>
    track(userId, 'session_start', { platform, appVersion }),

  trackScreenView: (userId: string | null, screenName: string) =>
    track(userId, 'screen_view', { screen_name: screenName }),

  trackFoodAnalyzed: (
    userId: string | null,
    opts: { method: 'image' | 'text'; success: boolean; duration_ms: number; retry_count?: number }
  ) => track(userId, 'food_analyzed', { ...opts, retry_count: opts.retry_count ?? 0 }),

  trackGuideGenerated: (
    userId: string | null,
    opts: { success: boolean; duration_ms: number }
  ) => track(userId, 'guide_generated', opts),

  trackRecordSaved: (
    userId: string | null,
    opts: { meal_type: string; food_count: number; has_image: boolean }
  ) => track(userId, 'record_saved', opts),

  trackRecordDeleted: (userId: string | null) =>
    track(userId, 'record_deleted'),

  trackAccountLinkStarted: (userId: string | null) =>
    track(userId, 'account_link_started', { method: 'google' }),

  trackAccountLinkCompleted: (userId: string | null) =>
    track(userId, 'account_link_completed', { method: 'google' }),

  trackApiError: (
    userId: string | null,
    opts: { service: 'gemini' | 'firebase'; error_code: string }
  ) => track(userId, 'api_error', opts),

  trackOnboardingCompleted: (
    userId: string | null,
    opts: { set_nickname: boolean; set_calorie_goal: boolean }
  ) => track(userId, 'onboarding_completed', opts),
};
