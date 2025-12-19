// background.js
const BLOCKED_DOMAINS = [
  "instagram.com", "twitter.com", "reddit.com", "facebook.com", "tiktok.com", "youtube.com/shorts"
];

// Helper to update blocking rules
async function updateBlockingRules(enable) {
  const rules = BLOCKED_DOMAINS.map((domain, index) => ({
    id: index + 1,
    priority: 1,
    action: { 
      type: "redirect", 
      redirect: { extensionPath: "/blocked.html" } 
    },
    condition: { 
      urlFilter: domain, 
      resourceTypes: ["main_frame"] 
    }
  }));

  const ruleIds = rules.map(r => r.id);

  if (enable) {
    console.log("Enabling Blocking Rules...");
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ruleIds, 
      addRules: rules
    });
  } else {
    console.log("Disabling Blocking Rules...");
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ruleIds,
      addRules: []
    });
  }
}

// Initialization
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ sessionActive: false });
  updateBlockingRules(false);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_SESSION") {
    chrome.storage.local.set({ sessionActive: true });
    updateBlockingRules(true);
    sendResponse({ status: "active" });
  } 
  else if (message.type === "STOP_SESSION") {
    chrome.storage.local.set({ sessionActive: false });
    updateBlockingRules(false);
    sendResponse({ status: "idle" });
  } 
  else if (message.type === "CHECK_STATUS") {
    // Return current state from storage
    chrome.storage.local.get(['sessionActive'], (result) => {
      sendResponse({ status: result.sessionActive ? "active" : "idle" });
    });
    return true; // Required for async sendResponse
  }
  else if (message.type === "ACTIVITY_UPDATE" || message.type === "VIDEO_STATUS") {
    sendResponse({ status: "received" });
  }
});