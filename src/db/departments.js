export const addDepartment = async (connection, departmentName) => {
    return await connection.query(
      'INSERT INTO departments (name) VALUES (?)',
      [departmentName]
    );
  }
  
  export const getDepartments = async (connection) => {
    return await connection.query('SELECT * FROM departments ORDER BY name');
  }
  
  export const getReadableDepartments = async (connection) => {
    return await connection.query('SELECT name as `Department Name`, id as `Department ID` FROM departments ORDER BY name, id DESC');
  }
  