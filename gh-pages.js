import * as ghpages from "gh-pages";

ghpages.publish(
  './', // path to public directory
  {
    branch: 'gh-pages',
    repo: 'https://github.com/DepthPixels/Solar-Factuary', // Update to point to your repository
    user: {
      name: 'DepthPixels', // update to use your name
      email: 'depthclawclashedor@gmail.com' // Update to use your email
    },
    dotfiles: true
  },
  () => {
    console.log('Deploy Complete!');
  }
);