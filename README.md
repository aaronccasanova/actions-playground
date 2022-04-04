# GitHub Actions Playground

## Events

- [GitHub triggers](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
- [Manual trigger - REST API](https://docs.github.com/en/rest/reference/repos#create-a-repository-dispatch-event)

## Actions

- [GitHub market place](https://github.com/marketplace?type=actions)
- The same repository as your workflow file
- Any public repository
- A published Docker container image on Docker Hub

### Adding an action from the same repository

Reference the action with either the `{owner}/{repo}@{ref}` or `./path/to/dir` syntax in your workflow file.

```
|-- actions-playground
|   |__ .github
|       |__ workflows
|           |__ my-workflow.yml
|       |__ actions
|           |__ local-action
|               |__ action.yml
```

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: ./.github/actions/local-action
```

### [Adding an action from a different repository](https://docs.github.com/en/actions/learn-github-actions/finding-and-customizing-actions#adding-an-action-from-a-different-repository)

## Resources

- [Starter workflows](https://github.com/actions/starter-workflows)
  - [Node](https://github.com/actions/starter-workflows/blob/main/ci/node.js.yml)
  - [Deno](https://github.com/actions/starter-workflows/blob/main/ci/deno.yml)
  - [Docker image](https://github.com/actions/starter-workflows/blob/main/ci/docker-image.yml)
  - [NPM publish](https://github.com/actions/starter-workflows/blob/main/ci/npm-publish.yml)
