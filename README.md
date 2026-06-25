# 모바일 청첩장 💍

순수 HTML/CSS/JS로 만든 모바일 청첩장입니다. 빌드 도구가 필요 없고, 파일을 열기만 하면 동작합니다.

## 구성
- `index.html` — 페이지 구조
- `style.css` — 디자인 (모바일 최적화)
- `script.js` — **여기 상단 `CONFIG` 객체만 수정**하면 내용이 바뀝니다
- `images/` — 사진 폴더 (`main.jpg`, `g1.jpg` ~ `g6.jpg`)

## 내용 수정 방법
`script.js` 맨 위 `CONFIG` 에서:
- 신랑/신부 이름·연락처·부모님
- 예식 일시 / 장소 / 지도
- 인사말, 갤러리 사진, 계좌번호

## 사진 넣기
`images/` 폴더에 아래 파일명으로 넣어주세요.
- 메인: `main.jpg` (세로 3:4 권장)
- 갤러리: `g1.jpg` ~ `g6.jpg` (정사각형 권장)

## 미리보기 (로컬)
`index.html` 파일을 더블클릭해서 브라우저로 열면 됩니다.

## 배포 (GitHub Pages)
1. 이 폴더를 `https://github.com/hcjoo/my-wedding.git` 에 push
2. GitHub 저장소 → Settings → Pages → Branch: `main` / 루트(`/`) 선택
3. 잠시 후 `https://hcjoo.github.io/my-wedding/` 주소로 공개됩니다

## 포함 기능
- 스크롤 등장 애니메이션
- D-day 카운트다운 + 달력
- 지도 + 네이버/카카오/구글 길찾기 버튼
- 갤러리 라이트박스(확대보기)
- 계좌번호 복사
- 방명록(현재 기기 저장 / 백엔드 연동 시 공유 가능)
- 카카오톡 공유 미리보기(Open Graph) 메타태그
