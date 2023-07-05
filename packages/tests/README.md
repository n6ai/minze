# Tests

Test environment for Minze.

## Commands

> Run the following commands in the monorepo root directory.

If you're running the test commands for the first time, you'll need to run `npm run build` in the root directory first.

**All**

```bash
# run all tests
npm test
```

**Vitest**

```bash
# run vitest tests
npm run test-v

# run specific tests based on their filenames
npm run test-v -- utils.spec.ts

# run specific tests with keywords in their filenames
npm run test-v -- utils lib
```

**Playwright**

```bash
# run playwright tests
npm run test-pw

# run specific tests based on their filenames
npm run test-pw -- minze-options.spec.ts

# run specific tests with keywords in their filenames
npm run test-pw -- options reactive

# run tests in debug mode
# this will open a UI for each test, it's more useful when running a specific test
# options can be provided in a similar manner like above
npm run test-pw-debug
npm run test-pw-debug -- minze-options.spec.ts
```
