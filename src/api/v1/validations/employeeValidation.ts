import Joi, { ObjectSchema } from "joi";

export const postEmployeeSchema: ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
    position: Joi.string().required().messages({
        "any.required": "Position is required",
        "string.empty": "Position cannot be empty",
    }),
    department: Joi.string().required().messages({
        "any.required": "Department is required",
        "string.empty": "Department cannot be empty",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty",
    }),
    phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required().messages({
        "string.pattern.base": "Phone number must be in the format ###-###-####",
        "any.required": "Phone is required",
        "string.empty": "Phone cannot be empty",
    }),
    branchId: Joi.string().required().messages({
        "any.required": "Branch ID is required",
        "string.empty": "Branch ID cannot be empty",
    }),
    createdAt: Joi.date(),
});

export const getEmployeeByIdSchema = Joi.object({
    id: Joi.string().required().messages({
            "any.required": "ID is required",
            "string.empty": "Employee ID cannot be empty",
    }),
});

export const putEmployeeSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "ID is required",
        "string.empty": "Employee ID cannot be empty",
    }),
    name: Joi.string().optional().messages({
        "string.empty": "Name cannot be empty",
    }),
    position: Joi.string().optional().messages({
        "string.empty": "Position cannot be empty",
    }),
    department: Joi.string().optional().messages({
        "string.empty": "Department cannot be empty",
    }),
    email: Joi.string().email().optional().messages({
        "string.email": "Email must be a valid email address",
        "string.empty": "Email cannot be empty",
    }),
    phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).optional().messages({
        "string.pattern.base": "Phone number must be in the format ###-###-####",
        "string.empty": "Phone cannot be empty",
    }),
    branchId: Joi.string().optional().messages({
        "string.empty": "Branch ID cannot be empty",
    }),
    updatedAt: Joi.date(),
});

export const deleteEmployeeSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "ID is required",
        "string.empty": "Employee ID cannot be empty",
    }),
});

export const getEmployeesByBranchSchema: ObjectSchema = Joi.object({
    branchId: Joi.string().required().messages({
        "any.required": "Branch ID is required",
        "string.empty": "Branch ID cannot be empty",
    }),
});

export const getEmployeesByDepartmentSchema: ObjectSchema = Joi.object({
    department: Joi.string().required().messages({
        "any.required": "Department is required",
        "string.empty": "Department cannot be empty",
    }),
});
