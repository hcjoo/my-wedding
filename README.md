# 모바일 청첩장

순수 HTML/CSS/JS로 만든 모바일 청첩장입니다. 빌드 도구가 필요 없고, 파일을 열기만 하면 동작합니다.

## 구성
- `index.html` — 페이지 구조
- `style.css` — 디자인 (흰 바탕 + 검정 블록, 사진 풀블리드)
- `script.js` — **맨 위 `CONFIG` 객체만 수정**하면 내용이 바뀝니다
- `images/hero.jpg` — 첫 화면 사진
- `images/gallery/` — 사진첩 (`g01.jpg` ~)
- `guestbook-apps-script.gs` — 축하 메시지를 구글 시트에 저장하는 스크립트

## 내용 수정 방법
`script.js` 맨 위 `CONFIG` 에서:
- 신랑/신부·부모님 이름
- 예식 일시 / 장소 / 주소 / 전화번호 / 교통편
- 인사말, 사진 목록, 계좌번호
- `guestbookApi` — 축하 메시지를 받을 구글 시트 주소 (비우면 각자 기기에만 저장)

## 축하 메시지 (구글 시트)
`guestbook-apps-script.gs` 파일 맨 위 주석에 설치 방법이 적혀 있습니다.
요약하면 구글 시트를 만들고 Apps Script에 붙여넣은 뒤 웹 앱으로 배포하면 됩니다.
배포 시 **액세스 권한은 '모든 사용자'** 여야 하객이 글을 남길 수 있습니다.
메시지를 지우려면 시트에서 해당 줄을 지우면 됩니다.

## 구성 순서
1. 메인 (사진 + 날짜)
2. 인사말
3. 01 신랑과 신부 (사진첩)
4. 02 예식 안내 (달력 · 카운트다운)
5. 03 오시는 길 (지도 · 길찾기 · 교통편)
6. 04 마음 전하실 곳 (계좌 복사)
7. 05 축하 메시지

## 미리보기 (로컬)
```
python -m http.server 8080
```
브라우저에서 `http://localhost:8080` 으로 열면 됩니다.

## 배포 (GitHub Pages)
1. 이 폴더를 `https://github.com/hcjoo/my-wedding.git` 에 push
2. GitHub 저장소 → Settings → Pages → Branch: `main` / 루트(`/`) 선택
3. 잠시 후 `https://hcjoo.github.io/my-wedding/` 주소로 공개됩니다
