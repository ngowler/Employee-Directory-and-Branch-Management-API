import { Employee } from "../data/employeeData"
import employees from "../data/employeeData"

/**
 * @description Create a new employee.
 * @param {Partial<Employee>} employee - The employee data.
 * @returns {Promise<Employee>}
 */
export const createEmployee = async (employee: {
    name: string,
    position: string,
    department: string,
    email: string,
    phone: string,
    branchId: string,
}): Promise<Employee> => {
    if (!employee.name || !employee.position || !employee.department || !employee.email || !employee.phone || !employee.branchId) {
        throw new Error("All fields (name, position, department, email, phone, branchId) must be provided");
    }
    const newEmployee: Employee = { id: Date.now().toString(), ...employee };
    employees.push(newEmployee);
    return newEmployee;
};

/**
 * @description Get all employees.
 * @returns {Promise<Employee[]>}
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return employees;
};

/**
 * @description Get employees by a specific field value.
 * @param {string} id - The ID of the field to filter by.
 * @returns {Promise<Employee[]>} Array of employees matching the criteria.
 * @throws {Error} If no employees with the given field value are found or if the query fails.
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    const index: number = employees.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`)
    }

    return employees[index];
};

/**
 * @description Update an existing employee.
 * @param {string} id - The ID of the employee to update.
 * @param {Partial<Employee>} employee - The updated employee data.
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const updateEmployee = async (id: string, employee: {
    name?: string,
    position?: string,
    department?: string,
    email?: string,
    phone?: string,
    branchId?: string,
}): Promise<Employee> => {
    const index: number = employees.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`)
    }

    const currentEmployee: Employee = employees[index];

    const updatedEmployee: Employee = { 
        ...currentEmployee,
        ...employee 
    };

    return updatedEmployee;
};

/**
 * @description Delete a employee.
 * @param {string} id - The ID of the employee to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    const index: number = employees.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`)
    }

    employees.splice(index, 1);
};

//Additional Endpoints

/**
 * @description Get employees by a specific branch ID.
 * @param {string} id - The branch ID of the field to filter by.
 * @returns {Promise<Employee[]>} Array of employees matching the criteria.
 * @throws {Error} If no employees with the given branch ID are found or if the query fails.
 */
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
    const employeesInBranch: Employee[] = employees.filter((i) => i.branchId === branchId);
    if (employeesInBranch.length === 0) {
        throw new Error(`Branch ID ${branchId} not found`);
    }

    return employeesInBranch;
};

/**
 * @description Get employees by a specific department name.
 * @param {string} id - The department name of the field to filter by.
 * @returns {Promise<Employee[]>} Array of employees matching the criteria.
 * @throws {Error} If no employees with the given department name are found or if the query fails.
 */
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
    const lowerCaseDepartment: string = department.toLowerCase();

    const employeesInDepartment: Employee[] = employees.filter((i) => 
        i.department && i.department.toLowerCase() === lowerCaseDepartment
    );

    if (employeesInDepartment.length === 0) {
        throw new Error(`Department ${department} not found`);
    }

    return employeesInDepartment;
};
