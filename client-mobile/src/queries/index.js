import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query Query {
    products {
      id
      name
      mainImg
      price
    }
  }
`;

export const GET_CATEGORY = gql`
  query Query {
    categories {
      id
      name
    }
  }
`;

export const GET_DETAIL = gql`
  query GetProductById($id: ID) {
    product(id: $id) {
      id
      name
      price
      description
      Images {
        id
        imgUrl
      }
      Category {
        id
        name
      }
      User {
        id
        username
        email
      }
    }
  }
`;
