// Add a listener for the close browser action

const browser = browser || chrome;

browser.windows.onRemoved.addListener(() => {
  localStorage.removeItem('isLogin');
});