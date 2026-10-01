/* =====================================================================
   여기만 수정하면 됩니다 — 실제 결혼식 정보로 바꿔주세요.
   ===================================================================== */
const CONFIG = {
  // --- 신랑/신부 ---
  groom: { name: "주환철", father: "주길화", mother: "최순이", order: "장남" },
  bride: { name: "김하정", father: "김형진", mother: "허정화", order: "장녀" },

  // --- 예식 일시 ---
  wedding: {
    year: 2027, month: 1, day: 31,   // 2027.1.31 = 일요일
    hour: 15, minute: 30,            // 오후 3시 30분
    dateText: "2027년 1월 31일 일요일",
    dateDigits: "2027.01.31",
    timeEn: "PM 3:30",
  },

  // --- 예식 장소 ---
  venue: {
    name: "아벤티움 웨딩홀",
    nameEn: "AVENTIUM, SEOUL",
    address: "서울 중구 청파로 464 브라운스톤서울 3층",
    phone: "02-313-2480",   // 예식장 대표번호
    mapQuery: "서울 중구 청파로 464 브라운스톤서울",
    embedQuery: "서울 중구 청파로 464 브라운스톤서울",
    transport: [
      { head: "지하철", body:
        "2·5호선 충정로역 4번 출구 — 도보 3분\n출구 방향으로 70m 직진 후 횡단보도 건너편 브라운스톤서울 3층\n\n1·4호선 서울역 15번 출구(공항철도역) — 도보 10분\n'서울역 서부광장' 방향으로 나오신 후 한국경제신문사 방향 이동, 맞은편" },
      { head: "버스", body:
        "한국경제신문사 (02516, 02109)\n마을 서대문06 / 간선 370, 603\n지선 7011, 7013A, 7013B, 7017 / 공항 6015\n\n경찰청·동북아역사재단 (13039)\n간선 103, 150, 701, 704, 708, 709, 742, 750A, 750B, 752\n지선 7021, 7024, M7154 / 공항 6005\n\n서울역서부 (02105)\n간선 173, 261, 262, 463, 503, 604 / 지선 7021, 7024\n\n종근당·충정로역 (02107)\n간선 172, 472, 603, N51, N62, N73" },
      { head: "주차 (내비게이션 검색)", body:
        "본관주차장 — 브라운스톤서울 (중구 청파로 464)\n별관주차장 — 서소문공원 (중구 칠패로 5)" },
    ],
  },

  // --- 인사말 ---
  greeting:
    "서로 다른 길을 걸어온 두 사람이\n이제 같은 곳을 바라보며 걷고자 합니다.\n저희의 새로운 시작을\n귀한 걸음으로 축복해 주세요.",

  // --- 사진 ---
  heroImage: "images/hero.jpg",                    // 첫 화면
  galleryFeature: "images/gallery/g21.jpg",        // 갤러리 큰 사진
  gallery: [                                       // 격자 (중복 없이 나머지 전부)
    "images/gallery/g01.jpg", "images/gallery/g02.jpg", "images/gallery/g03.jpg",
    "images/gallery/g05.jpg", "images/gallery/g06.jpg", "images/gallery/g07.jpg",
    "images/gallery/g08.jpg", "images/gallery/g09.jpg", "images/gallery/g10.jpg",
    "images/gallery/g11.jpg", "images/gallery/g12.jpg", "images/gallery/g13.jpg",
    "images/gallery/g14.jpg", "images/gallery/g15.jpg", "images/gallery/g16.jpg",
    "images/gallery/g17.jpg", "images/gallery/g18.jpg", "images/gallery/g19.jpg",
    "images/gallery/g20.jpg", "images/gallery/g22.jpg",
  ],

  // --- 축하 메시지 저장 위치 ---
  // 구글 시트 Apps Script 웹 앱 URL (guestbook-apps-script.gs 참고)
  // 비워두면 메시지가 각자 기기에만 저장됩니다.
  guestbookApi: "https://script.google.com/macros/s/AKfycbyUQyKpKiZkmkLNcMFrXy00nfIk-_S231r3d6R2WHzpGbLAGNbYTdMvt4fKBCHr7M5l/exec",

  // --- 마음 전하실 곳 (계좌) ---
  accounts: {
    groomSide: [
      { label: "신랑", bank: "신한은행", number: "110-472-002396", holder: "주환철" },
    ],
    brideSide: [
      { label: "신부", bank: "카카오뱅크", number: "3333-04-2972062", holder: "김하정" },
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
  renderGallery();
  renderDate();
  renderCalendar();
  renderCountdown();
  renderLocation();
  renderAccounts();
  initGuestbook();
  initReveal();
  initLightbox();
});

/* ---------- 메인 ---------- */
function renderHero() {
  const w = CONFIG.wedding, v = CONFIG.venue;
  $("#hero-img").src = CONFIG.heroImage;
  $("#hero-venue-en").textContent = v.nameEn;
  $("#hero-time-en").textContent = w.timeEn;
  $("#hero-date").textContent = w.dateDigits;
  $("#hero-names").textContent = `${CONFIG.groom.name} · ${CONFIG.bride.name}`;
  $("#hero-place").textContent = v.name;
  $("#footer-date").textContent = `${w.dateText} ${formatTime(w.hour, w.minute)}`;
  $("#footer-names").textContent = `${CONFIG.groom.name} · ${CONFIG.bride.name}`;
}

/* ---------- 인사말 ---------- */
function renderGreeting() {
  const g = CONFIG.groom, b = CONFIG.bride;
  $("#greeting-body").textContent = CONFIG.greeting;
  $("#greeting-parents").innerHTML =
    `<div>${g.father} · ${g.mother}의 ${g.order} <b>${g.name}</b></div>
     <div>${b.father} · ${b.mother}의 ${b.order} <b>${b.name}</b></div>`;
}

/* ---------- 갤러리 ---------- */
function renderGallery() {
  $("#gallery-feature").src = CONFIG.galleryFeature;
  $("#gallery-grid").innerHTML = CONFIG.gallery
    .map((src, i) => `<img src="${src}" alt="웨딩 사진 ${i + 2}" loading="lazy" />`)
    .join("");
}

/* ---------- 예식 안내 ---------- */
function renderDate() {
  const w = CONFIG.wedding;
  const dow = ["일","월","화","수","목","금","토"][new Date(w.year, w.month - 1, w.day).getDay()];
  $("#date-big").innerHTML =
    `${w.dateDigits} <span class="date__when">(${dow}) ${formatTime(w.hour, w.minute)}</span>`;
}

function renderCalendar() {
  const { year, month, day } = CONFIG.wedding;
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

function renderCountdown() {
  const w = CONFIG.wedding;
  const target = new Date(w.year, w.month - 1, w.day, w.hour, w.minute);
  const box = $("#countdown");
  function tick() {
    const diff = target - new Date();
    if (diff <= 0) { box.innerHTML = `<p class="msg">오늘은 저희의 결혼식입니다</p>`; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const cell = (n, l) => `<div class="cd"><div class="num">${n}</div><div class="lbl">${l}</div></div>`;
    box.innerHTML = cell(d, "DAYS") + cell(h, "HOUR") + cell(m, "MIN") + cell(s, "SEC")
      + `<p class="msg">예식까지 ${d}일 남았습니다</p>`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- 오시는 길 ---------- */
function renderLocation() {
  const v = CONFIG.venue;
  $("#loc-name").textContent = v.name;
  $("#loc-addr").textContent = v.address;
  $("#loc-tel").innerHTML = `예식장 문의 <a href="tel:${v.phone}">${v.phone}</a>`;
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

/* ---------- 축하 메시지 ----------
   CONFIG.guestbookApi 가 있으면 구글 시트에, 없으면 이 기기에 저장합니다. */
const GB_KEY = "wedding_guestbook";
const useSheet = () => !!CONFIG.guestbookApi;

function initGuestbook() {
  const modal = $("#gb-modal");
  $("#gb-open").addEventListener("click", () => { modal.hidden = false; });
  $("#gb-modal .modal__close").addEventListener("click", () => { modal.hidden = true; });
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });

  $("#guestbook-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = $("#gb-name").value.trim();
    const msg = $("#gb-msg").value.trim();
    if (!name || !msg) return;
    const btn = e.target.querySelector("button[type=submit]");
    btn.disabled = true;

    try {
      if (useSheet()) {
        await fetch(CONFIG.guestbookApi, {
          method: "POST",
          // 미리 확인 요청(preflight)이 생기지 않도록 text/plain 으로 보냅니다.
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ name, msg }),
        });
      } else {
        const list = loadLocal();
        list.unshift({ id: Date.now(), name, msg, date: formatDate(new Date()) });
        saveLocal(list);
      }
      $("#gb-name").value = ""; $("#gb-msg").value = "";
      modal.hidden = true;
      toast("축하 메시지가 등록되었습니다");
      renderGB();
    } catch {
      toast("등록에 실패했습니다. 잠시 후 다시 시도해 주세요");
    } finally {
      btn.disabled = false;
    }
  });

  renderGB();
}

function loadLocal() { try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; } catch { return []; } }
function saveLocal(list) { localStorage.setItem(GB_KEY, JSON.stringify(list)); }

