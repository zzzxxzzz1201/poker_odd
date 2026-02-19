const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

const pokerValidation = (data) => {
  const cardPattern = /^[2-9TJQKA][hdcs]$/;

  const schema = Joi.object({
    hands: Joi.array()
      .items(
        Joi.array()
          .items(Joi.string().pattern(cardPattern))
          .length(2)
      )
      .min(2)
      .max(6)
      .required(),
    board: Joi.array()
      .items(Joi.string().pattern(cardPattern))
      .custom((value, helpers) => {
        if (![0, 3, 4, 5].includes(value.length)) {
          return helpers.error("any.invalid");
        }
        return value;
      })
      .default([]),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation, pokerValidation };
