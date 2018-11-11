import { TestBed } from '@angular/core/testing';
import { BoxIkCheatCodesService } from './cheat-codes.service';
import { BoxIkCheatCode } from './types';

describe('BoxIkCheatCodesService', () => {
  
  let service: BoxIkCheatCodesService;
  let observer;
    
  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(BoxIkCheatCodesService);
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

  it('use valid cheat code', () => {
    service.use([
      new BoxIkCheatCode('↑↑↓↓←→←→ba'),
    ]);
    expect(service.list().length).toEqual(1);
  });

  it('use invalid cheat code', () => {
    // invalid cheat codes could not be added to list
    // error will be logged
    service.use([
      new BoxIkCheatCode(''),
      new BoxIkCheatCode('HELLO')
    ]);
    expect(service.list().length).toEqual(0);
  });

  it('use duplicate cheat codes', () => {
    // duplicated cheat codes could not be added to list
    // warning will be logged
    const errors = service.use([
      new BoxIkCheatCode('↑↑↓↓←→←→ba'),
      new BoxIkCheatCode('↑↑↓↓←→←→ba')
    ]);
    expect(errors.length).toEqual(1);
    expect(service.list().length).toEqual(1);
  });

  it('use unreachable cheat codes', () => {
    // unreachable cheat codes could not be added to list
    // warning will be logged
    const errors = service.use([
      new BoxIkCheatCode('↑↑↓↓←→←→ba'),
      new BoxIkCheatCode('↑↑↓↓')
    ]);
    expect(errors.length).toEqual(1);
    expect(service.list().length).toEqual(1);
  });

  it('removeAll', () => {
    service.use([
      new BoxIkCheatCode('↑↑↓↓←→←→ba')
    ]);
    service.removeAll();
    expect(service.list().length).toEqual(0);
  });

  it('cheatCode (subscription)', () => {
    service.cheatCode.subscribe(observer);

    enterCode('↑↑↓↓←→←→ba');
    service.use([new BoxIkCheatCode('↑↑↓↓←→←→ba')]);
    enterCode('↑↑↓↓←→←→ba');

    expect(observer.next).toHaveBeenCalledTimes(1);
  });

  it('paused', () => {
    service.cheatCode.subscribe(observer);
    service.use([new BoxIkCheatCode('↑↑↓↓←→←→ba')]);
    service.paused = true;
    enterCode('↑↑↓↓←→←→ba');

    expect(observer.next).not.toHaveBeenCalled();
  });

  it('resetInterval', (done) => {
    service.cheatCode.subscribe(observer);
    service.use([new BoxIkCheatCode('↑↑↓↓←→←→ba')]);
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