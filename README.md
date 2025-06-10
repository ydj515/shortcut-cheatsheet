# Shortcut Repository

온보딩 및 협업을 위해 생성하였습니다.

단축키 검색 및 관리 웹 애플리케이션입니다. 현재 Figma와 IntelliJ IDEA의 단축키를 지원합니다.

[링크](https://shortcut-cheatsheet.vercel.app/)를 클릭해서 확인해주세요
## feature

- 카테고리별 단축키 목록 보기
- 단축키 검색 (텍스트 또는 단축키 조합으로 검색)

## 기술 스택

- React 19
- TypeScript
- Tailwind CSS
- Vite

## prerequisite

- Node.js 20(최신 LTS 버전 권장)
- npm

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

## 사용 방법

1. 왼쪽 사이드바에서 원하는 카테고리(Figma 또는 IntelliJ)를 선택합니다.
2. 검색창에서 다음 방법으로 검색할 수 있습니다:
   - 텍스트로 검색 (예: "자동완성", "컴포넌트" 등)
   - 단축키 조합으로 검색 (예: ⌘ + N, Ctrl + Space 등)
3. 검색 결과는 실시간으로 업데이트됩니다.

## 단축키 데이터 구조

```typescript
interface Shortcut {
  category: 'figma' | 'intellij';
  action: string;
  mac: string;
  win: string;
  keywords: string[];
}
```
