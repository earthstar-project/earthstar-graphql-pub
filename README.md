# Earthstar GraphQL Pub

<a href="https://glitch.com/edit/#!/import/github/earthstar-project/earthstar-graphql-pub"><img src="https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg" alt="Remix on Glitch" /></a>

Hosts [Earthstar](https://github.com/cinnamon-bun/earthstar) workspaces, and makes them accessible via a GraphQL API.

You can:

- Query the pub's data via a GraphQL playground
- Read docs on different queries you can make using the playground
- Sync files to and from the pub using [earthstar-graphql]'s `syncGraphql` function in your clients
- Add new data to workspaces using the `set` mutation
- Sync GraphQL pubs with other [REST](https://github.com/earthstar-project/earthstar-pub) and GraphQL pubs

## Usage

Start the pub with

`yarn start`

Then visit the address printed in your console.
