import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController"

const router: Router = express.Router();

router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

//Additional Endpoints
router.get("/branch/:branchId", employeeController.getEmployeesByBranch);
router.get("/department/:department", employeeController.getEmployeesByDepartment);

export default router;