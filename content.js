function selectAndRemoveElement() {
  document.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.remove();
  }, { once: true, capture: true });
}

function disableOverflowHidden() {
  // Apply the overflow: auto !important to the html, body, and head elements
  const elements = ['html', 'body', 'head'];
  elements.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.setProperty('overflow', 'auto', 'important');
    }
  });
}