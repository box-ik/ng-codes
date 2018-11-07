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
    expect(service.resetInputInterval).toEqual(1000);
  });

  it('use valid cheat code', () => {
    service.use([
      new BoxIkCheatCode('UUDDLRLRba'),
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
    service.use([
      new BoxIkCheatCode('UUDDLRLRba'),
      new BoxIkCheatCode('UUDDLRLRba')
    ]);
    expect(service.list().length).toEqual(1);
  });

  it('use unreachable cheat codes', () => {
    // unreachable cheat codes could not be added to list
    // warning will be logged
    service.use([
      new BoxIkCheatCode('UUDDLRLRba'),
      new BoxIkCheatCode('UUDD')
    ]);
    expect(service.list().length).toEqual(1);
  });

  it('removeAll', () => {
    service.use([
      new BoxIkCheatCode('UUDDLRLRba')
    ]);
    service.removeAll();
    expect(service.list().length).toEqual(0);
  });

  it('cheatCode (subscription)', () => {
    service.cheatCode.subscribe(observer);

    enterCode('UUDDLRLRba');
    service.use([new BoxIkCheatCode('UUDDLRLRba')]);
    enterCode('UUDDLRLRba');

    expect(observer.next).toHaveBeenCalledTimes(1);
  });

  it('paused', () => {
    service.cheatCode.subscribe(observer);
    service.use([new BoxIkCheatCode('UUDDLRLRba')]);
    service.paused = true;
    enterCode('UUDDLRLRba');

    expect(observer.next).not.toHaveBeenCalled();
  });

  it('autoResetInterval', (done) => {
    service.cheatCode.subscribe(observer);
    service.use([new BoxIkCheatCode('UUDDLRLRba')]);
    service.resetInputInterval = 10;
    enterCode('UUDD');
    setTimeout(() => {
      enterCode('LRLRba');
      expect(observer.next).not.toHaveBeenCalled();
      done();
    }, 11);
  });
});

const enterCode = (code: string) => {
  const map = {
    'U': 'ArrowUp',
    'R': 'ArrowRight',
    'D': 'ArrowDown',
    'L': 'ArrowLeft',
    'E': 'Enter',
    'S': 'Spacebar'
  };
  for(let key of code) {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: map[key] || key }));
  }
}