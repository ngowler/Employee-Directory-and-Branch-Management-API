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
 *     summary: Create a new employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input provided
 *       500:
 *         description: Server error
 */
router.post("/", validateRequest(postEmployeeSchema), employeeController.createEmployee);

/**
 * @route GET /employee
 * @description Get all employees.
 * 
 * @openapi
 * /employee:
 *   get:
 *     summary: Retrieve a list of employees
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employees'
 *       500:
 *         description: Server error
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @route GET /employee/:id
 * @description Get employee by id.
 *
 * @openapi
 * /employee/{id}:
 *   get:
 *     summary: Get employee by id
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to retrieve
 *     responses:
 *       200:
 *         description: Employee details matching the ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found with the specified ID
 *       500:
 *         description: Server error
 */
router.get("/:id", validateRequest(getEmployeeByIdSchema), employeeController.getEmployeeById);

/**
 * @route PUT /employee/:id
 * @description Update an existing employee.
 * 
 * @openapi
 * /employee/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input provided
 *       404:
 *         description: Employee not found with the specified ID
 *       500:
 *         description: Server error
 */
router.put("/:id", validateRequest(putEmployeeSchema), employeeController.updateEmployee);

/**
 * @route DELETE /employee/:id
 * @description Delete a employee.
 *
 * @openapi
 * /employee/{id}:
 *   delete:
 *     summary: Delete a employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to delete
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found with the specified ID
 *       500:
 *         description: Server error
 */
router.delete("/:id", validateRequest(deleteEmployeeSchema), employeeController.deleteEmployee);

/**
 * @route GET /employee/branch/:branchId
 * @description Get employees by branchId.
 *
 * @openapi
 * /employee/branch/{branchId}:
 *   get:
 *     summary: Get employees by branch ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the branch to retrieve employees from
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       404:
 *         description: No employees found for the specified branch ID
 *       500:
 *         description: Server error
 */
router.get("/branch/:branchId", validateRequest(getEmployeesByBranchSchema), employeeController.getEmployeesByBranch);

/**
 * @route GET /employee/department/:department
 * @description Get employees by department.
 *
 * @openapi
 * /employee/department/{department}:
 *   get:
 *     summary: Get employees by department
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: department
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the department to retrieve employees from
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       404:
 *         description: No employees found for the specified department
 *       500:
 *         description: Server error
 */
router.get("/department/:department", validateRequest(getEmployeesByDepartmentSchema), employeeController.getEmployeesByDepartment);

export default router;
