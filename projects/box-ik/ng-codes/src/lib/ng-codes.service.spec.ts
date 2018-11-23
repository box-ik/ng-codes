import { BoxIkNgCodesService } from './ng-codes.service';
import { BoxIkCode } from './types';
import { CodeStorage } from './code-storage';
import { KeyListener } from './key-listener';
import { KeyBuffer } from './key-buffer';

describe('BoxIkNgCodesService', () => {
  
  let service: BoxIkNgCodesService;
  let observer;
    
  beforeEach(() => {
    service = new BoxIkNgCodesService(
      new CodeStorage(),
      new KeyListener(),
      new KeyBuffer()
    );
    observer = {
      next: jasmine.createSpy('next'),
      error: jasmine.createSpy('error'),
      complete: jasmine.createSpy('complete')
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.list().length).toEqual(0);
    expect(service.paused).toBeFalsy();
    expect(service.resetInterval).toEqual(1000);
  });

  it('use valid code', () => {
    service.use([
      new BoxIkCode('↑↑↓↓←→←→ba'),
    ]);
    expect(service.list().length).toEqual(1);
  });

  it('use invalid code', () => {
    // invalid codes could not be added to list
    // error will be logged
    service.use([
      new BoxIkCode(''),
      new BoxIkCode('HELLO')
    ]);
    expect(service.list().length).toEqual(0);
  });

  it('use duplicate codes', () => {
    // duplicated codes could not be added to list
    // warning will be logged
    const errors = service.use([
      new BoxIkCode('↑↑↓↓←→←→ba'),
      new BoxIkCode('↑↑↓↓←→←→ba')
    ]);
    expect(errors.length).toEqual(1);
    expect(service.list().length).toEqual(1);
  });

  it('use unreachable codes', () => {
    // unreachable codes could not be added to list
    // warning will be logged
    const errors = service.use([
      new BoxIkCode('↑↑↓↓←→←→ba'),
      new BoxIkCode('↑↑↓↓')
    ]);
    expect(errors.length).toEqual(1);
    expect(service.list().length).toEqual(1);
  });

  it('removeAll', () => {
    service.use([
      new BoxIkCode('↑↑↓↓←→←→ba')
    ]);
    service.removeAll();
    expect(service.list().length).toEqual(0);
  });

  it('code (subscription)', () => {
    service.code.subscribe(observer);

    enterCode('↑↑↓↓←→←→ba');
    service.use([new BoxIkCode('↑↑↓↓←→←→ba')]);
    enterCode('↑↑↓↓←→←→ba');

    expect(observer.next).toHaveBeenCalledTimes(1);
  });

  it('paused', () => {
    service.code.subscribe(observer);
    service.use([new BoxIkCode('↑↑↓↓←→←→ba')]);
    service.paused = true;
    enterCode('↑↑↓↓←→←→ba');

    expect(observer.next).not.toHaveBeenCalled();
  });

  it('resetInterval', (done) => {
    service.code.subscribe(observer);
    service.use([new BoxIkCode('↑↑↓↓←→←→ba')]);
    service.resetInterval = 10;
    enterCode('↑↑↓↓');
    setTimeout(() => {
      enterCode('←→←→ba');
      expect(observer.next).not.toHaveBeenCalled();
      done();
    }, 11);
  });
});

const enterCode = (code: string) => {
  const map = {
    '↑': 'ArrowUp',
    '→': 'ArrowRight',
    '↓': 'ArrowDown',
    '←': 'ArrowLeft',
    '↵': 'Enter',
    ' ': 'Spacebar'
  };
  for(let key of code) {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: map[key] || key }));
  }
}