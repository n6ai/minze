## Git Commit Message Convention

Your commit messages should follow the [Conventional Commits specification](https://www.conventionalcommits.org/). This repo uses [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional) to enforce a consistent commit message format. If your commit message does not follow the rules, you will receive an error.

> You can use [commitlint.io](https://commitlint.io/) to help you generate a valid commit message.

**Commit Message Structure**

```
<type>(<optional scope>): <subject>
<BLANK LINE>
<optional body>
<BLANK LINE>
<optional footer>
```

**Allowed Types**

```
[
  'build',
  'chore',
  'ci',
  'deps',
  'docs',
  'dx',
  'feat',
  'fix',
  'perf',
  'refactor',
  'release',
  'test',
  'types',
  'wip',
  'workflow'
]
```

**Examples**

```
feat(core): add an event listener to body tag
```

```
fix: correct spelling of listenTo method

close #27
```

```
perf(build): remove 'foo' option

BREAKING CHANGE: The 'foo' option has been removed.
```
