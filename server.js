const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const cTable = require('console.table');
const app = express();
const PORT = process.env.PORT || 3001;






app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });
