import inquirer from "inquirer";
import { getDepartments } from "../db/departments.js";
import { mainPrompt } from "./mainPrompt.js";
import { addRole } from "../db/roles.js"

export const addRolePrompt = async (connection) => {
  const [results, _fields] = await getDepartments(connection);
  const choices = results.map(item => {
    return {name: item.name, value: item.id}
  });

  if (!choices.length) {
    console.warn("You must add at least one department to the database first.");
    return mainPrompt(connection);
  }

  const prompt = [
    {
      type: "input",
      message: "Title:",
      name: "title",
    },
    {
      type: "number",
      message: "Salary:",
      name: "salary",
    },
    {
      type: "list",
      message: "Department:",
      name: 'department_id',
      default: 0,
      choices
    },
  ];

  const role = await inquirer.prompt(prompt);
  console.log(role);
  await addRole(connection, role);
  console.log(`Added role: ${role.title}`);
  return mainPrompt(connection);
}
