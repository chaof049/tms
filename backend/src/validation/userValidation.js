import Joi from "joi";

let userValidation = Joi.object()
  .keys({
    fullName: Joi.string().required().min(3).max(15).messages({
      "string.base": "name must be string",
      "any.required": "name is required",
      "string.min": "name must be at least 3 characters long",
      "string.max": "name must be at most 15 characters long",
    }),
    email: Joi.string()
      .required()
      .custom((value, msg) => {
        let validEmail = value.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        );
        if (validEmail) {
          return true;
        } else {
          return msg.message("email is not valid");
        }
      }),
    password: Joi.string()
      .required()
      .custom((value, msg) => {
        let validPassword = value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
        );
        if (validPassword) {
          return true;
        } else {
          return msg.message(
            "password must be at least one uppercase, one lowercase, one number, one symbol, minimum 8 characters"
          );
        }
      }),
    phoneNumber: Joi.number()
      .required()
      .custom((value, msg) => {
        let strValue = String(value);
        if (strValue.length !== 10) {
          throw new Error("phone number must be exact 10 character long");
        }
      }),
    role: Joi.string().valid("superadmin", "admin", "user").required(),
  })
  .unknown(false);

export default userValidation;
