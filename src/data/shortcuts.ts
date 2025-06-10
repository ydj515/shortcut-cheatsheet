import type { Shortcut } from "../types/shortcut";

export const intellijShortcuts: Shortcut[] = [
  {
    category: "intellij",
    action: "문제 자동 수정",
    mac: "option + enter",
    win: "alt + enter",
    keywords: ["auto quick fix"]
  },
  {
    category: "intellij",
    action: "자동정렬",
    mac: "⌘ + option + l",
    win: "ctrl + alt + l",
    keywords: ["format"]
  },
  {
    category: "intellij",
    action: "자동완성",
    mac: "ctrl + space",
    win: "ctrl + space",
    keywords: ["autocomplete"]
  },
  {
    category: "intellij",
    action: "getter, setter, Constructor",
    mac: "⌘ + n",
    win: "alt + insert",
    keywords: ["generate"]
  },
  {
    category: "intellij",
    action: "전체 찾기",
    mac: "⌘ + ⇧ + F",
    win: "ctrl + ⇧ + f",
    keywords: ["search all"]
  },
  {
    category: "intellij",
    action: "파일 찾기",
    mac: "⌘ + ⇧ + o",
    win: "ctrl + ⇧ + n",
    keywords: ["file search"]
  },
  {
    category: "intellij",
    action: "파일 및 여러가지 찾기",
    mac: "⇧ + ⇧",
    win: "⇧ + ⇧",
    keywords: ["search"]
  },
  {
    category: "intellij",
    action: "이전 커서",
    mac: "⌘ + [",
    win: "ctrl + alt + ←",
    keywords: ["cursor back"]
  },
  {
    category: "intellij",
    action: "다음 커서",
    mac: "⌘ + ]",
    win: "ctrl + alt + →",
    keywords: ["cursor forward"]
  },
  {
    category: "intellij",
    action: "탭 이동(왼쪽)",
    mac: "⌘ + ⇧ + [",
    win: "alt + ←",
    keywords: ["tab move left"]
  },
  {
    category: "intellij",
    action: "탭 이동(오른쪽)",
    mac: "⌘ + ⇧ + ]",
    win: "alt + →",
    keywords: ["tab move right"]
  },
  {
    category: "intellij",
    action: "라인검색",
    mac: "⌘ + l",
    win: "ctrl + g",
    keywords: ["go to line"]
  },
  {
    category: "intellij",
    action: "창 닫기",
    mac: "⌘ + w",
    win: "ctrl + f4",
    keywords: ["close window"]
  },
  {
    category: "intellij",
    action: "한줄 삭제",
    mac: "⌘ + backspace",
    win: "ctrl + y",
    keywords: ["delete line"]
  },
  {
    category: "intellij",
    action: "한줄 복사",
    mac: "⌘ + d",
    win: "ctrl + d",
    keywords: ["duplicate line", "copy"]
  },
  {
    category: "intellij",
    action: "실행",
    mac: "ctrl + r",
    win: "⇧ + f10",
    keywords: ["run"]
  },
  {
    category: "intellij",
    action: "상위 implement 찾기",
    mac: "⌘ + u",
    win: "ctrl + ⇧ + b",
    keywords: ["find super"]
  },
  {
    category: "intellij",
    action: "implement 구현된 곳 찾기",
    mac: "⌘ + option + b",
    win: "ctrl + b",
    keywords: ["go to implementation", "interface"]
  },
  {
    category: "intellij",
    action: "사용한는 곳 찾기",
    mac: "option + fn + f7",
    win: "",
    keywords: ["find usage"]
  },
  {
    category: "intellij",
    action: "최근 닫았던 창 목록",
    mac: "⌘ + e",
    win: "ctrl + e",
    keywords: ["recent files"]
  },
  {
    category: "intellij",
    action: "환경설정",
    mac: "⌘ + ,",
    win: "ctrl + alt + s",
    keywords: ["settings"]
  },
  {
    category: "intellij",
    action: "왼쪽 프로젝트 창 보이기",
    mac: "⌘ + 1",
    win: "alt + 1",
    keywords: ["project view"]
  },
  {
    category: "intellij",
    action: "터미널 열기",
    mac: "option + fn + f12",
    win: "alt + f12",
    keywords: ["terminal"]
  }
];

