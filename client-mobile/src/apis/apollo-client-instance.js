import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://1bef-202-80-216-185.ap.ngrok.io/',
  cache: new InMemoryCache(),
});
