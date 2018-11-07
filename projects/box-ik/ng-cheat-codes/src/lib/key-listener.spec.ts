
import { KeyListener } from './key-listener';

describe('KeyListener', () => {

  let observer;

  beforeEach(() => {
    observer = {
      next: jasmine.createSpy('next'),
      error: jasmine.createSpy('error'),
      complete: jasmine.createSpy('complete')
    };
  })

  it('initialization', () => {
    const keyListener = new KeyListener();
    expect(keyListener.paused).toBeFalsy();
  });

  it('destroy', () => {
    const keyListener = new KeyListener();
    keyListener.observable().subscribe(observer);
    keyListener.destroy();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));
    expect(observer.next).not.toHaveBeenCalled();
    expect(observer.error).not.toHaveBeenCalled();
    expect(observer.complete).toHaveBeenCalled();
  });

  it('listen key events (special + normalized)', () => {
    const keyListener = new KeyListener();
    const keyboardEvents = [
      new KeyboardEvent('keydown', { key: 'q' }),
      new KeyboardEvent('keydown', { key: 'ArrowUp' }),
      new KeyboardEvent('keydown', { key: 'Enter' }),
      new KeyboardEvent('keydown', { key: 'u', shiftKey: true }),
      new KeyboardEvent('keydown', { key: 'V' }),
      new KeyboardEvent('keydown', { key: 'Spacebar' })
    ];
    const expectedKeys = ['q', '↑', '↵', 'u', 'v', ' '];

    keyListener.observable().subscribe(observer);
    for(let event of keyboardEvents) {
      document.dispatchEvent(event);
    }
    keyListener.destroy();
    
    expect(observer.next.calls.count()).toEqual(expectedKeys.length);
    for(let i = 0; i < expectedKeys.length; ++i) {
      const args: string[] = observer.next.calls.argsFor(i); 
      expect(args[0]).toEqual(expectedKeys[i]);
    }
    expect(observer.error).not.toHaveBeenCalled();
    expect(observer.complete).toHaveBeenCalled();
  });

  it('ignore events on pause', () => {
    const keyListener = new KeyListener();
    const expectedKeys = ['q', 'e'];

    keyListener.observable().subscribe(observer);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));
    keyListener.paused = true;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
    keyListener.paused = false;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }));

    keyListener.destroy();

    expect(observer.next.calls.count()).toEqual(2);
    for(let i = 0; i < expectedKeys.length; ++i) {
      const args: string[] = observer.next.calls.argsFor(i); 
      expect(args[0]).toEqual(expectedKeys[i]);
    }
    expect(observer.error).not.toHaveBeenCalled();
    expect(observer.complete).toHaveBeenCalled();
  });

  it('ignore event when text inputs are active', () => {
    const keyListener = new KeyListener();
    const expectedKeys = ['q', 'r'];

    const input = document.createElement('input');
    const textarea = document.createElement('textarea');
    document.body.appendChild(input); 
    document.body.appendChild(textarea); 

    keyListener.observable().subscribe(observer);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));
    input.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
    textarea.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }));
    textarea.blur();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'r' }));
    
    keyListener.destroy();

    document.body.removeChild(input);
    document.body.removeChild(textarea);

    expect(observer.next.calls.count()).toEqual(2);
    for(let i = 0; i < expectedKeys.length; ++i) {
      const args: string[] = observer.next.calls.argsFor(i); 
      expect(args[0]).toEqual(expectedKeys[i]);
    }
    expect(observer.error).not.toHaveBeenCalled();
    expect(observer.complete).toHaveBeenCalled();
  });

  it('shift press', () => {
    const keyListener = new KeyListener();
    const keys = [
      new KeyboardEvent('keydown', { key: 'Shift' }),
      new KeyboardEvent('keydown', { key: '^', shiftKey: true }),
      new KeyboardEvent('keydown', { key: '-'}),
      new KeyboardEvent('keydown', { key: 'Shift' }),
      new KeyboardEvent('keydown', { key: '^', shiftKey: true }),
    ];
    const expectedKeys = ['^', '-', '^'];
    keyListener.observable().subscribe(observer);
    for(let key of keys) {
      document.dispatchEvent(key);
    }
    expect(observer.next.calls.count()).toEqual(3);
    for(let i = 0; i < expectedKeys.length; ++i) {
      const args: string[] = observer.next.calls.argsFor(i); 
      expect(args[0]).toEqual(expectedKeys[i]);
    }
  })
});
