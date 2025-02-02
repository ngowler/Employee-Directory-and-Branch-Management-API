import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../data/employeeData"

export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newEmployee: Employee = await employeeService.createEmployee(req.body);

        res.status(201).json({ message: "Employee Created", data: newEmployee });
    } catch (error) {
        next(error);
    }
};

export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();

        res.status(200).json({ message: "Employees Retrieved", data: employees });
    } catch (error) {
        next(error);
    }
};

export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employee: Employee = await employeeService.getEmployeeById(req.params.id);

        res.status(200).json({ message: "Employee Retrieved", data: employee });
    } catch (error) {
        next(error);
    }
};

export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedEmployee: Employee = await employeeService.updateEmployee(req.params.id, req.body);

        res.status(200).json({ message: "Employee Updated", data: updatedEmployee });
    } catch (error) {
        next(error);
    }
};

export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await employeeService.deleteEmployee(req.params.id);

        res.status(200).json({ message: "Employee Deleted" });
    } catch (error) {
        next(error);
    }
};

//Additional Endpoints
export const getEmployeesByBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employeesInBranch: Employee[] = await employeeService.getEmployeesByBranch(req.params.id);

        res.status(200).json({ message: "Employees Retrieved", data: employeesInBranch });
    } catch (error) {
        next(error);
    }
};