# 기여 및 개발 가이드

이 문서는 `shortcut-cheatsheet` 저장소의 로컬 개발 환경, `mise` 환경 프로필 정책, 단축키 데이터 추가 방법 및 검증 절차를 안내합니다.

## 요구 사항 및 초기 설정

Node.js 버전(`24.19.0`)과 공통 작업은 [`mise.toml`](../mise.toml)에 고정되어 있습니다.

```bash
mise trust ./mise.toml   # 최초 1회, task와 overlay를 검토한 뒤 신뢰
mise run bootstrap       # 고정된 버전의 도구 설치 후 의존성 준비
mise run config:check    # task 참조·순환 검사, 앱 실행 없음
mise run verify          # 프로젝트 검증 (lint, test, build)
mise -E dev run verify   # 개발 프로필 기준 검증
```

## mise 환경 구성 및 프로필 정책

`mise.toml`은 도구·공통 task, `mise.dev.toml`/`mise.prod.toml`은 공유 환경 선택을 담당합니다.

### 1. 환경 프로필 (`APP_ENV`)
- 기본 실행은 `APP_ENV=local`, `-E dev`는 개발 overlay, `-E prod`는 운영 설정 선택입니다. 환경 선택 자체가 배포나 서비스 시작을 수행하지 않습니다.
- `APP_ENV`는 공통 환경 식별자입니다. 애플리케이션의 기존 실행·배포 설정은 유지합니다.
- Vite 앱의 `build`는 기본/`prod`에서 `production`, `dev`에서 `development` mode를 사용합니다. Next.js는 자체 `dev`/`build` 모드를 유지합니다. `NODE_ENV`를 전역 `production`으로 설정하지 않아 개발 의존성 설치가 누락되지 않습니다.
- `dev`와 `preview` 태스크는 `guard:local`을 통해 `local` 또는 `dev` 환경에서만 실행되도록 보호됩니다.
- `-E local`은 사용하지 않습니다.

### 2. 개인 로컬 설정 및 `.env` 관리
- **개인 개발 설정 (`mise.dev.local.toml`)**: [`mise.dev.local.toml.example`](../mise.dev.local.toml.example)을 검토해 `mise.dev.local.toml`로 복사합니다. `.env.dev.local`을 만든 뒤 `env._.file`을 활성화하면 `dev`에서만 읽습니다. 기존 개인 파일을 덮어쓰지 않습니다.
- **전역 로컬 오버라이드 (`mise.local.toml`)**: `mise.local.toml`은 **모든 환경**에서 로드됩니다. `prod` checkout에 개인 override나 개발 dotenv를 두지 않습니다.

### 3. 버전 고정 및 Lockfile 정책
- `mise`는 개발 도구의 정확한 버전 고정과 프로필 분리에 사용합니다. `[settings] lockfile = false`로 도구 lock 생성을 끄고 `mise.lock`은 관리하지 않습니다. 공통 표준의 `mise.lock` 지침보다 이 저장소의 정책을 우선합니다. 설치 파일까지 고정해야 하는 요구가 생기면 다시 도입합니다.
- 도구 버전은 `mise.toml`의 `[tools]`에서 관리하며 `dev`/`prod`에서도 같은 버전을 사용합니다. 로컬과 CI는 `mise install` 또는 같은 정확한 버전의 setup action으로 도구를 준비합니다. `package-lock.json`, `pnpm-lock.yaml`, `uv.lock`, Gradle lock 등 애플리케이션 의존성 잠금과 검증 옵션은 유지합니다.
- 지원 OS는 각 도구와 실행 스크립트의 호환성에 따릅니다. `mise.lock`을 사용하지 않는다고 Windows 실행까지 보장되는 것은 아닙니다.
- `mise run bootstrap`은 프로젝트 초기 설정입니다. OS package·dotfile·서비스를 관리하는 `mise bootstrap`은 개인 머신 설정에서 별도로 채택합니다.

## 코드 컨벤션 및 단축키 데이터 구조

### 코딩 스타일
- TypeScript ES 모듈, 2칸 들여쓰기, 큰따옴표(`"`), 세미콜론(`;`)을 사용합니다.
- React 컴포넌트 파일명과 export는 PascalCase(예: `ShortcutSearch.tsx`), 훅·핸들러·유틸리티·데이터 배열은 camelCase를 사용합니다.
- 스타일링은 JSX 내 Tailwind CSS 유틸리티 클래스를 우선 사용하며, 공통 토큰 및 전역 스타일은 [`src/index.css`](../src/index.css)에서 관리합니다.

### 단축키 데이터 추가 및 수정
단축키 데이터는 [`src/types/shortcut.ts`](../src/types/shortcut.ts) 계약을 따르며 [`src/data/shortcuts.ts`](../src/data/shortcuts.ts)에 정의되어 있습니다.

```typescript
export type ShortcutCategory =
  | "intellij"
  | "figma"
  | "vscode"
  | "excel"
  | "powerpoint"
  | "한글"
  | "word";

export interface Shortcut {
  category: ShortcutCategory;
  action: string;
  mac: string;
  win: string;
  keywords: string[];
}
```

새로운 카테고리를 추가할 때는 [`src/types/shortcut.ts`](../src/types/shortcut.ts)의 `ShortcutCategory` 유니온 타입과 [`src/data/categories.ts`](../src/data/categories.ts)의 `categories` 배열을 함께 업데이트해야 합니다.

## 테스트 및 검증

Vitest와 Testing Library(`jsdom` 환경)를 사용해 단위 및 컴포넌트 테스트를 수행합니다. 테스트 파일은 대상 소스 파일 옆에 `*.test.ts` 또는 `*.test.tsx` 형식으로 배치합니다.

| 명령 | 설명 |
| --- | --- |
| `mise run lint` | ESLint 정적 분석 실행 |
| `mise run test` | Vitest 단일 실행 (`npm run test -- --run`) |
| `mise run build` | TypeScript 프로젝트 빌드(`tsc -b`) 및 Vite 프로덕션 번들링 |
| `mise run verify` | `lint` + `test` + `build` 전체 품질 게이트 실행 |

키보드 포맷팅(`src/utils/keyboardUtils.ts`), 검색 필터링(`src/components/ShortcutSearch.tsx`), 카테고리 전환 동작을 변경한 경우 관련 회귀 테스트를 반드시 추가하거나 갱신하세요.
