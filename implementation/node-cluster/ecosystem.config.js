module.exports = {
  apps: [
    {
      script: 'dist/main.js',
      watch: '.',
      name: 'node-cluster',
      instances: 8,
    },
  ],
};
