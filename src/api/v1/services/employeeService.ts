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