

import { Observable, fromEvent, Subject } from 'rxjs';
import { takeUntil, skipWhile, filter, map } from 'rxjs/operators';
import { filterKeysWithModifiers, filterUnusedKeys, normalizeKey } from './key-utils';

export class KeyListener {

  paused: boolean = false;

  observable(): Observable<string> {
    return fromEvent(document, 'keydown').pipe(
      takeUntil(this.destroy$),
      skipWhile(_ => this.paused),
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