async function renderGB() {
  const box = $("#guestbook-list");
  let list = [];
  if (useSheet()) {
    box.innerHTML = `<li class="gb__item"><div class="text">불러오는 중...</div></li>`;
    try {
      const res = await fetch(CONFIG.guestbookApi);
      const data = await res.json();
      list = data.list || [];
    } catch {
      box.innerHTML = `<li class="gb__item"><div class="text">메시지를 불러오지 못했습니다.</div></li>`;
      return;
    }
  } else {
    list = loadLocal();
  }

  if (!list.length) {
    box.innerHTML = `<li class="gb__item"><div class="text">아직 메시지가 없어요. 첫 번째 축하를 남겨주세요.</div></li>`;
    return;
  }
  box.innerHTML = list.map((it) => `
    <li class="gb__item">
      ${useSheet() ? "" : `<button class="del" data-id="${it.id}" aria-label="삭제">&times;</button>`}
      <span class="name">${escapeHtml(it.name)}</span><span class="date">${escapeHtml(it.date || "")}</span>
      <div class="text">${escapeHtml(it.msg)}</div>
    </li>`).join("");

  if (!useSheet()) {
    $$("#guestbook-list .del").forEach((b) =>
      b.addEventListener("click", () => {
        if (!confirm("이 메시지를 삭제할까요?")) return;
        saveLocal(loadLocal().filter((x) => x.id != b.dataset.id));
        renderGB();
      }));
  }
}

