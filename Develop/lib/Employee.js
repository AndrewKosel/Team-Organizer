// TODO: Write code to define and export the Employee class
class Employee {
    constructor(role, name, id, email) {
        this.role = role;
        this.name = name; 
        this.id = id;
        this.email = email; 
        
    }

    getRole() {
        return this.role; 
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email; 
    }
}

module.exports = Employee;