export const figmaShortcuts: Shortcut[] = [
  {
    category: "figma",
    action: "프레임 만들기",
    mac: "A",
    win: "A",
    keywords: ["frame", "create frame"]
  },
  {
    category: "figma",
    action: "사각형",
    mac: "R",
    win: "R",
    keywords: ["rectangle", "shape"]
  },
  {
    category: "figma",
    action: "원",
    mac: "O",
    win: "O",
    keywords: ["circle", "ellipse", "shape"]
  },
  {
    category: "figma",
    action: "선",
    mac: "L",
    win: "L",
    keywords: ["line", "draw line"]
  },
  {
    category: "figma",
    action: "텍스트",
    mac: "T",
    win: "T",
    keywords: ["text", "type", "font"]
  },
  {
    category: "figma",
    action: "펜툴",
    mac: "P",
    win: "P",
    keywords: ["pen tool", "draw path"]
  },
  {
    category: "figma",
    action: "이미지 삽입",
    mac: "⇧ + ⌘ + K",
    win: "⇧ + Ctrl + K",
    keywords: ["image", "insert image", "add image"]
  },
  {
    category: "figma",
    action: "컴포넌트 만들기",
    mac: "⌘ + option + K",
    win: "Ctrl + Alt + K",
    keywords: ["component", "create component"]
  },
  {
    category: "figma",
    action: "컴포넌트 분리",
    mac: "⌘ + option + B",
    win: "Ctrl + Alt + B",
    keywords: ["component", "detach", "ungroup component"]
  },
  {
    category: "figma",
    action: "컴포넌트 인스턴스 찾기",
    mac: "⌘ + I",
    win: "Ctrl + I",
    keywords: ["component", "find instance"]
  },
  {
    category: "figma",
    action: "라이브러리 열기",
    mac: "⌘ + option + O",
    win: "Ctrl + Alt + O",
    keywords: ["library", "open library", "component library"]
  },
  {
    category: "figma",
    action: "오토레이아웃 추가",
    mac: "⇧ + A",
    win: "⇧ + A",
    keywords: ["auto layout", "add auto layout"]
  },
  {
    category: "figma",
    action: "간격 조절",
    mac: "option + ↑/↓",
    win: "Alt + ↑/↓",
    keywords: ["spacing", "adjust spacing", "gap"]
  },
  {
    category: "figma",
    action: "패딩 조절",
    mac: "⌘ + option + ↑/↓",
    win: "Ctrl + Alt + ↑/↓",
    keywords: ["padding", "adjust padding"]
  },
  {
    category: "figma",
    action: "좌측 정렬",
    mac: "option + A",
    win: "Alt + A",
    keywords: ["align", "left align"]
  },
  {
    category: "figma",
    action: "가운데 정렬",
    mac: "option + H",
    win: "Alt + H",
    keywords: ["align", "center align", "horizontal align"]
  },
  {
    category: "figma",
    action: "상하 정렬",
    mac: "option + W",
    win: "Alt + W",
    keywords: ["align", "vertical align", "top bottom align"]
  },
  {
    category: "figma",
    action: "그룹 만들기",
    mac: "⌘ + G",
    win: "Ctrl + G",
    keywords: ["group", "create group"]
  },
  {
    category: "figma",
    action: "그룹 해제",
    mac: "⌘ + ⇧ + G",
    win: "Ctrl + ⇧ + G",
    keywords: ["ungroup", "release group"]
  },
  {
    category: "figma",
    action: "뒤 객체 선택",
    mac: "⌘ + 클릭",
    win: "Ctrl + 클릭",
    keywords: ["select behind", "select under", "layer select"]
  },
  {
    category: "figma",
    action: "다중 선택",
    mac: "⇧ + 클릭",
    win: "⇧ + 클릭",
    keywords: ["multi select", "multiple select", "select many"]
  },
  {
    category: "figma",
    action: "한 픽셀 이동",
    mac: "방향키",
    win: "방향키",
    keywords: ["move", "nudge", "1px"]
  },
  {
    category: "figma",
    action: "10px 이동",
    mac: "⇧ + 방향키",
    win: "⇧ + 방향키",
    keywords: ["move", "nudge", "10px"]
  },
  {
    category: "figma",
    action: "전체 보기",
    mac: "⇧ + 1",
    win: "⇧ + 1",
    keywords: ["zoom out", "fit view", "show all"]
  },
  {
    category: "figma",
    action: "선택 확대",
    mac: "⇧ + 2",
    win: "⇧ + 2",
    keywords: ["zoom to selection", "zoom in", "focus on object"]
  },
  {
    category: "figma",
    action: "실제 픽셀 보기",
    mac: "⌘ + 1",
    win: "Ctrl + 1",
    keywords: ["actual pixels", "zoom 100%", "pixel preview"]
  },
  {
    category: "figma",
    action: "가이드 보기",
    mac: "⌘ + G",
    win: "Ctrl + G",
    keywords: ["guides", "show guides", "grid"]
  },
  {
    category: "figma",
    action: "내보내기",
    mac: "⇧ + ⌘ + E",
    win: "⇧ + Ctrl + E",
    keywords: ["export", "save"]
  },
  {
    category: "figma",
    action: "링크 복사",
    mac: "⌘ + L",
    win: "Ctrl + L",
    keywords: ["copy link", "share link", "url"]
  },
  {
    category: "figma",
    action: "PDF로 내보내기",
    mac: "파일 메뉴 > Export 선택",
    win: "파일 메뉴 > Export 선택",
    keywords: ["export pdf", "save as pdf"]
  },
  {
    category: "figma",
    action: "단축키 보기",
    mac: "?",
    win: "?",
    keywords: ["shortcuts", "help", "hotkeys"]
  },
  {
    category: "figma",
    action: "설정 열기",
    mac: "⌘ + ,",
    win: "Ctrl + ,",
    keywords: ["settings", "preferences", "options"]
  }
];

