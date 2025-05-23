## Git Commit Message Convention

Your commit messages should follow the [Conventional Commits specification](https://www.conventionalcommits.org/).

This repo uses [@sergejcodes/verify-commit-msg](https://www.npmjs.com/package/@sergejcodes/verify-commit-msg) to enforce a consistent commit message format. If your commit message does not follow the rules, you will receive an error.

> You can use [commitlint.io](https://commitlint.io/) to help you generate a valid commit message.

#### TL;DR:

Messages must be matched by the [regex](https://www.npmjs.com/package/@sergejcodes/verify-commit-msg) enforced by `@sergejcodes/verify-commit-msg` package.

#### Examples

```
feat(dev): add 'comments' option
fix(dev): fix dev error
perf(build)!: remove 'foo' option
revert: feat(compiler): add 'comments' option
```

### Revert

If the PR reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit

### Scope

The scope could be anything specifying the place of the commit change. For example `dev`, `build`, `workflow`, `cli` etc...

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end
