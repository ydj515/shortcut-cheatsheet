# 기여 가이드

Shortcut Cheatsheet에 기여해 주셔서 감사합니다. 변경 사항을 제출하기 전에 아래 개발 환경 설정과 검증 절차를 확인해 주세요. 상세한 저장소 규칙과 `mise` 환경 프로필 정책은 [기여 및 개발 가이드](./docs/contributor-guide.md)에 정리되어 있습니다.

## 1. 개발 환경 준비

Node.js 버전(`24.19.0`)과 공통 작업은 [`mise.toml`](./mise.toml)에 정의되어 있습니다.

```bash
mise trust ./mise.toml
mise run bootstrap
mise run config:check
```

- `dev`/`prod` 환경 오버레이(`-E dev`, `-E prod`)와 개인 로컬 설정(`mise.dev.local.toml`) 정책은 [기여 및 개발 가이드의 mise 환경 구성](./docs/contributor-guide.md#mise-환경-구성-및-프로필-정책)을 참고하세요.
- `mise.local.toml`은 모든 환경에서 로드되므로 개인 개발용 오버라이드는 반드시 `mise.dev.local.toml`에 작성합니다.

## 2. 코드 및 데이터 작성 규칙

- **코딩 스타일:** TypeScript ES 모듈, 2칸 들여쓰기, 큰따옴표(`"`), 세미콜론(`;`)을 사용합니다. 컴포넌트는 PascalCase, 유틸리티와 데이터 배열은 camelCase로 작성합니다.
- **단축키 데이터:** [`src/data/shortcuts.ts`](./src/data/shortcuts.ts)의 항목은 [`src/types/shortcut.ts`](./src/types/shortcut.ts)의 `Shortcut` 인터페이스(`category`, `action`, `mac`, `win`, `keywords`)를 준수해야 합니다.
- **커밋 메시지:** `feat:`, `fix:`, `chore:`, `docs:`, `build:` 등 Conventional Commits 형식을 따릅니다.

## 3. 필수 검증

모든 변경 사항은 Pull Request를 제출하기 전에 아래 검증 명령을 통과해야 합니다.

```bash
mise run verify
```

키보드 조합 포맷팅, 검색·자동완성 동작, 카테고리 필터링 로직을 수정한 경우 `*.test.ts` / `*.test.tsx` 회귀 테스트를 함께 추가하거나 업데이트해 주세요.

## 4. 참고 문서

- [기여 및 개발 가이드 (mise 환경 구성 정책)](./docs/contributor-guide.md)
- [에이전트 및 저장소 가이드](./AGENTS.md)
