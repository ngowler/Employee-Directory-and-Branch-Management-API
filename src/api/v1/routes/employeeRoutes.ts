import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController"

const router: Router = express.Router();

router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);

export default router;