// Add a listener for the close browser action

// chrome
chrome && chrome.windows.onRemoved.addListener(() => {
  localStorage.setItem('isClosedBrowser', 'true');
});

// firefox
browser && browser.windows.onRemoved.addListener(() => {
  localStorage.setItem('isClosedBrowser', 'true');
});