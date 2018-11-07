
import { 
  filterKeysWithModifiers,
  filterUnusedKeys,
  filterAllWhenTextInputsActive
} from './filters';
import { activeTagInDocument } from './filters';


describe('[util]: filters', () => {

  it('[filterKeysWithModifiers]', () => {
    // shift
    let event = new KeyboardEvent('keydown', { key: 'k', shiftKey: true });
    expect(filterKeysWithModifiers(event)).toBeTruthy();
    // crtl
    event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
    expect(filterKeysWithModifiers(event)).toBeFalsy();
    // alt
    event = new KeyboardEvent('keydown', { key: 'k', altKey: true });
    expect(filterKeysWithModifiers(event)).toBeFalsy();
    // meta
    event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
    expect(filterKeysWithModifiers(event)).toBeFalsy();
    // -
    event = new KeyboardEvent('keydown', { key: 'k' });
    expect(filterKeysWithModifiers(event)).toBeTruthy();
  });

  it('[filterUnusedKeys]', () => {
    // Escape
    let event = new KeyboardEvent('keydown', { key: 'Escape' });
    expect(filterUnusedKeys(event)).toBeFalsy();
    // Backspace
    event = new KeyboardEvent('keydown', { key: 'Backspace' });
    expect(filterUnusedKeys(event)).toBeFalsy();
    // CapsLock
    event = new KeyboardEvent('keydown', { key: 'CapsLock' });
    expect(filterUnusedKeys(event)).toBeFalsy();
    // Tab
    event = new KeyboardEvent('keydown', { key: 'Tab' });
    expect(filterUnusedKeys(event)).toBeFalsy();
    // Tab
    event = new KeyboardEvent('keydown', { key: 'Shift' });
    expect(filterUnusedKeys(event)).toBeFalsy();
    // Spacebar
    event = new KeyboardEvent('keydown', { key: 'Spacebar' });
    expect(filterUnusedKeys(event)).toBeTruthy();
    // any
    event = new KeyboardEvent('keydown', { key: 'k' });
    expect(filterUnusedKeys(event)).toBeTruthy();
  });

  it('[activeTagInDocument]', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    
    input.focus();
    expect(activeTagInDocument()).toEqual('input');
    input.blur();
    expect(activeTagInDocument()).toEqual('body');

    document.body.removeChild(input);
  });

  it('[filterAllWhenTextInputsActive]', () => {
    const input = document.createElement('input');
    const textarea = document.createElement('textarea');
    document.body.appendChild(input); 
    document.body.appendChild(textarea); 

    input.focus();
    expect(filterAllWhenTextInputsActive()).toBeFalsy();

    textarea.focus();
    expect(filterAllWhenTextInputsActive()).toBeFalsy();

    textarea.blur();
    expect(filterAllWhenTextInputsActive()).toBeTruthy();

    document.body.removeChild(input);
    document.body.removeChild(textarea);
  });
});
