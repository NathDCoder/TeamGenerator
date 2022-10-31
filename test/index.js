const inquirer = require("inquirer");
const fs = require('fs');
const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");
const path = require("path")
const teamMembers = []
const idArr = []
const DIST_DIR = path.resolve(__dirname, "dist")
const distPath = path.join(DIST_DIR, "team.html")
const render = require("../src/pagetemplate");
const { addListener } = require("process");

function teamGenerator() {
    function createManager() {

        inquirer
        .prompt([
            {
            type: 'input',
            name: 'managerName',
            message: "What is the team manager's name",
            },
            {
            type: 'input',
            name: 'manangerID',
            message: "What is team manager's ID?",
            },
            {
            type: 'input',
            name: 'managerEmail',
            message: "What is the team manager's email?",
            },
            {
            type: 'input',
            name: 'officeNumber',
            message: "What is the team manager's office number?",
            validate(value) {
                const pass = value.match(
                /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
                );
                if (pass) {
                return true;
                }
        
                return 'Please enter a valid phone number';
            }
            },
        ])
        .then((answers) => {
            const manager = new Manager(
                answers.managerName, answers.managerID, answers.managerEmail, answers.officeNumber
            );
            teamMembers.push(manager);
            idArr.push(answers.managerID);
            nextStep();
        });
    }
    function nextStep() {
        inquirer
            .prompt ([
             {
                type:"list",
                name:"userChoice",
                message:"What would you like to do next?",
                choices:["Add an Engineer", "Add an Intern", "Generate my Team profile"]
             }   
            ])
            .then((choice) => {
                switch (choice.userChoice) {
                    case "Add an Enginner":
                        addEngineer();
                        break;
                    case "Add an Intern":
                        addIntern();
                        break;
                    default: 
                        buildTeam()
               }
            })
    }
}

teamGenerator().then(reponse => {
    console.log("Response Received")
    return createManager(response)
}).then(processedResponse => {
    console.log(processedResponse)
})




// const addHTML = ({ name, employeeID, email, number }) => `
// <div>
// <h2>Engineer</h2>
// <h3>${name}</h3>
// <div>
//     <ul>
//         <li>
//             ID:${employeeID}
//         </li>
//         <li>
//             Email:${email}
//         </li>
//         <li>
//             Office#:${number}
//         </li>
//     </ul>
// </div>
// </div>`


// inquirer
//   .prompt([
//     {
//       type:"confirm",
//       name:"Add Staff",
//       message: 'Would you like to add an Engineer?',
//   },
// ])

//  .then((answers) => {
//   const htmlPageContent = addHTML(answers);
  
//   fs.writeFile('index.html', htmlPageContent, (err) =>
//   err ? console.log(err) : console.log('Successfully added Engineer!')
// );
// });