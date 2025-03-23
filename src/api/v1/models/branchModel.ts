/**
 * @interface Branch
 * @description Represents a branch object.
 * 
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a branch
 *         name:
 *           type: string
 *           description: The name of the branch
 *         address:
 *           type: string
 *           description: The address of the branch
 *         phone:
 *           type: string
 *           description: The phone number of the branch
 */
export type Branch = {
    id: string;
    name: string;
    address: string;
    phone: string;
};
