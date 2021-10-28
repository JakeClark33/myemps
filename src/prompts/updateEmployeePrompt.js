import inquirer from "inquirer";
import { getEmployees, updateEmployee } from "../db/employees.js";
import { getRoles } from "../db/roles.js";
import { mainPrompt } from "./mainPrompt.js";

export const updateEmployeePrompt = async (connection) => {
  const [empResults, _empFields] = await getEmployees(connection);
  const empChoices = empResults.map(item => {
    return {name: `${item.first_name} ${item.last_name}`, value: item.id};
  });

  if (!empResults.length) {
    console.warn("You must add at least one employee to the database first.");
    return mainPrompt(connection);
  }

  const [roleResults, _roleFields] = await getRoles(connection);
  const roleChoices = roleResults.map(item => {
    return {name: item.title, value: item.id};
  });

  if (!roleResults.length) {
    console.warn("You must add at least one role to the database first.");
    return mainPrompt(connection);
  }

  const prompt = [
    {
      type: "list",
      message: "Employee:",
      name: "employee_id",
      default: 0,
      choices: empChoices,
    },
    {
      type: "list",
      message: "Role:",
      name: "role_id",
      default: 0,
      choices: roleChoices,
    },
  ];

  const employeeUpdate = await inquirer.prompt(prompt);
  console.log(employeeUpdate);
  await updateEmployee(connection, employeeUpdate);
  console.log(`Updated employee role.`)

  return mainPrompt(connection);
}
