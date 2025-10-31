const path = require('node:path');

module.exports = {
  plugins: {
    'postcss-import': {
      resolve(id, basedir) {
        if (id.startsWith('@/')) {
          return path.resolve(__dirname, id.slice(2));
        }
        return path.resolve(basedir, id);
      },
    },
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
