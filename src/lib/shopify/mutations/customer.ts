export const createCustomerMutation = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const getCustomerAccessTokenMutation = /* GraphQL */ `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const getUserDetailsQuery = /* GraphQL */ `
  query getOrders($input: String!) {
    customer(customerAccessToken: $input) {
      id
      firstName
      lastName
      acceptsMarketing
      email
      phone
    }
  }
`;
