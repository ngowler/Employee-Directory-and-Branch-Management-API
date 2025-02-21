import Joi, { ObjectSchema } from "joi";

export const postBranchSchema: ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
    address: Joi.string().required().messages({
        "any.required": "Address is required",
        "string.empty": "Address cannot be empty",
    }),
    phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required().messages({
        "string.pattern": "Phone number must only contain digits",
        "any.required": "Phone is required",
        "string.empty": "Phone cannot be empty",
    }),
    createdAt: Joi.date(),
});

export const getBranchByIdSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "ID is required",
        "string.empty": "Employee ID cannot be empty",
    }),
});

export const putBranchSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "ID is required",
        "string.empty": "ID cannot be empty",
    }),
    name: Joi.string().optional().messages({
        "string.empty": "Name cannot be empty",
    }),
    address: Joi.string().optional().messages({
        "string.empty": "Address cannot be empty",
    }),
    phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).optional().messages({
        "string.pattern": "Phone number must only contain digits",
        "string.empty": "Phone cannot be empty",
    }),
    updatedAt: Joi.date(),
});

export const deleteBranchSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "ID is required",
        "string.empty": "Employee ID cannot be empty",
    }),
});
