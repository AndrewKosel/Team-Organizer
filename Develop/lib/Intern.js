// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Intern extends Employee {
    constructor(name, email, id, role, school) {
        super(name, email, id, role)
        this.school = school; 
    }
    getSchool() {
        return this.school; 
    }    

}
module.exports = Intern;