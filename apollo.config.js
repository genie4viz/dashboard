module.exports = {
  client: {
    addTypename: true,
    excludes: ['**/node_modules/**'],
    includes: ['./**/*.{ts, tsx}'],
    service: {
      name: 'treelab-api',
      url: 'http://localhost:3000/graphql',
      // optional headers
      // headers: {
      //   authorization: 'Bearer lkjfalkfjadkfjeopknavadf',
      // },
      // optional disable SSL validation check
      // skipSSLValidation: true,
    },
    tagName: 'gql',
    target: 'typescript',
  },
};
