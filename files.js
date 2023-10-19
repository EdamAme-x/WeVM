/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'index.js': {
    file: {
      contents: `
console.log("Hello world! 🔥")
`,
    },
  },
  'package.json': {
    file: {
      contents: `
          {
            "name": "init-app",
            "type": "module",
            "dependencies": {
              "nodemon": "latest"
            },
            "scripts": {
              "start": "nodemon index.js"
            }
          }`,
    },
  },
};
