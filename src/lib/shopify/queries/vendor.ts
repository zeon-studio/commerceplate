export const getVendorsQuery = /* GraphQL */ `
  query getVendors {
    products(first: 250) {
      edges {
        node {
          vendor
        }
      }
    }
  }
`;

export const getTagsQuery = /* GraphQL */ `
  query getVendors {
    products(first: 250) {
      edges {
        node {
          tags
        }
      }
    }
  }
`;
