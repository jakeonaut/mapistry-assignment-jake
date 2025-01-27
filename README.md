# Mapistry Take Home Challenge

This is the Mapistry take home challenge.

## The Task

This code starter provides the beginnings of an application that allows submitting, viewing and deleting log entries (numeric values connected to time stamps).

We would like you to add the ability to _edit_ existing log entries.

There are many other things that one can improve on in this codebase, as well as many other possible features to add to the application. Within the given time frame, please change or fix anything else you'd like that you feel makes the code better, or add any further features that you think would improve the app.

We're genuinely not trying to trick you here, this is NOT a test on whether you find all of the hidden errors. We just want to see your approach to working within and improving on an existing code base/app, what you value, and what you choose to prioritize.

## The Rules

- **This is an open book/notes challenge.** Feel free to search and lookup anything that you think will help you. Treat this as if it was a ticket you were given rather than a test.
- **We anticipate you spending approximately 3 - 4 hours to complete the challenge**. It's unlikely that you'll get to _everything_ you'd like to do within that time frame, so prioritize what you feel is most important, or what you think shows off your skills best. **At the end of the time, please commit what you have and open a pull request against the main branch.** In the PR description, explain where you left off and what steps remain. Pretend you are leaving on vacation and need to pass off your work to another teammate.
- **We will discuss your solution in a follow up call.** Be prepared to talk through the choices and tradeoffs you have made. You're welcome to leave notes or pseudo-code on anything you did not get to and we can discuss.
- You may use either JavaScript or TypeScript to complete the solution. **Please use whatever language you are most comfortable with. We will not give preference to either language choice.**
- In your PR description, please add an estimate of how much time you spent on this, and roughly, what you spent your time on. We’re interested in your total time spent because it gives us more context for understanding your prioritizations, not because there is some secret cutoff time that we’re testing you against. The exact number doesn’t matter much. Our time limit is set mostly to communicate clear expectations and remove worry from you, and also because it resembles the reality of having to set priorities while working - not to increase pressure on you or make you feel like you’re taking a timed test.

## The Delivery

Please create a repository in Github with the initial commit including only the code we have provided. Then create a branch and open a pull request against the `main` branch of this repository with your work. Treat it like any pull request you would open at work.

Please [add the following engineers to your repository](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository#inviting-a-collaborator-to-a-personal-repository) so we can look at your solution:

- Adam Gooch (`adamgooch`)
- Allie (`alliejanoch`)
- Anastasia Kaplina (`kaplona`)
- Magdalena Henke (`MagdalenaHenke`)
- Samantha Rack (`srack`)

## Project Structure

This project is built as a monorepo using [yarn workspaces](https://yarnpkg.com/features/workspaces). It contains 3 packages:

1. `client` - The client and UI portion
1. `server` - The server
1. `shared` - TypeScript types and constants that are shared between the client and server

These are the entry places to the client and server:

- frontend: [App.tsx](./packages/client/src/components/App.tsx)
- backend: [logEntriesController.ts](./packages/server/src/presentation/controllers/logEntriesController.ts)

## Development environment

We have built this project with the idea of minimizing setup time for candidates attempting to complete the challenge. In this process we have made a number of decisions regarding tooling that we think provide a robust, but easy to use development experience while giving you an idea of the type of development environment we use on a daily basis. Please feel free to modify the environment and tooling however you see fit.

### Tooling used

#### Node

This project was built using Node 20 which is [an LTS version of Node](https://nodejs.org/en/about/releases/). It may cause issues (e.g. Yarn errors) if you try to run this project on a different version of Node so please ensure you're using Node 20.

#### TypeScript

This project was built with [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html) because it is our language of choice. That being said, we encourage you to complete this project using your preference of JavaScript or TypeScript. We will not give any preferential treatment for choosing either language to complete the project.

#### Package management

We've chosen [yarn v4](https://yarnpkg.com/getting-started/usage) as the package manager for this code base. Since we're using node v20.12+ you may use [Corepack](https://yarnpkg.com/getting-started/install) to install yarn if you don't already have it installed.

Yarn works similar to npm and many of the commands are similar, for example `yarn install` to install dependencies

#### Bundling

We have chosen [webpack](https://webpack.js.org/concepts/) to assist with transpiling and bundling both the client and server packages. This should allow you to see code changes in either package upon saving.

### Code standards

#### Linting

We're using [ESLint](https://eslint.org/docs/user-guide/getting-started) and the [Airbnb's linting rules](https://www.npmjs.com/package/eslint-config-airbnb) with a few minor customizations.

#### Formatting

We have chosen [Prettier](https://prettier.io/docs/en/index.html) as a code formatter.

### Testing

[Jest](https://jestjs.io/docs/getting-started) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) were chosen as the testing libraries for this project. If you're adding tests, you're free to use these.

### Running the app

#### Monorepo root

```sh
$> yarn install
```

#### Client

```sh
$> yarn workspace @mapistry/take-home-challenge-client start
```

> The UI should be accessible at `http://localhost:3001`

#### Server

```sh
$> yarn workspace @mapistry/take-home-challenge-server start
```

#### Linting

From the monorepo root

```sh
$> yarn lint
```

#### Typechecking

Should you choose to use typescript (again, that's optional, vanilla js is fine!). From the monorepo root

```sh
$> yarn typecheck
```

#### Testing

From the monorepo root

```sh
$> yarn test
```

## Domain

The information contained in this section isn't strictly necessary to complete the exercise. We're including it in case it helps in understanding some context around the code and its use cases.

The exercise contains domain objects called `LogEntries`. They elude to the existence of a Log via the `logId` reference on `LogEntries`. A Log is the parent object of `LogEntries` with a one-to-many relationship. Said another way, a Log _has_ many `LogEntries` but a `LogEntry` belongs to only one Log.

We chose not to include a `Log` object in the exercise (except as a mock object in the `useLastVisitedLog` hook) in an effort to keep it lean. If it did exist as an object it would contain attributes such as `id` and `name`. The important thing to consider in this exercise is that when viewing `LogEntries`, we should only be looking at those that belong to the same Log and we should maintain the proper association between each `LogEntry` and its parent Log.
