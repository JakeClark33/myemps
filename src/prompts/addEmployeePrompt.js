import inquirer from "inquirer";
import { addEmployee, getEmployees } from "../db/employees.js";
import { getRoles } from "../db/roles.js";
import { mainPrompt } from "./mainPrompt.js";


export const addEmployeePrompt = async (connection) => {
  const [roleResults, _roleFields] = await getRoles(connection);
  const roleChoices = roleResults.map(item => {
    return {name: item.title, value: item.id};
  });

  if (!roleResults.length) {
    console.warn("You must add at least one role to the database first.");
    return mainPrompt(connection);
  }

  const [mgrResults, _mgrFields] = await getEmployees(connection);
  const mgrChoices = mgrResults.map(item => {
    return {name: `${item.first_name} ${item.last_name}`, value: item.id};
  });

  mgrChoices.unshift({
    name: "None",
    value: null,
  });

  const prompt = [
    {
      type: "input",
      message: "First name:",
      name: "first_name",
    },
    {
      type: "input",
      message: "Last name:",
      name: "last_name",
    },
    {
      type: "list",
      message: "Role:",
      name: "role_id",
      default: 0,
      choices: roleChoices,
    },
    {
      type: "list",
      message: "Manager:",
      name: "manager_id",
      default: 0,
      choices: mgrChoices,
    },
  ];
  const employee = await inquirer.prompt(prompt);
  await addEmployee(connection, employee);
  console.log(`Added Employee: ${employee.first_name} ${employee.last_name}`);
  return mainPrompt(connection);
}
