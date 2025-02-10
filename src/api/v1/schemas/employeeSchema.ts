import Joi, { ObjectSchema } from "joi";

export const employeeSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .optional()
        .messages({ "string.empty": "Employee ID cannot be empty" }),
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
    position: Joi.string().required().messages({
        "any.required": "Position is required",
        "string.empty": "Description cannot be empty",
    }),
    department: Joi.number().required().messages({
        "any.required": "Department is required",
        "string.empty": "Department cannot be empty",
    }),
    email: Joi.string().required().messages({
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty",
    }),
    phone: Joi.string().required().messages({
        "any.required": "Phone is required",
        "string.empty": "Phone cannot be empty",
    }),
    branchId: Joi.string().required().messages({
        "any.required": "Branch ID is required",
        "string.empty": "Branch ID cannot be empty",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});
