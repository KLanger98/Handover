
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CREATE_USER } from '../../utils/mutation';
// import { LOGIN_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

// Initialize Apollo Client (adjust the URI and cache as per your setup)
const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://your-graphql-endpoint.com/graphql' }),
  cache: new InMemoryCache()
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      // Make a GraphQL request to create a user
      const { data } = await client.mutate({
        mutation: CREATE_USER,
        variables: { email, password, firstName, lastName }
      });

      // Return the created user data
      return data.createUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);