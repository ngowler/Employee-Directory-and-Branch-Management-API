/**
 * Employee Routes (employeeRoutes.ts)
 *
 * This file defines the routes for managing employees in our application.
 * It uses the Express framework for routing and makes calls to the employee controller
 * (employeeController.ts) to handle the logic for each route.
 */
import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController"
import { validateRequest } from "../middleware/validate";
import {
    postEmployeeSchema,
    getEmployeeByIdSchema,
    putEmployeeSchema,
    deleteEmployeeSchema,
    getEmployeesByBranchSchema,
    getEmployeesByDepartmentSchema, }
    from "../validations/employeeValidation";

const router: Router = express.Router();

/**
 * @route POST /employee
 * @description Create a new employee.
 * 
 * @openapi
 * /employee:
 *   post:
 *     summary: Creates a new employee
 *     tags: [Employee]
 *     responses:
 *       201:
 *         description: Creates a new employee
 */
router.post("/", validateRequest(postEmployeeSchema), employeeController.createEmployee);

/**
 * @route GET /employee
 * @description Get all employees.
 * 
 * @openapi
 * /employee:
 *   get:
 *     summary: Gets all employees
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Gets all employees
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @route GET /employee/:id
 * @description Get employee by id.
 *
 * @openapi
 * /employee/{id}:
 *   get:
 *     summary: Gets an employee by id
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Gets an employee by id
 */
router.get("/:id", validateRequest(getEmployeeByIdSchema), employeeController.getEmployeeById);

/**
 * @route PUT /employee/:id
 * @description Update an existing employee.
 * 
 * @openapi
 * /employee/{id}:
 *   put:
 *     summary: Updates an employee
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Updates an employee
 */
router.put("/:id", validateRequest(putEmployeeSchema), employeeController.updateEmployee);

/**
 * @route DELETE /:id
 * @description Delete an employee.
 *
 * @openapi
 * /employee/{id}:
 *   delete:
 *     summary: Deletes an employee
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Deletes an employee
 */
router.delete("/:id", validateRequest(deleteEmployeeSchema), employeeController.deleteEmployee);

//Additional Endpoints

/**
 * @route GET /employee/:branchId
 * @description Get employees by branchId.
 *
 * @openapi
 * /employee/branch/{branchId}:
 *   get:
 *     summary: Gets an employee by branch
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Gets an employee by branch
 */
router.get("/branch/:branchId", validateRequest(getEmployeesByBranchSchema), employeeController.getEmployeesByBranch);

/**
 * @route GET /employee/:department
 * @description Get employees by department.
 *
 * @openapi
 * /employee/department/{department}:
 *   get:
 *     summary: Gets an employee by department
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: Gets an employee by department
 */
router.get("/department/:department", validateRequest(getEmployeesByDepartmentSchema), employeeController.getEmployeesByDepartment);

export default router;
