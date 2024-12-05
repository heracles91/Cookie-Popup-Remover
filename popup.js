document.getElementById('delete-element').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: selectAndRemoveElement
  });
});

document.getElementById('disable-overflow').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: disableOverflowHidden
  });
});

function selectAndRemoveElement() {
  document.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.remove();
  }, { once: true, capture: true });
}

function disableOverflowHidden() {
  // Apply the overflow: auto !important to the body
  document.body.style.setProperty('overflow', 'auto', 'important');
  
  // Iterate over all style elements in the head to remove overflow: hidden
  const headStyles = document.head.querySelectorAll('style');
  headStyles.forEach(style => {
    style.innerHTML = style.innerHTML.replace(/overflow\s*:\s*hidden\s*;?/gi, 'overflow: auto !important;');
  });
  
  // Iterate over all elements to remove inline overflow: hidden
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    const style = getComputedStyle(element);
    if (style.overflow === 'hidden') {
      element.style.setProperty('overflow', 'auto', 'important');
    }
    if (style.overflowX === 'hidden') {
      element.style.setProperty('overflow-x', 'auto', 'important');
    }
    if (style.overflowY === 'hidden') {
      element.style.setProperty('overflow-y', 'auto', 'important');
    }
  });
}