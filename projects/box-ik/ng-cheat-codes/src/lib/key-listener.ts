

import { Observable, fromEvent, Subject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { filterKeysWithModifiers, filterUnusedKeys, filterAllWhenTextInputsActive} from './util';
import { normalizeKey } from './utils';

export class KeyListener {

  paused: boolean = false;

  observable(): Observable<string> {
    return fromEvent(document, 'keydown').pipe(
      takeUntil(this.destroy$),
      filter(_ => !this.paused),
      filter(filterAllWhenTextInputsActive),
      filter(filterKeysWithModifiers),
      filter(filterUnusedKeys),
      map(event => normalizeKey(event.key))
    );
  }

  destroy() {
    this.destroy$.next();
  }

  private destroy$ = new Subject<void>();
}