/* ---------- 사진 크게 보기 ---------- */
function initLightbox() {
  const box = $("#lightbox"), img = $("#lightbox-img"), count = $("#lightbox-count");
  const photos = [CONFIG.galleryFeature, ...CONFIG.gallery];
  let idx = 0;

  const show = (i) => {
    idx = (i + photos.length) % photos.length;
    img.src = photos[idx];
    count.textContent = `${idx + 1} / ${photos.length}`;
  };
  const open = (src) => { show(photos.indexOf(src)); box.hidden = false; };
  const close = () => { box.hidden = true; img.src = ""; };

  // 스크롤하려고 사진 위에서 손가락을 움직인 경우에는 열지 않는다
  const gallery = $("#gallery");
  let press = null;
  gallery.addEventListener("pointerdown", (e) => {
    press = { x: e.clientX, y: e.clientY, t: Date.now() };
  }, { passive: true });
  gallery.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG") return;
    if (press) {
      const moved = Math.hypot(e.clientX - press.x, e.clientY - press.y);
      if (moved > 10 || Date.now() - press.t > 600) return;   // 끌었거나 길게 누름 → 무시
    }
    open(e.target.getAttribute("src"));
  });
  $(".lightbox__close").addEventListener("click", close);
  $(".lightbox__nav--prev").addEventListener("click", () => show(idx - 1));
  $(".lightbox__nav--next").addEventListener("click", () => show(idx + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
  // 좌우로 밀어 넘기기
  let x0 = null;
  box.addEventListener("touchstart", (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(dx < 0 ? idx + 1 : idx - 1);
    x0 = null;
  }, { passive: true });
}

/* ---------- 유틸 ---------- */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) en.target.classList.add("is-visible"); });
  }, { threshold: 0.08 });
  $$(".reveal").forEach((el) => io.observe(el));
}
function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 300); }, 1800);
}
function formatDate(d) { const p = (n) => String(n).padStart(2, "0"); return `${d.getFullYear()}.${p(d.getMonth()+1)}.${p(d.getDate())}`; }
function formatTime(h, m) { const ampm = h < 12 ? "오전" : "오후"; const h12 = h % 12 || 12; return `${ampm} ${h12}시${m ? ` ${m}분` : ""}`; }
function escapeHtml(s) { return s.replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }
