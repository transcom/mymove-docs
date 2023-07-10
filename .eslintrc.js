module.exports = {
  plugins: ['prettier'],
  extends: ['prettier', 'prettier/prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    es6: true,
  },
};
