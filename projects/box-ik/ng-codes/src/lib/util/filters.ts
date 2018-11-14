
export function filterKeysWithModifiers(event: KeyboardEvent): boolean {
  return !(
    event.ctrlKey ||
    event.altKey ||
    event.metaKey
  );
}

export function filterUnusedKeys(event: KeyboardEvent): boolean {
  const unusedKeys = ['Escape', 'Backspace', 'CapsLock', 'Tab', 'Shift'];
  return !unusedKeys.includes(event.key);
}

export function filterAllWhenTextInputsActive(): boolean {
  const tags = ['input', 'textarea'];
  return !tags.includes(activeTagInDocument());
}

export function activeTagInDocument(): string {
  return document.activeElement.tagName.toLowerCase();
}
