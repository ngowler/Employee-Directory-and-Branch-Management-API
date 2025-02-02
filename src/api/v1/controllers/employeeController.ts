import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../data/employeeData"

/**
 * @openapi
 * /:
 *   post:
 *     summary: Creates a new employee
 *     tags: [Employee Controller]
 *     responses:
 *       201:
 *         description: Creates a new employee
 */
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

/**
 * @openapi
 * /:
 *   get:
 *     summary: Gets all employees
 *     tags: [Employee Controller]
 *     responses:
 *       200:
 *         description: Gets all employees
 */
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

/**
 * @openapi
 * /{id}:
 *   get:
 *     summary: Gets an employee by id
 *     tags: [Employee Controller]
 *     responses:
 *       200:
 *         description: Gets an employee by id
 */
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

/**
 * @openapi
 * /{id}:
 *   put:
 *     summary: Updates an employee
 *     tags: [Employee Controller]
 *     responses:
 *       200:
 *         description: Updates an employee
 */
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

/**
 * @openapi
 * /{id}:
 *   delete:
 *     summary: Deletes an employee
 *     tags: [Employee Controller]
 *     responses:
 *       200:
 *         description: Deletes an employee
 */
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