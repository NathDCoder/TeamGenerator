const inquirer = require("inquirer") 

inquirer
.prompt([
  {
    type: 'confirm',
    name: 'Main Page',
    message: 'Would you like to view the Team Roster?',
  },

])
.then((answers))
console.log(answers);

