// Add mousedown event to target node
export function addClickEventTo(target, handler) {
  target.addEventListener('click', handler);
}

// Focus on input handler
export function focusOn(item) {
  setTimeout(() => {
    item.focus();
  }, 100); // Set timeout to prevent problem with visibility modal opening animation
}

// Change modal form submit button text handler
export function changeSubmitBtnText(modal, text = 'Сохранение...') {
  modal.setBtnText(text);
}

// Get modal form submit button text handler
export function getSubmitBtnText(modal) {
  return modal.getBtnText();
}
