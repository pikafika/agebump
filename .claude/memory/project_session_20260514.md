---
name: project-session-20260514
description: 2026-05-14 — Vercel GEMINI_API_KEY 오류 진단·수정(구 API 키 교체), API 프록시 정상 동작 확인
metadata:
  type: project
---

## 한 줄 요약

라이브에서 AI 분석이 HTTP 500으로 계속 실패하던 원인이 Vercel에 설정된 `GEMINI_API_KEY`가 구버전 키였음을 확인하고, 새 키로 교체·재배포해 프록시 정상화.

## 주요 작업

### 1. Vercel GEMINI_API_KEY 수정 및 재배포

- 이전 세션(2026-05-13)에서 카메라 검정 화면 + 갤러리 이미지 분석 버그를 수정·배포했으나, 라이브에서 계속 `HTTP 500 · Server: Gemini API key not configured` 오류 발생
- 원인: Vercel Dashboard → Settings → Environment Variables에 설정된 `GEMINI_API_KEY` 값이 구버전(만료된) API 키였음
- 조치: 사용자가 현재 유효한 키로 교체 후 Vercel Redeploy 진행
- 검증: `curl -X POST https://agebump.vercel.app/api/gemini-proxy` 테스트 → `candidates` 포함 정상 응답 확인

### 2. "음식 인식 불가" 응답 확인

- 테스트 중 `{"error": "음식을 인식할 수 없습니다."}` 응답 발생
- usageMetadata에 `"modality": "IMAGE", "tokenCount": 258` 확인 → 이미지 전송 자체는 정상
- 이 응답은 Gemini가 이미지에서 음식을 인식하지 못할 때 프롬프트에서 정의된 정상 동작
- 추가 진단 없이 세션 종료 (사용자가 테스트에 사용한 이미지 불명)

## 현재 상태

- `https://agebump.vercel.app` API 프록시 정상 동작 중
- 카메라 / 갤러리 버그 수정분(커밋 `9397f60`) 라이브 반영 완료
- 코드 변경 없음 (Vercel 환경변수 수정만 진행)

## 보류된 항목

[[project-session-20260513]] 보류 목록 동일 (코드 변경 없어 추가 없음)
