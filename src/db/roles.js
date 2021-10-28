export const addRole = async (connection, role) => {
    return await connection.query(
      'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
      [role.title, role.salary, role.department_id]
    );
  }
  
  export const getRoles = async (connection) => {
    return await connection.query('SELECT * FROM roles ORDER BY title');
  }
  
  export const getReadableRoles = async (connection) => {
    return await connection.query(`
      SELECT 
        roles.title AS 'Job Title',
        roles.id AS 'Role ID',
        departments.name AS 'Department',
        roles.salary AS 'Salary'
      FROM roles
      LEFT JOIN departments 
      ON roles.department_id=departments.id
      ORDER BY roles.title
    `);
  }
  