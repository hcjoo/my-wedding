/* =====================================================================
   ✏️  여기만 수정하면 됩니다 — 실제 결혼식 정보로 바꿔주세요.
   (현재는 예시값/플레이스홀더입니다.)
   ===================================================================== */
const CONFIG = {
  // --- 신랑/신부 ---  ※ 공개 사이트이므로 실명 대신 가명 사용
  groom: { name: "주아무개", phone: "010-0000-0000",
           father: "주아무개", mother: "○아무개", order: "장남" },   // 3남 중 장남
  bride: { name: "김아무개", phone: "010-0000-0000",
           father: "김아무개", mother: "○아무개", order: "장녀" },   // 2남매 중 장녀

  // --- 예식 일시 (24시간제) ---  ※ 예식 시간 미정 → 확인 후 hour/minute, dateText 수정
  wedding: {
    year: 2027, month: 1, day: 31,   // month: 1~12 (2027.1.31 = 일요일)
    hour: 12, minute: 0,
    dateText: "2027년 1월 31일 일요일",
  },

  // --- 예식 장소 ---
  venue: {
    name: "아벤티움",
    address: "주소 입력 예정",
    detail: "",
    // 지도: 아래 query 로 네이버/카카오/구글 길찾기 링크가 자동 생성됩니다.
    mapQuery: "아벤티움 웨딩홀",
    // 구글지도 임베드 (장소명 기반, API 키 불필요)
    embedQuery: "아벤티움 웨딩홀",
  },

  // --- 인사말 ---
  greeting:
    "서로 다른 길을 걸어온 두 사람이\n이제 같은 곳을 바라보며 함께 걷고자 합니다.\n\n저희 두 사람의 새로운 시작을\n귀한 걸음으로 축복해 주시면 감사하겠습니다.",

  // --- 갤러리 이미지 (images/ 폴더에 넣고 파일명 맞춰주세요) ---
  gallery: [
    "images/g1.jpg", "images/g2.jpg", "images/g3.jpg",
    "images/g4.jpg", "images/g5.jpg", "images/g6.jpg",
  ],
  heroImage: "images/main.jpg",

  // --- 마음 전하실 곳 (계좌) ---
  accounts: {
    groomSide: [
      { label: "신랑", bank: "국민은행", number: "123456-78-901234", holder: "김민준" },
      { label: "신랑 아버지", bank: "신한은행", number: "110-222-333444", holder: "김아무" },
    ],
    brideSide: [
      { label: "신부", bank: "카카오뱅크", number: "3333-01-2345678", holder: "이서연" },
      { label: "신부 어머니", bank: "우리은행", number: "1002-333-444555", holder: "최아무" },
    ],
  },
};

/* =====================================================================
   아래는 동작 로직 — 보통 수정할 필요 없습니다.
   ===================================================================== */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderGreeting();
  renderCalendar();
  renderCountdown();
  renderLocation();
  renderGallery();
  renderAccounts();
  initGuestbook();
  initReveal();
  initLightbox();
});

/* ---------- 메인 ---------- */
function renderHero() {
  $("#hero-img").src = CONFIG.heroImage;
  $("#hero-groom").textContent = CONFIG.groom.name;
  $("#hero-bride").textContent = CONFIG.bride.name;
  $("#hero-date").textContent = CONFIG.wedding.dateText;
  $("#hero-place").textContent = `${CONFIG.venue.name} · ${CONFIG.venue.detail}`;
  $("#footer-names").textContent = `${CONFIG.groom.name} · ${CONFIG.bride.name}`;
}

/* ---------- 인사말 ---------- */
function renderGreeting() {
  $("#greeting-body").textContent = CONFIG.greeting;
  const g = CONFIG.groom, b = CONFIG.bride;
  $("#greeting-parents").innerHTML = `
    <div class="row"><span class="rel">${g.father} · ${g.mother}</span>
      의 <span class="child">${g.order}</span> ${g.name}</div>
    <div class="row"><span class="rel">${b.father} · ${b.mother}</span>
      의 <span class="child">${b.order}</span> ${b.name}</div>`;
}

/* ---------- 달력 ---------- */
function renderCalendar() {
  const { year, month, day, dateText } = CONFIG.wedding;
  $("#date-title").textContent = dateText;

  const first = new Date(year, month - 1, 1).getDay();
  const days = new Date(year, month, 0).getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  let html = "<table><thead><tr>";
  week.forEach((w, i) => html += `<th class="${i === 0 ? "sun" : ""}">${w}</th>`);
  html += "</tr></thead><tbody><tr>";

  for (let i = 0; i < first; i++) html += "<td></td>";
  for (let d = 1; d <= days; d++) {
    const col = (first + d - 1) % 7;
    const isWed = d === day;
    const cls = isWed ? "today" : (col === 0 ? "sun" : "");
    html += `<td class="${cls}">${isWed ? `<span>${d}</span>` : d}</td>`;
    if (col === 6 && d !== days) html += "</tr><tr>";
  }
  html += "</tr></tbody></table>";
  $("#calendar").innerHTML = html;
}

