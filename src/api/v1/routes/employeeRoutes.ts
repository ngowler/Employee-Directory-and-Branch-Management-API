import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController"

const router: Router = express.Router();

router.post("/", employeeController.createEmployee);

export default router;