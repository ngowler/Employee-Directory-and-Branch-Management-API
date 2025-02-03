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
    if (!employee.name || !employee.position || !employee.department || !employee.email || !employee.phone || !employee.branchId) {
        throw new Error("All fields (name, position, department, email, phone, branchId) must be provided");
    }
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
 * /employee/branch/{branchId}:
 *   get:
 *     summary: Gets an employee by branch
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Gets an employee by branch
 */
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
    const employeesInBranch: Employee[] = employees.filter((i) => i.branchId === branchId);
    if (employeesInBranch.length === 0) {
        throw new Error(`Branch ID ${branchId} not found`);
    }

    return employeesInBranch;
};

/**
 * @openapi
 * /employee/department/{department}:
 *   get:
 *     summary: Gets an employee by department
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Gets an employee by department
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