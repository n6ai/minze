# Tests

Test environment for Minze.

## Commands

> Run the following commands in the monorepo root directory.

If you're running the test commands for the first time, you'll need to run `npm run build` first.

**Tests**

```bash
# run all tests
$ npm test

# run specific tests based on their filenames
$ npm test -- minze-options.spec.ts

# run specific tests with keywords in their filenames
$ npm test -- options reactive

# run tests in debug mode
# this will open a UI for each test, it's more useful when running a specific test
# options can be provided in a similar manner like above
$ npm run test-debug
$ npm run test-debug -- minze-options.spec.ts
```
