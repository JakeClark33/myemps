import inquirer from "inquirer";
import { addDeptPrompt } from "./addDeptPrompt.js";
import { addEmployeePrompt } from "./addEmployeePrompt.js";
import { addRolePrompt } from "./addRolePrompt.js";
import { updateEmployeePrompt } from "./updateEmployeePrompt.js";
import { getReadableDepartments } from "../db/departments.js";
import { getReadableRoles } from "../db/roles.js";
import { getReadableEmployees } from "../db/employees.js";

const menuOptions = {
  main: {
    list_departments: "list_departments",
    list_roles: "list_roles",
    list_employees: "list_employees",
    add_department: "add_department",
    add_role: "add_role",
    add_employee: "add_employee",
    update_employee: "update_employee",
  }
};

const choices = [
  {
    name:"View all departments",
    value: menuOptions.main.list_departments,
  },
  {
    name:"View all roles",
    value: menuOptions.main.list_roles,
  },
  {
    name:"View all employees",
    value: menuOptions.main.list_employees,
  },
  {
    name:"Add a department",
    value: menuOptions.main.add_department,
  },
  {
    name:"Add a role",
    value: menuOptions.main.add_role,
  },
  {
    name:"Add an employee",
    value: menuOptions.main.add_employee,
  },
  {
    name:"Update an employee role",
    value: menuOptions.main.update_employee,
  },
];

const name = "action";

const prompt = [
  {
    type: "list",
    message: "What would you like to do?",
    name,
    default: 0,
    choices
  }
];

export const mainPrompt = async (connection) => {
  const answers = await inquirer.prompt(prompt);
  const action = answers[name];

  switch (action) {
    case menuOptions.main.list_departments: 
      await handleListDepartments(connection);
      break;
    case menuOptions.main.list_roles:
      await handleListRoles(connection);
      break;
    case menuOptions.main.list_employees:
      await handleListEmployees(connection);
      break;
    case menuOptions.main.add_department:
      await addDeptPrompt(connection);
      break;
    case menuOptions.main.add_role:
      await addRolePrompt(connection);
      break;
    case menuOptions.main.add_employee:
      await addEmployeePrompt(connection);
      break;
    case menuOptions.main.update_employee:
      await updateEmployeePrompt(connection);
      break;
  }
}


// TODO: Display pretty table
const handleListDepartments = async (connection) => {
  const [results, _fields] = await getReadableDepartments(connection);
  if (results.length) {
    console.table(results);
  } else {
    console.warn("No Departments have been added to the database.");
  }
  return mainPrompt(connection);
}

const handleListRoles = async (connection) => {
  const [results, _fields] = await getReadableRoles(connection);
  if (results.length) {
    console.table(results);
  } else {
    console.warn("No Roles have been added to the database.");
  }
  return mainPrompt(connection);
}

const handleListEmployees = async (connection) => {
  const [results, _fields] = await getReadableEmployees(connection);
  if (results.length) {
    console.table(results);
  } else {
    console.warn("No Employees have been added to the database.");
  }
  return mainPrompt(connection);
}
