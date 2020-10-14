const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const team = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function employeeInfo() {
    inquirer.prompt([{
                type: 'input',
                name: "name",
                message: "Employees Name"
            },
            {
                type: 'input',
                name: "email",
                message: "what is their email address?"
            },
            {
                type: 'input',
                name: 'id',
                message: "enter employee ID"
            },
            {
                type: 'list',
                name: 'role',
                message: "Employee's role",
                choices: ["Manager", "Engineer", "Intern"]
            }
        ])
        .then(answers => {
            // console.log(answers);

            if (answers.role === 'Engineer') {
                inquirer.prompt([{
                    type: 'input',
                    name: 'gitHub',
                    message: "Enter Your Employees GitHub Username"
                }])
                .then(ans => {
                    // console.log(ans.gitHub)
                    const someEngineer = new Engineer(answers.name, answers.email, answers.id, answers.role, ans.gitHub )
                    team.push(someEngineer);
                    console.log(team);
                    addMore();
                })
            }else if(answers.role === 'Manager') {
                    inquirer.prompt([{
                        type: 'input',
                        name: 'office',
                        message: "Enter Office Number"
                    }])
                    .then(ans => {
                        // console.log(ans.office)

                        const someManager = new Manager(answers.name, answers.email, answers.id, answers.role, ans.office )
                        team.push(someManager);
                        console.log(team)
                        addMore();
                    })
                }else if(answers.role === 'Intern') {
                        inquirer.prompt([{
                            type: 'input',
                            name: 'school',
                            message: "Enter Interns School"
                        }])
                        .then(ans => {
                            // console.log(ans.school)

                            const someIntern = new Intern(answers.name, answers.email, answers.id, answers.role, answers.school )
                            team.push(someIntern);
                            console.log(team)
                            addMore();
                        })
            }
            

        })
}

function addMore() {
                inquirer.prompt([{
                    type: 'confirm',
                    name: 'addNew',
                    message: 'Would you Like to add another team member?'
                }])
                .then(res =>{
                    if (res.addNew === true){
                        employeeInfo();
                    }else{
                        writeFileAsync(outputPath, render(team));
                    }
                })

            }
employeeInfo();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.


// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
