const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
// const writeFileAsync = util.promisify(fs.writeFile);
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
                    type: 'list',
                    name: 'addNew',
                    message: 'Would you Like to add another team member?',
                    choices: ['yes','no']
                }])
                .then(res =>{
                    if (res.addNew === 'yes'){
                        employeeInfo();
                    }else{

                        // let final = render(team);
                        // // if output directory does not exist, create it, then write file team.html
                        // if (!fs.existsSync(OUTPUT_DIR)) {
                        //     fs.mkdirSync(OUTPUT_DIR);
                        // }
                        // fs.writeFileSync(outputPath, final, "utf-8");

                        const output = render(team);
                        fs.writeFile('output/team.html', output, 'utf8', function(err){
                            console.log('success!');
                            console.log(output);
                            console.log(team);
                            console.log('DONE');
                        })
                        
                        // writeFileAsync(outputPath, render(team));
                    }
                })

            }
employeeInfo();