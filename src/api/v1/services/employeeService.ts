import { Employee } from "../data/employeeData"
import employees from "../data/employeeData"

/**
 * @openapi
 * /employee:
 *   post:
 *     summary: Creates a new employee
 *     tags: [Employee]
 *     responses:
 *       201:
 *         description: Creates a new employee
 */
export const createEmployee = async (employee: {
    name: string,
    position: string,
    department: string,
    email: string,
    phone: string,
    branchId: string,
}): Promise<Employee> => {
    const newEmployee: Employee = { id: Date.now().toString(), ...employee };
    employees.push(newEmployee);
    return newEmployee;
};

/**
 * @openapi
 * /employee:
 *   get:
 *     summary: Gets all employees
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Gets all employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return employees;
};

/**
 * @openapi
 * /employee/{id}:
 *   get:
 *     summary: Gets an employee by id
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Gets an employee by id
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    const index: number = employees.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`)
    }

    return employees[index];
};

/**
 * @openapi
 * /employee/{id}:
 *   put:
 *     summary: Updates an employee
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Updates an employee
 */
export const updateEmployee = async (id: string, employee: {
    name: string,
    position: string,
    department: string,
    email: string,
    phone: string,
    branchId: string,
}): Promise<Employee> => {
    const index: number = employees.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`)
    }

    employees[index] = { id, ...employee };
    return employees[index];
};

/**
 * @openapi
 * /employee/{id}:
 *   delete:
 *     summary: Deletes an employee
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Deletes an employee
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
 * @openapi
 * /employee/{branch}:
 *   get:
 *     summary: Gets an employee by branch
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Gets an employee by branch
 */
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
    const employeesInBranch = employees.filter((i) => i.branchId);
    if (employeesInBranch.length === 0) {
        throw new Error(`Branch ID ${branchId} not found`);
    }

    return employeesInBranch;
};