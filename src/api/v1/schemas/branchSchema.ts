import Joi, { ObjectSchema } from "joi";

export const branchSchema: ObjectSchema = Joi.object({
    id: Joi.string().optional().messages({
        "any.required": "ID is required",
        "string.empty": "ID cannot be empty"
    }),
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
    address: Joi.string().required().messages({
        "any.required": "Address is required",
        "string.empty": "Address cannot be empty",
    }),
    phone: Joi.string().pattern(/^[0-9]+$/).required().messages({
        "string.pattern": "Phone number must only contain digits",
        "any.required": "Phone is required",
        "string.empty": "Phone cannot be empty",
    }),
});