export const vscodeShortcuts: Shortcut[] = [
  {
    category: "vscode",
    action: "문제 자동 수정",
    mac: "⌘ + .",
    win: "ctrl + .",
    keywords: ["quick fix", "auto fix", "문제 해결"]
  },
  {
    category: "vscode",
    action: "자동 정렬",
    mac: "⇧ + option + F",
    win: "⇧ + alt + F",
    keywords: ["format", "코드 정렬", "pretty", "code"]
  },
  {
    category: "vscode",
    action: "파일 탐색기 열기/닫기",
    mac: "⌘ + B",
    win: "ctrl + B",
    keywords: ["sidebar", "explorer", "파일 트리", "file"]
  },
  {
    category: "vscode",
    action: "전체 선택",
    mac: "⌘ + A",
    win: "ctrl + A",
    keywords: ["select all"]
  },
  {
    category: "vscode",
    action: "찾기",
    mac: "⌘ + F",
    win: "ctrl + F",
    keywords: ["search", "find"]
  },
  {
    category: "vscode",
    action: "찾아서 바꾸기",
    mac: "⌘ + option + F",
    win: "ctrl + H",
    keywords: ["replace"]
  },
  {
    category: "vscode",
    action: "전체 프로젝트에서 찾기",
    mac: "⌘ + ⇧ + F",
    win: "ctrl + ⇧ + F",
    keywords: ["global search"]
  },
  {
    category: "vscode",
    action: "명령어 팔레트 열기",
    mac: "⌘ + ⇧ + P",
    win: "ctrl + ⇧ + P",
    keywords: ["command palette", "명령어"]
  },
  {
    category: "vscode",
    action: "터미널 열기",
    mac: "ctrl + `",
    win: "ctrl + `",
    keywords: ["terminal", "터미널"]
  },
  {
    category: "vscode",
    action: "파일 열기",
    mac: "⌘ + P",
    win: "ctrl + P",
    keywords: ["go to file", "파일 검색"]
  },
  {
    category: "vscode",
    action: "줄 복사",
    mac: "⇧ + option + ↓ / ↑",
    win: "⇧ + alt + ↓ / ↑",
    keywords: ["duplicate line"]
  },
  {
    category: "vscode",
    action: "줄 이동",
    mac: "option + ↓ / ↑",
    win: "alt + ↓ / ↑",
    keywords: ["move line"]
  },
  {
    category: "vscode",
    action: "주석 토글",
    mac: "⌘ + /",
    win: "ctrl + /",
    keywords: ["toggle comment", "주석"]
  },
  {
    category: "vscode",
    action: "멀티 커서(같은 단어 선택)",
    mac: "⌘ + D",
    win: "ctrl + D",
    keywords: ["multi cursor", "select next"]
  },
  {
    category: "vscode",
    action: "파일 저장",
    mac: "⌘ + S",
    win: "ctrl + S",
    keywords: ["save"]
  },
  {
    category: "vscode",
    action: "전체 저장",
    mac: "⌘ + option + S",
    win: "ctrl + K, S",
    keywords: ["save all"]
  },
  {
    category: "vscode",
    action: "새 터미널 열기",
    mac: "ctrl + ⇧ + `",
    win: "ctrl + ⇧ + `",
    keywords: ["new terminal"]
  },
  {
    category: "vscode",
    action: "미니맵 켜기/끄기",
    mac: "⌘ + ⇧ + P → 'toggle minimap'",
    win: "ctrl + ⇧ + P → 'toggle minimap'",
    keywords: ["minimap"]
  },
  {
    category: "vscode",
    action: "이전 커서 위치로 이동",
    mac: "ctrl + -",
    win: "alt + ←",
    keywords: ["go back", "cursor history"]
  },
  {
    category: "vscode",
    action: "다음 커서 위치로 이동",
    mac: "ctrl + ⇧ + -",
    win: "alt + →",
    keywords: ["go forward", "cursor history"]
  }
];

export const allShortcuts: Shortcut[] = [
  ...intellijShortcuts,
  ...vscodeShortcuts,
  ...figmaShortcuts
];
