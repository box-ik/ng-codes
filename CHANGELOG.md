# Changelog

## [1.0.2] - 2018-11-23
### Added
- auto copy files ``README.md``, ``LICENSE`` on project build

## [1.0.1] - 2018-11-23
### Added
- ``CHANGELOG.md`` file
- **BoxIkNgCodesServiceModule** module (``ng-codes-service.module.ts``) - to provide in-module dependencies.

### Changed
- **CodeStorage**, **KeyListener**, **KeyBuffer** become injectable in BoxIkNgCodesServiceModule.
- **BoxIkNgCodesServiceModule** imported to BoxIkNgCodesModule

### Bugfix
- Demo Project: missing code value in "Codes Available" section
