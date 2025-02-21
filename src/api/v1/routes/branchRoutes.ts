import express, { Router } from "express";
import * as branchController from "../controllers/branchController"

const router: Router = express.Router();

/**
 * @openapi
 * /branch:
 *   post:
 *     summary: Creates a new branch
 *     tags: [Branch]
 *     responses:
 *       201:
 *         description: Creates a new branch
 */
router.post("/", branchController.createBranch);

/**
 * @openapi
 * /branch:
 *   get:
 *     summary: Gets all branches
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Gets all branches
 */
router.get("/", branchController.getAllBranches);

/**
 * @openapi
 * /branch/{id}:
 *   get:
 *     summary: Gets a branch by id
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Gets a branch by id
 */
router.get("/:id", branchController.getBranchById);

/**
 * @openapi
 * /branch/{id}:
 *   put:
 *     summary: Updates a branch
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Updates a branch
 */
router.put("/:id", branchController.updateBranch);

/**
 * @openapi
 * /branch/{id}:
 *   delete:
 *     summary: Deletes a branch
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Deletes a branch
 */
router.delete("/:id", branchController.deleteBranch);

export default router;