/* ---------- 카운트다운 ---------- */
function renderCountdown() {
  const w = CONFIG.wedding;
  const target = new Date(w.year, w.month - 1, w.day, w.hour, w.minute);
  const box = $("#countdown");

  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      box.innerHTML = `<p class="msg">🎉 오늘은 저희의 결혼식입니다!</p>`;
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const cell = (n, l) => `<div class="cd"><div class="num">${n}</div><div class="lbl">${l}</div></div>`;
    box.innerHTML = cell(d, "DAYS") + cell(h, "HOUR") + cell(m, "MIN") + cell(s, "SEC")
      + `<p class="msg">${CONFIG.groom.name} ❤ ${CONFIG.bride.name}의 결혼식이 <b>${d}일</b> 남았습니다.</p>`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- 오시는 길 ---------- */
function renderLocation() {
  const v = CONFIG.venue;
  $("#loc-name").textContent = v.name;
  $("#loc-addr").textContent = v.address;
  $("#loc-detail").textContent = v.detail;

  $("#map-frame").src =
    `https://www.google.com/maps?q=${encodeURIComponent(v.embedQuery)}&output=embed`;

  const q = encodeURIComponent(v.mapQuery);
  $("#map-buttons").innerHTML = `
    <a href="https://map.naver.com/v5/search/${q}" target="_blank" rel="noopener">네이버 지도</a>
    <a href="https://map.kakao.com/?q=${q}" target="_blank" rel="noopener">카카오맵</a>
    <a href="https://www.google.com/maps/search/${q}" target="_blank" rel="noopener">구글 지도</a>`;
}

/* ---------- 갤러리 ---------- */
function renderGallery() {
  $("#gallery-grid").innerHTML = CONFIG.gallery
    .map((src) => `<img src="${src}" alt="갤러리 사진" loading="lazy" />`)
    .join("");
}

function initLightbox() {
  const box = $("#lightbox");
  const img = $("#lightbox-img");
  $("#gallery-grid").addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      img.src = e.target.src;
      box.hidden = false;
    }
  });
  const close = () => { box.hidden = true; img.src = ""; };
  $(".lightbox__close").addEventListener("click", close);
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
}

/* ---------- 계좌 ---------- */
function renderAccounts() {
  const group = (title, list) => `
    <div class="account__item">
      <button class="account__head">${title}<span class="side">열기 ▾</span></button>
      <div class="account__body">
        ${list.map((a) => `
          <div class="account__row">
            <div>
              <div class="account__label">${a.label} ${a.holder}</div>
              <div class="account__num">${a.bank} ${a.number}</div>
            </div>
            <button class="account__copy" data-copy="${a.bank} ${a.number}">복사</button>
          </div>`).join("")}
      </div>
    </div>`;

  $("#account-list").innerHTML =
    group("신랑측 계좌번호", CONFIG.accounts.groomSide) +
    group("신부측 계좌번호", CONFIG.accounts.brideSide);

  $$(".account__head").forEach((h) =>
    h.addEventListener("click", () => h.parentElement.classList.toggle("open")));

  $$(".account__copy").forEach((b) =>
    b.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(b.dataset.copy);
        toast("계좌번호가 복사되었습니다");
      } catch {
        toast("복사에 실패했습니다");
      }
    }));
}

/* ---------- 방명록 (localStorage) ---------- */
const GB_KEY = "wedding_guestbook";

function initGuestbook() {
  $("#guestbook-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#gb-name").value.trim();
    const msg = $("#gb-msg").value.trim();
    if (!name || !msg) return;
    const list = loadGB();
    list.unshift({ id: Date.now(), name, msg, date: formatDate(new Date()) });
    saveGB(list);
    $("#gb-name").value = "";
    $("#gb-msg").value = "";
    renderGB();
    toast("축하 메시지가 등록되었습니다 💌");
  });
  renderGB();
}

function loadGB() {
  try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; }
  catch { return []; }
}
function saveGB(list) { localStorage.setItem(GB_KEY, JSON.stringify(list)); }

function renderGB() {
  const list = loadGB();
  if (!list.length) {
    $("#guestbook-list").innerHTML =
      `<li class="gb__item"><div class="text">아직 메시지가 없어요. 첫 번째 축하를 남겨주세요!</div></li>`;
    return;
  }
  $("#guestbook-list").innerHTML = list.map((it) => `
    <li class="gb__item">
      <button class="del" data-id="${it.id}">삭제</button>
      <span class="name">${escapeHtml(it.name)}</span><span class="date">${it.date}</span>
      <div class="text">${escapeHtml(it.msg)}</div>
    </li>`).join("");

  $$("#guestbook-list .del").forEach((b) =>
    b.addEventListener("click", () => {
      if (!confirm("이 메시지를 삭제할까요?")) return;
      saveGB(loadGB().filter((x) => x.id != b.dataset.id));
      renderGB();
    }));
}

/* ---------- 유틸 ---------- */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) en.target.classList.add("is-visible"); });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));
}

function formatDate(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

let toastTimer;
function toast(msg) {
  let el = $(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}
