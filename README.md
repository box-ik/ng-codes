![BoxIK](https://dl.dropboxusercontent.com/s/88e07rlcpaoczr5/logo.svg)

# @box-ik/ng-codes
**Codes for Angular** - create events for keystroke sequences.

## Installation
```
npm install @box-ik/ng-codes
```

## Quick Start
1. Import `BoxIkNgCodesModule`
2. Add codes with `ngCodesService.use([...])`
3. Subscribe to code events with `ngCodesService.code.subscribe(_ => {})`

```
import { BoxIkNgCodesModule, BoxIkNgCodesService, BoxIkCode } from '@box-ik/ng-codes';

@NgModule({
  imports: [
    ...
    BoxIkNgCodesModule
  ]
  ...
})
export class AppModule {
  constructor(private ngCodesService: BoxIkNgCodesService) {
    
    // setup
    this.ngCodesService.use([
      new BoxIkCode('↑↑↓↓←→←→ba', 'The Konami Code')
    ]);
    
    // listen
    this.ngCodesService.code
      .subscribe((code: BoxIkCode) => {
        console.info(`'${code.description}' was activated`);
      });
  }
}

```

## What is Code?
Code is a sequence of **lowercase characters, special characters, arrows, numbers, spaces and enters**.\
Use next symbols to specify arrows: `←` (U+2190), `↑` (U+2191), `→` (U+2192), `↓` (U+2193) and `↵` (U+21B5) for Enter.\
Several well known codes:
  * `↑↑↓↓←→←→ba` - The Konami Code;
  * `iddqd` - DOOM: God Mode;
  * `abacabb` - Mortal Kombat: Blood Code.

## Keystroke listening
Service listen keystrokes all the time except:
  * it was manually **paused**;
  * **input or textarea** elements are **in focus**.

There are ignored keys and they can not be used in code sequence:
- unused keys: `Escape`, `Backspace`, `CapsLock`, `Tab`, `Shift`;
- keys with modifiers: `ctrl`, `alt`, `meta`.

> NOTE: **Shift as modifier** could be used for special characters input `~!@#$%^&*()_+`.


## Сode matching
Added codes are sorted by its length and codes with equal length sorted lexicographically.\
User input is compared with each code **in reverse order** - the longest match wins.

If time interval between keys more then **resetInterval** or match found then user input will be reseted.

## API

### BoxIkCode
#### ``value: string``
Сode sequence.

#### ``description: string | null``
User friendly description

### BoxIkNgCodesService
#### ``use(codes: BoxIkCode[]): CodeError[] | null``
Add codes to checking loop. **Multiple calls will merge provided codes**. See [Errors](#errors)

#### ``list(): BoxIkCode[]``
List of currently available codes.

#### ``removeAll(): void``
Remove all codes.

#### ``code: Observable<BoxIkCode>``
Observable for activated codes.

#### ``paused: boolean``
Pause code checking loop.

#### ``resetInterval: number``
Number of milliseconds without keystroke to start new input sequence.

## Errors
Each code is validating by **use()** function and if invalid will be ignored.

Possible errors:
  * **EmptyCode** `(Empty code found)` - code can not be an empty string;
  * **InvalidSymbolsInCode** `(Code '<code>' has invalid symbols <symbols>)` - check that code sequence has no uppercase symbols;
  * **UnreachableCode** `(Code '<subcode0><subcode1>' is unreachable because of '<subcode0>')` - substring codes are reachable only if they are suffixes;
  * **DuplicateCode** `(Code '<code>' has duplicates)` - trying to add multiple codes with the same value.

## License
MIT