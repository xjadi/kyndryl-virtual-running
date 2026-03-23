/**
 * config.js — Kyndryl Virtual Run Configuration
 *
 * Fill in your values here. This file is loaded by all pages.
 * Keep this file out of public repositories if it contains sensitive keys.
 *
 * HOW TO USE:
 *  1. Set OPENROUTER_API_KEY  → get one at https://openrouter.ai/keys
 *  2. Set GAS_URL             → deploy your Code.gs as a Web App and paste the URL
 *  3. Set DEFAULT_AI_MODEL    → choose which vision model to use
 *
 * Values set in localStorage (via the config panel in upload.html) take
 * priority over these defaults, so you can override them per-device.
 */

const APP_CONFIG = {
  // Your OpenRouter API key (required for AI extraction)
  OPENROUTER_API_KEY: "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",           // e.g. "sk-or-v1-xxxxxxxxxxxx"

  // Google Apps Script Web App URL (required for leaderboard & submission)
  GAS_URL: "https://script.google.com/macros/s/AKfycbyAn1Qgi87FrZRzcyxs22UVQngDXzIzFBMCqEToQP6RL_pROUYH73sh3scWyd3SN7h2/exec",                       // e.g. "https://script.google.com/macros/s/.../exec"


  // Default AI model for image analysis
  //google/gemini-2.5-flash-lite

  DEFAULT_AI_MODEL: "google/gemini-2.5-flash-lite",
};

// Expose a helper that returns localStorage override → config.js value → fallback
window.getConfig = function (key, fallback) {
  const lsMap = {
    OPENROUTER_API_KEY: "openrouterKey",
    GAS_URL: "gasUrl",
    DEFAULT_AI_MODEL: "aiModel",
  };
  const lsKey = lsMap[key];
  if (lsKey) {
    const lsVal = localStorage.getItem(lsKey);
    if (lsVal) return lsVal;
  }
  return APP_CONFIG[key] || fallback || "";
};
