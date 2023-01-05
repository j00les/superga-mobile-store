import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://4b3f-202-80-218-129.ap.ngrok.io",
  cache: new InMemoryCache(),
});
