const fs = require('fs');
const path = require('path');

const gitPath = path.join(__dirname,'..',process.env.HUSKY_GIT_PARAMS);
console.log(gitPath);
process.exit(1);