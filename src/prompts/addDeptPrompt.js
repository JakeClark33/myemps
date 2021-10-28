import inquirer from "inquirer";
import { addDepartment } from "../db/departments.js";
import { mainPrompt } from "./mainPrompt.js";

const name = "department_name";

const prompt = [
  {
    type: "input",
    message: "Department name:",
    name,
  }
];

export const addDeptPrompt = async (connection) => {
  const answers = await inquirer.prompt(prompt);
  const departmentName = answers[name];
  await addDepartment(connection, departmentName);
  console.log(`Added department: ${departmentName}.`);
  return mainPrompt(connection);
}
