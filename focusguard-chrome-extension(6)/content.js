// content.js
console.log("FocusGuard Content Script Loaded");

let isContextValid = true;

// 1. LISTEN TO WEB APP
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.type === "FOCUS_GUARD_START") {
    console.log("Received START command from Web App");
    safeSendMessage({ type: "START_SESSION" });
  } else if (event.data.type === "FOCUS_GUARD_STOP") {
    console.log("Received STOP command from Web App");
    safeSendMessage({ type: "STOP_SESSION" });
  }
});

// 2. SAFE MESSAGE SENDER
function safeSendMessage(message) {
  if (!isContextValid) return;

  try {
    if (!chrome.runtime || !chrome.runtime.id) {
      throw new Error("Extension context invalidated");
    }

    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        const msg = chrome.runtime.lastError.message;
        if (msg && msg.includes("Extension context invalidated")) {
          isContextValid = false;
        }
      }
    });
  } catch (error) {
    if (error.message && error.message.includes("Extension context invalidated")) {
      console.log("FocusGuard: Context invalidated.");
      isContextValid = false;
    }
  }
}

// 3. TRACKING LOGIC
const handleVisibilityChange = () => {
  if (!isContextValid) {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    return;
  }
  
  safeSendMessage({
    type: "ACTIVITY_UPDATE",
    payload: {
      visible: document.visibilityState === "visible",
      url: window.location.href
    }
  });
};

document.addEventListener("visibilitychange", handleVisibilityChange);

const intervalId = setInterval(() => {
  if (!isContextValid) {
    clearInterval(intervalId);
    return;
  }

  const video = document.querySelector('video');
  if (video) {
    safeSendMessage({
      type: "VIDEO_STATUS",
      payload: {
        playing: !video.paused,
        muted: video.muted,
        currentTime: video.currentTime
      }
    });
  }
}, 5000);
