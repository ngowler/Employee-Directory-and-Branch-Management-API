import { Employee } from "../data/employeeData"
import employees from "../data/employeeData"

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

export const getAllEmployees = async (): Promise<Employee[]> => {
    return employees
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
    const index: number = employees.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`)
    }

    return employees[index];
};

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