/** 
 * Filename: complexApp.js
 * Description: A complex JavaScript application to manage employee information
 */

// Employee class to store employee details
class Employee {
  constructor(id, name, designation, department, salary) {
    this.id = id;
    this.name = name;
    this.designation = designation;
    this.department = department;
    this.salary = salary;
  }

  getEmployeeInfo() {
    return `ID: ${this.id}, Name: ${this.name}, Designation: ${this.designation}, Department: ${this.department}, Salary: ${this.salary}`;
  }
}

// EmployeeManagement class to manage all employees
class EmployeeManagement {
  constructor() {
    this.employees = [];
  }

  addEmployee(employee) {
    this.employees.push(employee);
  }

  removeEmployeeById(id) {
    this.employees = this.employees.filter((emp) => emp.id !== id);
  }

  getEmployeesByDepartment(department) {
    return this.employees.filter((emp) => emp.department === department);
  }

  getEmployeesByDesignation(designation) {
    return this.employees.filter((emp) => emp.designation === designation);
  }

  getTotalSalaryByDepartment(department) {
    const employees = this.getEmployeesByDepartment(department);
    return employees.reduce((total, emp) => total + emp.salary, 0);
  }

  getEmployeeNames() {
    return this.employees.map((emp) => emp.name);
  }

  displayEmployees() {
    this.employees.forEach((emp) => console.log(emp.getEmployeeInfo()));
  }
}

// Create an instance of EmployeeManagement
const empManagement = new EmployeeManagement();

// Add employees
empManagement.addEmployee(new Employee(101, "John Doe", "Manager", "Sales", 65000));
empManagement.addEmployee(new Employee(102, "Jane Smith", "Developer", "IT", 55000));
empManagement.addEmployee(new Employee(103, "Michael Johnson", "Designer", "Design", 50000));
empManagement.addEmployee(new Employee(104, "Emily Williams", "Engineer", "R&D", 60000));

console.log("All Employees:");
empManagement.displayEmployees();

console.log("\nEmployees in IT Department:");
const itEmployees = empManagement.getEmployeesByDepartment("IT");
itEmployees.forEach((emp) => console.log(emp.getEmployeeInfo()));

console.log("\nTotal Salary in Sales Department:", empManagement.getTotalSalaryByDepartment("Sales"));

console.log("\nEmployee Names:");
const employeeNames = empManagement.getEmployeeNames();
console.log(employeeNames.join("\n"));