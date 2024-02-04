import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const helpMailSchema = Joi.object({
  email: Joi.string()
    .required()
    .pattern(emailRegexp)
    .messages({ "any.required": "missing required 'email' field" }),
  comment: Joi.string()
    .required()
    .min(10)
    .messages({ "any.required": "missing required 'comment' field" }),
});

export default helpMailSchema;
