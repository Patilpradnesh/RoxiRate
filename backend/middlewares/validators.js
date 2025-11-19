const { body } = require("express-validator");
const { validationResult } = require("express-validator");

exports.signupValidation = [
  body("name")
    .isLength({ min: 20, max: 60 })
    .withMessage("Name must be 20–60 characters"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("address")
    .optional()
    .isLength({ max: 400 })
    .withMessage("Address must be under 400 characters"),

  body("password")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/)
    .withMessage(
      "Password must be 8–16 chars, include at least one uppercase and one special character"
    )
];


exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Form validation failed",
      errors: errors.array()
    });
  }

  next();
};

exports.adminUserValidation = [
  body("name")
    .isLength({ min: 20, max: 60 })
    .withMessage("Name must be 20–60 characters"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("address")
    .optional()
    .isLength({ max: 400 })
    .withMessage("Address must be under 400 characters"),

  body("password")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/)
    .withMessage(
      "Password must be 8–16 chars, include at least one uppercase and one special character"
    ),

  body("role")
    .isIn(["admin", "user", "owner"])
    .withMessage("Role must be admin / user / owner"),
];

