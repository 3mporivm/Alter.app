// Add a listener for the close browser action

chrome && chrome.windows.onRemoved.addListener(() => {
  localStorage.removeItem('isLogin');
});

browser && browser.windows.onRemoved.addListener(() => {
  localStorage.removeItem('isLogin');
});