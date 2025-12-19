// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const statusBadge = document.getElementById('statusBadge');

  chrome.runtime.sendMessage({ type: "CHECK_STATUS" }, (response) => {
    if (chrome.runtime.lastError) {
      statusBadge.textContent = "ERROR";
      statusBadge.style.background = "#ef4444";
      return;
    }

    if (response && response.status === 'active') {
      statusBadge.textContent = "ACTIVE";
      statusBadge.className = "badge active";
    } else {
      statusBadge.textContent = "IDLE";
      statusBadge.className = "badge idle";
    }
  });
});