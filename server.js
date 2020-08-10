const { schema, createSchemaContext } = require("earthstar-graphql");
const { ApolloServer } = require("apollo-server");
const path = require("path");
const fs = require("fs");

// A list of workspaces that should always be on this pub.
// If a workspace here isn't present yet, we'll create it.
const bootstrapWorkspaces = ["+gardening.xxxxxxxxxxxxxxxxxxxx"];

// The name of the directory where you'd like to store your workspaces
const WORKSPACE_DIR = `.data`;

// Check if there's a folder for workspaces to be stored
const workspacesDirExists = fs.existsSync(path.resolve(WORKSPACE_DIR));

// If not, create it
if (!workspacesDirExists) {
  fs.mkdirSync(path.resolve(WORKSPACE_DIR));
}

// We'll use this regex to find the workspace names from SQLite files
const sqliteRegex = /.*\/?(\+.*\.*)\.sqlite/;

// Create a list of workspaces persisted as SQLite files in the .data directory
const existingWorkspaces =
  fs
    .readdirSync(WORKSPACE_DIR)
    .filter((fileName) => fileName.match(sqliteRegex))
    .map((fileName) => {
      const result = sqliteRegex.exec(fileName);

      if (result) {
        return result[1];
      }

      return undefined;
    })
    .filter((result) => !!result) || [];

// Create a schema context
// This tells earthstar-graphql how to store your workspace
// And also lets you configure some options,
// e.g. whether new workspaces can be added
const context = createSchemaContext("SQLITE", {
  // We use a set here so that workspaces which were found in the bootstrap list
  // and the existing persisted workspaces aren't repeated
  workspaceAddresses: Array.from(
    new Set([...bootstrapWorkspaces, ...existingWorkspaces])
  ),
  // Don't change this unless you want to change where workspaces are stored
  getWorkspacePath: (addr) => path.join(WORKSPACE_DIR, `${addr}.sqlite`),
});

// Create a new GraphQL server
// You can configure whether the GraphQL playground
// is displayed when users visit this server in their browser
const server = new ApolloServer({
  schema,
  context,
  playground: process.env.PLAYGROUND,
});

// Start the pub!
server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🍄 earthstar-graphql pub ready at ${url}`);
});
