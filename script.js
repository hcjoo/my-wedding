/* =====================================================================
   ✏️  여기만 수정하면 됩니다 — 실제 결혼식 정보로 바꿔주세요.
   (공개 사이트이므로 실명 대신 가명/플레이스홀더를 사용 중입니다.)
   ===================================================================== */
const CONFIG = {
  // --- 신랑/신부 ---
  groom: {
    name: "주아무개", phone: "010-0000-0000",
    father: "주아무개", mother: "○아무개", order: "장남",   // 3남 중 장남
    role: "신랑 주아무개",
    desc: "○○를 좋아하는 신랑\n평생 행복하게 해줄게요 💍",
  },
  bride: {
    name: "김아무개", phone: "010-0000-0000",
    father: "김아무개", mother: "○아무개", order: "장녀",   // 2남매 중 장녀
    role: "신부 김아무개",
    desc: "○○를 사랑하는 신부\n늘 곁에서 함께할게요 💕",
  },

  // --- 예식 일시 (24시간제) ---  ※ 예식 시간 미정 → 확인 후 수정
  wedding: {
    year: 2027, month: 1, day: 31,   // 2027.1.31 = 일요일
    hour: 12, minute: 0,
    dateText: "2027년 1월 31일 일요일",
    dateEn: "January 31, 2027",
  },

  // --- 예식 장소 ---
  venue: {
    name: "아벤티움",
    venueLine: "아벤티움 웨딩홀",          // 인사말 상단에 표시
    address: "주소 입력 예정",
    mapQuery: "아벤티움 웨딩홀",
    embedQuery: "아벤티움 웨딩홀",
    transport: [
      { head: "지하철", body: "○○역 ○번 출구 도보 ○분" },
      { head: "버스", body: "○○ 정류장 하차 (○○, ○○번)" },
      { head: "자가용", body: "내비게이션에 '아벤티움' 검색\n주차 ○시간 무료" },
    ],
  },

  // --- 인사말 ---
  greeting:
    "서로 다른 길을 걸어온 두 사람이\n이제 같은 곳을 바라보며 함께 걷고자 합니다.\n저희 두 사람의 새로운 시작을\n귀한 걸음으로 축복해 주시면 감사하겠습니다.",

  // --- 인터뷰 ---
  interview: [
    { q: "Q. 신혼여행은 어디로 가나요?", a: "고민 끝에 ○○로 결정했어요. 너무 설레요!" },
    { q: "Q. 첫 데이트는 누가 신청했나요?", a: "사실 처음 보자마자 반했어요. 먼저 마음을 표현해줘서 고마웠어요." },
    { q: "Q. 서로의 첫인상은 어땠나요?", a: "친구처럼 편안했고, 함께라면 뭐든 즐거울 것 같았어요." },
  ],

  // --- 타임라인 갤러리 (실제 사진 준비되면 t1~t4.jpg 로 교체) ---
  timeline: [
    { img: "images/illust-1.svg", cap: "처음 만난 우리", date: "2021.01.21" },
    { img: "images/illust-2.svg", cap: "설레던 첫 데이트", date: "2022.03.15" },
    { img: "images/illust-3.svg", cap: "함께 떠난 여행", date: "2024.04.17" },
    { img: "images/illust-4.svg", cap: "아름다웠던 그날", date: "2024.04.17" },
  ],

  // 신랑/신부 소개 사진, 메인(hero) 배경 사진 (실제 사진 준비되면 .jpg 로 교체)
  groomPhoto: "images/illust-groom.svg",
  bridePhoto: "images/illust-bride.svg",
  heroImage: "images/illust-hero.svg",

  // --- 마음 전하실 곳 (계좌) ---
  accounts: {
    groomSide: [
      { label: "신랑", bank: "○○은행", number: "000-0000-0000", holder: "주아무개" },
      { label: "신랑 아버지", bank: "○○은행", number: "000-0000-0000", holder: "주아무개" },
    ],
    brideSide: [
      { label: "신부", bank: "○○은행", number: "000-0000-0000", holder: "김아무개" },
      { label: "신부 어머니", bank: "○○은행", number: "000-0000-0000", holder: "○아무개" },
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
  renderProfile();
  renderCalendar();
  renderCountdown();
  renderInterview();
  renderTimeline();
  renderLocation();
  renderAccounts();
  initRsvp();
  initGuestbook();
  initReveal();
  initLightbox();
});

/* ---------- 메인 ---------- */
function renderHero() {
  const hero = $("#hero");
  hero.style.backgroundImage = `url("${CONFIG.heroImage}")`;
  $("#hero-date-en").textContent = CONFIG.wedding.dateEn;
  $("#footer-names").textContent = `${CONFIG.groom.name} · ${CONFIG.bride.name}`;
}

/* ---------- 인사말 ---------- */
function renderGreeting() {
  const g = CONFIG.groom, b = CONFIG.bride;
  $("#greeting-venue").innerHTML = `${CONFIG.wedding.dateText}<br/>${CONFIG.venue.venueLine}`;
  $("#greeting-body").textContent = CONFIG.greeting;
  $("#greeting-parents").innerHTML = `
    <div class="row"><span class="rel">${g.father} · ${g.mother}</span>의
      <span class="child">${g.order}</span> ${g.name}</div>
    <div class="row"><span class="rel">${b.father} · ${b.mother}</span>의
      <span class="child">${b.order}</span> ${b.name}</div>`;
  $("#contact-buttons").innerHTML =
    `<a href="tel:${g.phone}">신랑에게 연락하기</a>`;
}

/* ---------- 신랑·신부 소개 ---------- */
function renderProfile() {
  const g = CONFIG.groom, b = CONFIG.bride;
  $("#groom-photo").src = CONFIG.groomPhoto;
  $("#bride-photo").src = CONFIG.bridePhoto;
  $("#groom-info").innerHTML = `<div class="role">${g.role}</div>${nl2br(g.desc)}`;
  $("#bride-info").innerHTML = `<div class="role">${b.role}</div>${nl2br(b.desc)}`;
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
    if (diff <= 0) { box.innerHTML = `<p class="msg">🎉 오늘은 저희의 결혼식입니다!</p>`; return; }
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

/* ---------- 인터뷰 ---------- */
function renderInterview() {
  $("#interview-list").innerHTML = CONFIG.interview
    .map((it) => `<div><div class="q">${it.q}</div><div class="a">${escapeHtml(it.a)}</div></div>`)
    .join("");
}

/* ---------- 타임라인 갤러리 ---------- */
function renderTimeline() {
  $("#timeline-grid").innerHTML = CONFIG.timeline.map((it, i) => `
    <div class="polaroid" style="--rot:${i % 2 ? 2 : -2}deg">
      <img src="${it.img}" alt="${escapeHtml(it.cap)}" loading="lazy" />
      <div class="cap">${escapeHtml(it.cap)}</div>
      <div class="date">${escapeHtml(it.date)}</div>
    </div>`).join("");
}

/* ---------- 오시는 길 ---------- */
function renderLocation() {
  const v = CONFIG.venue;
  $("#loc-addr").textContent = v.address;
  $("#loc-name").textContent = v.name;
  $("#map-frame").src = `https://www.google.com/maps?q=${encodeURIComponent(v.embedQuery)}&output=embed`;
  const q = encodeURIComponent(v.mapQuery);
  $("#map-buttons").innerHTML = `
    <a href="https://map.naver.com/v5/search/${q}" target="_blank" rel="noopener">네이버 지도</a>
    <a href="https://map.kakao.com/?q=${q}" target="_blank" rel="noopener">카카오맵</a>
    <a href="https://www.google.com/maps/search/${q}" target="_blank" rel="noopener">구글 지도</a>`;
  $("#transport").innerHTML = v.transport.map((t) =>
    `<div><div class="t-head">${t.head}</div><div class="t-body">${escapeHtml(t.body)}</div></div>`).join("");
}

/* ---------- 계좌 ---------- */
function renderAccounts() {
  const group = (title, list) => `
    <div class="account__item">
      <button class="account__head">${title}<span class="arrow">▾</span></button>
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
      try { await navigator.clipboard.writeText(b.dataset.copy); toast("계좌번호가 복사되었습니다"); }
      catch { toast("복사에 실패했습니다"); }
    }));
}

/* ---------- RSVP (localStorage) ---------- */
const RSVP_KEY = "wedding_rsvp";
function initRsvp() {
  $("#rsvp-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const side = e.target.side.value;
    const attend = e.target.attend.value;
    const name = $("#rsvp-name").value.trim();
    const count = $("#rsvp-count").value;
    if (!side || !attend || !name || !count) return;
    const list = JSON.parse(localStorage.getItem(RSVP_KEY) || "[]");
    list.push({ side, attend, name, count, date: formatDate(new Date()) });
    localStorage.setItem(RSVP_KEY, JSON.stringify(list));
    e.target.reset();
    $("#rsvp-note").textContent = "참석여부가 전달되었습니다. 감사합니다 🙏";
    toast("참석여부가 전달되었습니다");
  });
}

/* ---------- 방명록 (localStorage) ---------- */
const GB_KEY = "wedding_guestbook";
function initGuestbook() {
  const modal = $("#gb-modal");
  $("#gb-open").addEventListener("click", () => { modal.hidden = false; });
  $("#gb-modal .modal__close").addEventListener("click", () => { modal.hidden = true; });
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });

  $("#guestbook-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#gb-name").value.trim();
    const msg = $("#gb-msg").value.trim();
    if (!name || !msg) return;
    const list = loadGB();
    list.unshift({ id: Date.now(), name, msg, date: formatDateTime(new Date()) });
    saveGB(list);
    $("#gb-name").value = ""; $("#gb-msg").value = "";
    modal.hidden = true;
    renderGB();
    toast("축하 메시지가 등록되었습니다 💌");
  });
  renderGB();
}
function loadGB() { try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; } catch { return []; } }
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
      <button class="del" data-id="${it.id}" aria-label="삭제">&times;</button>
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

/* ---------- 라이트박스 ---------- */
function initLightbox() {
  const box = $("#lightbox"), img = $("#lightbox-img");
  $("#timeline-grid").addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") { img.src = e.target.src; box.hidden = false; }
  });
  const close = () => { box.hidden = true; img.src = ""; };
  $(".lightbox__close").addEventListener("click", close);
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
}

/* ---------- 유틸 ---------- */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) en.target.classList.add("is-visible"); });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));
}
function nl2br(s) { return escapeHtml(s).replace(/\n/g, "<br/>"); }
function formatDate(d) { const p = (n) => String(n).padStart(2, "0"); return `${d.getFullYear()}.${p(d.getMonth()+1)}.${p(d.getDate())}`; }
function formatDateTime(d) { const p = (n) => String(n).padStart(2, "0"); return `${formatDate(d)} ${p(d.getHours())}:${p(d.getMinutes())}`; }
function escapeHtml(s) { return s.replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }
let toastTimer;
function toast(msg) {
  let el = $(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}
