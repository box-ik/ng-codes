![BoxIK](https://dl.dropboxusercontent.com/s/88e07rlcpaoczr5/logo.svg)

# @box-ik/ng-cheat-codes
**Cheat Codes for Angular** - create events for keystroke sequences.

## Installation
```
npm install @box-ik/ng-cheat-codes
```

## Quick Start
1. Import `BoxIkCheatCodesModule`
2. Add cheat codes with `cheatCodesService.use([...])`
3. Subscribe to Cheat Code events with `cheatCodesService.cheatCode.subscribe(_ => {})`

```
import { BoxIkCheatCodesModule, BoxIkCheatCodesService, BoxIkCheatCode } from '@box-ik/ng-cheat-codes';

@NgModule({
  imports: [
    ...
    BoxIkCheatCodesModule
  ]
  ...
})
export class AppModule {
  constructor(private cheatCodesService: BoxIkCheatCodesService) {
    
    // setup
    this.cheatCodesService.use([
      new BoxIkCheatCode('↑↑↓↓←→←→ba', 'The Konami Code')
    ]);
    
    // listen
    this.cheatCodesService.cheatCode
      .subscribe((cheatCode: BoxIkCheatCode) => {
        console.info(`'${cheatCode.description}' was activated`);
      });
  }
}

```

## What is Cheat Code?
Cheat code is a sequence of **lowercase characters, special characters, arrows, numbers, spaces and enters**.\
Use next symbols to specify arrows: `←` (U+2190), `↑` (U+2191), `→` (U+2192), `↓` (U+2193) and `↵` (U+21B5) for Enter.\
Several well known cheat codes:
  * `↑↑↓↓←→←→ba` - The Konami Code;
  * `iddqd` - DOOM: God Mode;
  * `abacabb` - Mortal Kombat: Blood Code.

## Keystroke listening
Service listen keystrokes all the time except:
  * it was manually **paused**;
  * **input or textarea** elements are **in focus**.

There are ignored keys and they can not be used in cheat code sequence:
- unused keys: `Escape`, `Backspace`, `CapsLock`, `Tab`, `Shift`;
- keys with modifiers: `ctrl`, `alt`, `meta`.

> NOTE: **Shift as modifier** could be used for special characters input `~!@#$%^&*()_+`.


## Сheat Сode matching
Added cheat codes are sorted by its length and codes with equal length sorted lexicographically.\
User input is compared with each cheat code **in reverse order** - the longest match wins.

If time interval between keys more then **resetInterval** or match found then user input will be reseted.

## API

### BoxIkCheatCode
#### ``code: string``
Cheat code sequence.

#### ``description: string | null``
User friendly description

### BoxIkCheatCodesService
#### ``use(cheatCodes: BoxIkCheatCode[]): CheatCodeError[] | null``
Add cheat codes to checking loop. **Multiple calls will merge provided cheat codes**. See [Errors](#errors)

#### ``list(): BoxIkCheatCode[]``
List of currently available cheat codes.

#### ``removeAll(): void``
Remove all cheat codes.

#### ``cheatCode: Observable<BoxIkCheatCode>``
Observable for activated cheat codes.

#### ``paused: boolean``
Pause cheat code checking loop.

#### ``resetInterval: number``
Number of milliseconds without keystroke to start new input sequence.

## Errors
Each cheat code is validating by **use()** function and if invalid will be ignored.

Possible errors:
  * **EmptyCheatCode** `(Empty cheat code found)` - cheat code can not consist from empty string;
  * **InvalidSymbolsInCheatCode** `(Cheat code '<code>' has invalid symbols <symbols>)` - check that cheat code sequence has no uppercase symbols;
  * **UnreachableCheatCode** `(Cheat code '<subcode0><subcode1>' is unreachable because of '<subcode0>')` - substring cheat codes are reachable only if they are suffixes;
  * **DuplicateCheatCode** `(Cheat code '<code>' has duplicates)` - trying to add multiple cheat codes with the same input sequence.
