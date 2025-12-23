# Installation
- Clone project
- Run `yarn`
- Run `yarn dev`
- Open `localhost:3000` in browser

# Development
- Run `yarn dev`
- Open `localhost:3000` in browser

# Preview Provided Design System
- Run Development
- Open `localhost:3000/design-system` in browser

# Testing
- Run `yarn test`
- Run `yarn test --coverage`
- Open file from directory `./coverage/lcov-report/index.html` in browser

# Production Build
- Run `yarn build`
- Run `yarn start`
- Set environment type on .env
- Open `localhost:4000` in browser

# Git Commit
#### Semantic
* feat: (new feature for the user, not a new feature for build script)
* fix: (bug fix for the user, not a fix to a build script)
* docs: (changes to the documentation)
* style: (formatting, missing semi colons, etc; no production code change)
* refactor: (refactoring production code, eg. renaming a variable)
* test: (adding missing tests, refactoring tests; no production code change)
* chore: (updating grunt tasks etc; no production code change)
* hotfix: (fixing production)

#### Git Message
`semantic: [Feature][SubFeature][TaskID] - todo`

**SubFeature is optional*

#### Example

`#1`

`feat: [VisitNeucentrix][Detail][WB1001] - ui history worklog`

`feat: [VisitNeucentrix][Detail][WB1002] - integrate history worklog`

`fix: [VisitNeucentrix][Detail][WB1003] - incorrect payload api get detail`

`#2`

`fix: [Quotation][Create][WB888] - bug when submit form quotation`

`#3`

`test: [BillsAndPaymentManagement][DetailInvoice][WB111] - section upload invoice`

`#4`

`hotfix: [Login][WB1001] - message not displayed on screen`

`#5`

`feat: [Component][WB2000] - add component accordion`

## Git Merge Request
#### Rules
* 1 merge request for 1 feature

#### Example

`#1`

`[VisitNeucentrix][Detail][WB1001][WB1002][WB1003] - feat: ui history worklog, feat: integrate history worklog, fix: incorrect payload api get detail`

`#2`

`[Quotation][Create][WB888] - fix: bug when submit form quotation`

`#3`

`[BillsAndPaymentManagement][DetailInvoice][WB111] - test: section upload invoice`

`#4`

`[Login][WB1001] - hotfix: message not displayed on screen`

`#5`

`[Component][WB2000] - feat: add component accordion`
