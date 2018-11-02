

import { Observable, fromEvent, Subject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { filterKeysWithModifiers, filterUnusedKeys, filterAllWhenInputTagActive, normalizeKey} from './utils';

export class KeyListener {

  paused: boolean = false;

  observable(): Observable<string> {
    return fromEvent(document, 'keydown').pipe(
      takeUntil(this.destroy$),
      filter(_ => !this.paused),
      filter(filterAllWhenInputTagActive),
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