/**
 * Employee Controller (employeeController.ts)
 *
 * This file defines functions (controllers) for handling incoming requests related to employees.
 * These functions interact with the employee service (employeeService.ts) to perform the actual
 * logic for CRUD operations on employees.
 */
import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../models/employeeModel"
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * @description Create a new employee.
 * @route POST /employee/
 * @returns {Promise<void>}
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newEmployee: Employee = await employeeService.createEmployee(req.body);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newEmployee, "Employee Created")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get all employees.
 * @route GET /employee/
 * @returns {Promise<void>}
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();

        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employees Retrieved")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get employee by id.
 * @route GET /employee/:id
 * @returns {Promise<void>}
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const employee: Employee = await employeeService.getEmployeeById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                employee,
                `employee with ID "${id}" retrieved successfully`
            )
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Update an existing employee.
 * @route PUT /employee/:id
 * @returns {Promise<void>}
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedEmployee: Employee = await employeeService.updateEmployee(
            req.params.id,
            req.body
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedEmployee, "Employee Updated")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Delete an employee.
 * @route DELETE /employee/:id
 * @returns {Promise<void>}
 */
export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await employeeService.deleteEmployee(req.params.id);

        res.status(HTTP_STATUS.OK).json(successResponse("Employee Deleted"));
    } catch (error) {
        next(error);
    }
};

//Additional Endpoints

/**
 * @description Get employees by branch.
 * @route GET /employee/:branch
 * @returns {Promise<void>}
 */
export const getEmployeesByBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { branchId } = req.params;
        const limit = req.query.limit
            ? parseInt(req.query.limit as string)
            : undefined;

        const employees: Employee[] = await employeeService.getEmployeesByField(
            "branchId",
            branchId,
            limit
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                employees,
                `employees with branch ID "${branchId}" retrieved successfully`
            )
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get employees by department.
 * @route GET /employee/:department
 * @returns {Promise<void>}
 */
export const getEmployeesByDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { department } = req.params;
        const limit = req.query.limit
            ? parseInt(req.query.limit as string)
            : undefined;

        const employees: Employee[] = await employeeService.getEmployeesByField(
            "department",
            department,
            limit
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                employees,
                `employees in department "${department}" retrieved successfully`
            )
        );
    } catch (error) {
        next(error);
    }
};
