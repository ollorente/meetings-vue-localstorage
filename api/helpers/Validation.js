/* VALIDATION */
const Joi = require('@hapi/joi')

/* Register Validation */
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(256).min(3),
    username: Joi.string().max(30).min(3).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'org', 'co']
      }
    }),
    password: Joi.string().max(255).min(3).required(),
    phone: Joi.string().max(20).min(6),
    photoURL: Joi.string()
  })
  return schema.validate(data)
}

/* Login Validation */
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'org', 'co']
      }
    }),
    password: Joi.string().max(255).min(3).required()
  })
  return schema.validate(data)
}

exports.Validation = {
  loginValidation,
  registerValidation
}
