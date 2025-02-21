import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController"

const router: Router = express.Router();

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
router.post("/", employeeController.createEmployee);

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
router.get("/", employeeController.getAllEmployees);

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
router.get("/:id", employeeController.getEmployeeById);

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
router.put("/:id", employeeController.updateEmployee);

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
router.delete("/:id", employeeController.deleteEmployee);

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
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);

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
router.get("/department/:department", employeeController.getEmployeesByDepartment);

export default router;
