const { schema, createSchemaContext } = require("earthstar-graphql");
const { ApolloServer } = require("apollo-server");
const path = require("path");
const fs = require("fs");

// Check if there's a folder for workspaces to be stored
const workspacesDirExists = fs.existsSync(path.resolve("./workspaces"));

// If not, create it
if (!workspacesDirExists) {
  fs.mkdirSync(path.resolve("./workspaces"));
}

// Create a schema context
// This tells earthstar-graphql how to store your workspace
// And also lets you configure some options,
// e.g. whether new workspaces can be added
const context = createSchemaContext("SQLITE", {
  // Enter the names of your workspaces here
  workspaceAddresses: ["+earthstardev.99"],
  // Don't change this unless you want to change where workspaces are stored
  getWorkspacePath: (addr) => path.resolve(`./workspaces/${addr}.sqlite`),
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
