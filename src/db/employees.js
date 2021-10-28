export const addEmployee = async (connection, employee) => {
    return await connection.query(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]
    );
  }
  
  export const updateEmployee = async (connection, employeeUpdate) => {
    return await connection.query(
      'UPDATE employees set role_id=? WHERE id=?',
      [employeeUpdate.role_id, employeeUpdate.employee_id]
    );
  }
  
  export const getEmployees = async (connection) => {
    return await connection.query('SELECT * FROM employees ORDER BY last_name, first_name');
  }
  
  export const getReadableEmployees = async (connection) => {
    return await connection.query(`
      SELECT 
        employees.last_name as 'Last Name',
        employees.first_name as 'First Name',
        employees.id as 'Employee ID',
        roles.title as 'Title',
        departments.name as 'Department',
        roles.salary as 'Salary',
        CONCAT(managers.first_name, ' ', managers.last_name) as 'Manager'
      FROM employees 
      LEFT JOIN roles 
      ON employees.role_id=roles.id 
      LEFT JOIN departments 
      ON roles.department_id=departments.id
      LEFT JOIN employees AS managers
      ON employees.manager_id=managers.id
      ORDER BY employees.last_name, employees.first_name
    `);
  }
  