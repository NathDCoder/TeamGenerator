
const inquirer = require("inquirer");
const fs = require('fs');

const generateHTML = ({ managerName, managerID, email, officeNumber}) =>
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main Page</title>
</head>
<h1>Team Page</h1>
<body>
    <div>
        <h2>Manager Profile</h2>
        <h3>${managerName}</h3>
        <div>
            <ul>
                <li>
                    ID:${managerID}
                </li>
                <li>
                    Email:${email}
                </li>
                <li>
                    Office#:${officeNumber}
                </li>
            </ul>
        </div>
    </div>
    <div>
        <h2>Engineer</h2>
        <h3>Andrew</h3>
        <div>
            <ul>
                <li>
                    ID:4564
                </li>
                <li>
                    email:A_kidOnTheBlock@coolmail.com
                </li>
                <li>
                    Office Number:6465279472
                </li>
            </ul>
        </div>
    </div>
    <div>
        <h2>Engineer</h2>
        <h3>Hannah</h3>
        <div>
            <ul>
                <li>
                    ID:9872
                </li>
                <li>
                    email:HannahtheSmarty@coolmail.com
                </li>
                <li>
                    Office Number:7189882136
                </li>
            </ul>
        </div>
    </div>
    <div>
        <h2>Intern</h2>
        <h3>Tom</h3>
        <div>
            <ul>
                <li>
                    ID:1592
                </li>
                <li>
                    email:Tom_wizkid@coolmail.comv
                </li>
                <li>
                    Office Number:5869213412
                </li>
            </ul>
        </div>
    </div>
</body>
</html>`

inquirer
.prompt([
    {
    type: 'input',
    name: 'managerName',
    message: "What is the team manager's name",
    },
    {
    type: 'input',
    name: 'managerID',
    message: "What is team manager's ID?",
    },
    {
    type: 'input',
    name: 'email',
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
   const htmlLoader = generateHTML(answers);
    
    fs.writeFile('index.html', htmlLoader, (err) =>
    err ? console.log(err) : console.log('Successfully logged in to Team Page!')
  );
});

