/**
 * @interface Employee
 * @description Represents an employee object.
 * 
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for an employee
 *         name:
 *           type: string
 *           description: The name of the employee
 *         position:
 *           type: string
 *           description: The position held by the employee
 *         department:
 *           type: string
 *           description: The department of the employee
 *         email:
 *           type: string
 *           description: The email address of the employee
 *         phone:
 *           type: string
 *           description: The phone number of the employee
 *         branchId:
 *           type: string
 *           description: The identifier for the branch associated with the employee
 */
export type Employee = {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: string;
}
