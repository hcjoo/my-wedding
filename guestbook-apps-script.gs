/**
 * 축하 메시지(방명록) 저장용 Google Apps Script
 *
 * [시트 구성]  1행에 머리글을 넣어주세요.
 *   A1=시각   B1=이름   C1=메시지
 *
 * [설치 방법]
 * 1. 구글 시트를 새로 만든다 (sheets.new)
 * 2. 위 머리글을 넣는다
 * 3. 확장 프로그램 > Apps Script 를 열고, 이 파일 내용을 그대로 붙여넣는다
 * 4. 오른쪽 위 [배포] > [새 배포] > 유형 '웹 앱'
 *      - 실행: 나
 *      - 액세스 권한: 모든 사용자
 * 5. 배포 후 나오는 웹 앱 URL 을 script.js 의 CONFIG.guestbookApi 에 넣는다
 *
 * ※ 메시지를 지우려면 시트에서 해당 줄을 지우면 됩니다.
 */

const SHEET_NAME = '시트1';   // 시트 이름이 다르면 수정

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues().slice(1);   // 머리글 제외
  const list = rows
    .filter(function (r) { return r[1] && r[2]; })
    .map(function (r) {
      return { date: formatDate_(r[0]), name: String(r[1]), msg: String(r[2]) };
    })
    .reverse();                                             // 최신순
  return json_({ ok: true, list: list });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = String(data.name || '').trim().slice(0, 20);
    const msg = String(data.msg || '').trim().slice(0, 200);
    if (!name || !msg) return json_({ ok: false, error: 'empty' });

    SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME)
      .appendRow([new Date(), name, msg]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function formatDate_(v) {
  const d = v instanceof Date ? v : new Date(v);
  if (isNaN(d)) return '';
  const p = function (n) { return String(n).padStart(2, '0'); };
  return d.getFullYear() + '.' + p(d.getMonth() + 1) + '.' + p(d.getDate());
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
