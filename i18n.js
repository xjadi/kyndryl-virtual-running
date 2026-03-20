/**
 * i18n.js — Bilingual support: English (en) & Thai (th)
 *
 * Usage:
 *   - Elements with a data-i18n="key" attribute are translated automatically.
 *   - Elements with data-i18n-placeholder="key" get their placeholder translated.
 *   - Call window.setLang('th') or window.setLang('en') to switch language.
 *   - Current language is stored in localStorage under 'lang'.
 */

const TRANSLATIONS = {
  en: {
    // NAV
    nav_home: "Home",
    nav_upload: "Upload",
    nav_leaderboard: "Leaderboard",

    // INDEX
    hero_tag: "Virtual Event",
    hero_title1: "Push Your",
    hero_accent: "Limits.",
    hero_title2: "Log Your Run.",
    hero_sub: "Complete your distance, screenshot your result from any running app, and upload it here. Our AI reads your stats automatically. Compete with runners worldwide — no finish line, no excuses.",
    hero_cta_submit: "📤 Submit Your Run",
    hero_cta_rank: "🏆 View Rankings",
    hero_stat_top: "Top Distance",
    hero_stat_pace: "Best Pace",
    hero_stat_runners: "Registered Runners",
    hero_stat_from: "from the leaderboard",
    hero_stat_status: "Status",
    hero_stat_live: "LIVE",
    hero_stat_accepting: "Now accepting entries",
    how_label: "How it works",
    how_title: "Three Steps to the Board",
    step1_title: "Complete Your Run",
    step1_desc: "Run any distance and sync with Strava — it works best! Other apps like Garmin, Apple Watch, or Nike Run might work too, but just a heads up, there could be some glitches! 🏃‍♀️✨",
    step2_title: "Screenshot Your Stats",
    step2_desc: "Take a screenshot of your result screen showing your name, distance, pace, time, and date. Mixed app types are accepted.",
    step3_title: "AI Reads Your Data",
    step3_desc: "Upload the photo. Our AI automatically extracts all your stats. Review, confirm, and your result lands on the leaderboard instantly.",
    dist_label: "Distance Categories",
    dist_title: "Any Distance Counts",
    dist_note: "Any distance is welcome! The leaderboard ranks by total distance completed.",
    dist_fun: "Fun Run",
    dist_10k: "10K Classic",
    dist_half: "Half Marathon",
    dist_full: "Full Marathon",
    cta_title: "Ready to Race?",
    cta_sub: "Upload your result and claim your spot on the global leaderboard.",
    cta_submit: "Submit Your Run →",
    cta_board: "View Leaderboard",
    footer_text: "kyndryl Virtual Running · Powered by Google · Built with ❤️ for runners everywhere",

    // UPLOAD
    upload_eyebrow: "AI-Powered Submission",
    upload_title: "Upload Your Run",
    upload_sub: "Screenshot any running app — AI extracts your stats automatically.",
    config_btn: "⚙ API Config",
    config_key: "OpenRouter API Key",
    config_model: "AI Model",
    config_gas: "Google Apps Script URL",
    config_save: "Save Config",
    config_saved: "✓ Saved",
    drop_title: "Drop screenshot here",
    drop_hint: "or browse files · JPG, PNG, HEIC",
    extract_btn: "🤖 Extract with AI",
    clear_btn: "✕ Clear",
    ai_analyzing: "Analyzing screenshot...",
    ai_done: "✅ Done — data is locked for integrity",
    form_label: "Extracted Data",
    form_review: "Locked by AI",
    field_name: "Runner Name *",
    field_date: "Activity Date",
    field_finish: "Finish Time",
    field_distance: "Distance (km) *",
    field_pace: "Pace (MM:SS /km)",
    field_time: "Total Time (HH:MM:SS)",
    field_submit_at: "Submitted At",
    submit_btn: "🏆 Submit to Leaderboard",
    start_over: "Start Over",
    success_title: "You're on the Board!",
    success_sub: "Your result has been submitted successfully.",
    success_view: "View Leaderboard →",
    success_another: "Submit Another",

    // LEADERBOARD
    lb_label: "Ranked by Total Distance",
    lb_title: "Leaderboard",
    lb_sub: "Cumulative distance across all submitted runs — updated live.",
    lb_refresh_in: "Refresh in",
    lb_refresh: "⟳ Refresh",
    lb_submit: "📤 Submit Run",
    lb_setup_title: "⚙️ Connect to Google Sheets",
    lb_setup_sub: "Enter your Google Apps Script URL to load leaderboard data.",
    lb_setup_label: "Google Apps Script URL",
    lb_connect: "Connect",
    stat_runners: "Runners",
    stat_top: "Top Total",
    stat_runs: "Total Runs",
    stat_km: "Total km",
    podium_label: "Top Finishers",
    tbl_runner: "Runner",
    tbl_total_km: "Total km ↓",
    tbl_runs: "Runs",
    tbl_search: "🔍 Search runner...",
    all_runners: "All Runners",
    no_runners: "No Runners Yet",
    no_runners_sub: "Be the first to submit your run!",
    submit_run: "Submit Your Run →",
    loading_lb: "Loading leaderboard...",
    run_singular: "run",
    run_plural: "runs",
  },

  th: {
    // NAV
    nav_home: "หน้าแรก",
    nav_upload: "อัพโหลด",
    nav_leaderboard: "อันดับ",

    // INDEX
    hero_tag: "วิ่งออนไลน์",
    hero_title1: "ผลักดัน",
    hero_accent: "ขีดจำกัด",
    hero_title2: "บันทึกการวิ่ง",
    hero_sub: "วิ่งให้ครบระยะ ถ่ายภาพหน้าจอผลการวิ่ง แล้วอัพโหลดที่นี่ AI จะอ่านสถิติของคุณโดยอัตโนมัติ แข่งกับนักวิ่งทั่วโลก — ไม่มีข้อแม้",
    hero_cta_submit: "📤 ส่งผลการวิ่ง",
    hero_cta_rank: "🏆 ดูอันดับ",
    hero_stat_top: "ระยะสูงสุด",
    hero_stat_pace: "เพซดีสุด",
    hero_stat_runners: "นักวิ่งที่ลงทะเบียน",
    hero_stat_from: "จากกระดานอันดับ",
    hero_stat_status: "สถานะ",
    hero_stat_live: "LIVE",
    hero_stat_accepting: "กำลังรับผลการวิ่ง",
    how_label: "วิธีการ",
    how_title: "3 ขั้นตอนสู่กระดานอันดับ",
    step1_title: "วิ่งให้เสร็จ",
    step1_desc: "วิ่งระยะไหนก็ได้แล้วซิงค์ผ่าน Strava เลยนะคะ — ใช้งานได้ดีที่สุดเลย! แอปอื่น ๆ อย่าง Garmin, Apple Watch หรือ Nike Run ก็อาจใช้ได้เหมือนกัน แต่เดี๋ยวอาจมีติดขัดนิดหน่อยนะคะ 🏃‍♀️✨",
    step2_title: "ถ่ายหน้าจอสถิติ",
    step2_desc: "ถ่ายภาพหน้าจอผลการวิ่งที่แสดงชื่อ ระยะ เพซ เวลา และวันที่ รองรับทุกแอป",
    step3_title: "AI อ่านข้อมูลให้",
    step3_desc: "อัพโหลดภาพ AI จะดึงสถิติทั้งหมดโดยอัตโนมัติ ยืนยันแล้วผลจะขึ้นกระดานทันที",
    dist_label: "หมวดระยะทาง",
    dist_title: "ทุกระยะนับ",
    dist_note: "ยินดีรับทุกระยะทาง! กระดานอันดับจัดอันดับตามระยะรวมสะสม",
    dist_fun: "ฟันรัน",
    dist_10k: "10K คลาสสิก",
    dist_half: "ฮาล์ฟมาราธอน",
    dist_full: "มาราธอน",
    cta_title: "พร้อมแข่งแล้วหรือยัง?",
    cta_sub: "อัพโหลดผลการวิ่งและจองที่ของคุณบนกระดานอันดับ",
    cta_submit: "ส่งผลการวิ่ง →",
    cta_board: "ดูกระดานอันดับ",
    footer_text: "kyndryl Virtual Running · ขับเคลื่อนด้วย Google · สร้างด้วย ❤️ สำหรับนักวิ่ง",

    // UPLOAD
    upload_eyebrow: "ส่งผลด้วย AI",
    upload_title: "อัพโหลดการวิ่ง",
    upload_sub: "ถ่ายหน้าจอจากแอปวิ่ง — AI จะดึงสถิติโดยอัตโนมัติ",
    config_btn: "⚙ ตั้งค่า API",
    config_key: "OpenRouter API Key",
    config_model: "โมเดล AI",
    config_gas: "Google Apps Script URL",
    config_save: "บันทึก",
    config_saved: "✓ บันทึกแล้ว",
    drop_title: "วางภาพหน้าจอที่นี่",
    drop_hint: "หรือเลือกไฟล์ · JPG, PNG, HEIC",
    extract_btn: "🤖 ดึงข้อมูลด้วย AI",
    clear_btn: "✕ ล้าง",
    ai_analyzing: "กำลังวิเคราะห์หน้าจอ...",
    ai_done: "✅ เสร็จสิ้น — ข้อมูลถูกล็อกเพื่อความถูกต้อง",
    form_label: "ข้อมูลที่ดึงได้",
    form_review: "ล็อกโดย AI",
    field_name: "ชื่อนักวิ่ง *",
    field_date: "วันที่วิ่ง",
    field_finish: "เวลาสิ้นสุด",
    field_distance: "ระยะทาง (กม.) *",
    field_pace: "เพซ (น:ว /กม.)",
    field_time: "เวลารวม (ชม:น:ว)",
    field_submit_at: "เวลาที่ส่ง",
    submit_btn: "🏆 ส่งเข้ากระดานอันดับ",
    start_over: "เริ่มใหม่",
    success_title: "ติดกระดานแล้ว!",
    success_sub: "ส่งผลการวิ่งเรียบร้อยแล้ว",
    success_view: "ดูกระดานอันดับ →",
    success_another: "ส่งอีกครั้ง",

    // LEADERBOARD
    lb_label: "จัดอันดับตามระยะรวม",
    lb_title: "กระดานอันดับ",
    lb_sub: "ระยะทางสะสมจากทุกการวิ่งที่ส่ง — อัพเดตสด",
    lb_refresh_in: "รีเฟรชใน",
    lb_refresh: "⟳ รีเฟรช",
    lb_submit: "📤 ส่งผลวิ่ง",
    lb_setup_title: "⚙️ เชื่อมต่อ Google Sheets",
    lb_setup_sub: "กรอก Google Apps Script URL เพื่อโหลดข้อมูลกระดานอันดับ",
    lb_setup_label: "Google Apps Script URL",
    lb_connect: "เชื่อมต่อ",
    stat_runners: "นักวิ่ง",
    stat_top: "อันดับ 1 รวม",
    stat_runs: "การวิ่งทั้งหมด",
    stat_km: "กม. รวม",
    podium_label: "อันดับต้น",
    tbl_runner: "นักวิ่ง",
    tbl_total_km: "กม. รวม ↓",
    tbl_runs: "ครั้ง",
    tbl_search: "🔍 ค้นหานักวิ่ง...",
    all_runners: "นักวิ่งทั้งหมด",
    no_runners: "ยังไม่มีนักวิ่ง",
    no_runners_sub: "คุณจะเป็นคนแรกได้!",
    submit_run: "ส่งผลการวิ่ง →",
    loading_lb: "กำลังโหลดกระดานอันดับ...",
    run_singular: "ครั้ง",
    run_plural: "ครั้ง",
  }
};

// ── Current language ──
let currentLang = localStorage.getItem('lang') || 'en';

// ── Public: get a translation string ──
window.t = function (key) {
  return (TRANSLATIONS[currentLang] || TRANSLATIONS['en'])[key]
    || TRANSLATIONS['en'][key]
    || key;
};

// ── Apply translations to all data-i18n elements ──
window.applyTranslations = function () {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  // Update lang toggle button
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = currentLang === 'en' ? 'ภาษาไทย' : 'English';
  // Update html lang attribute
  document.documentElement.lang = currentLang === 'th' ? 'th' : 'en';
};

// ── Public: set language ──
window.setLang = function (lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyTranslations();
};

// ── Public: toggle between en↔th ──
window.toggleLang = function () {
  setLang(currentLang === 'en' ? 'th' : 'en');
};

// ── Auto-apply on DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', applyTranslations);
