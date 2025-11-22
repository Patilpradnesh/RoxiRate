const { body } = require("express-validator");
const { validationResult } = require("express-validator");

// USER SIGNUP VALIDATION
exports.signupValidation = [
  body("name")
    .isLength({ min: 3, max: 60 })
    .withMessage("Name must be 3–60 characters"),

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
];


// SHARED VALIDATION RESULT HANDLER
exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Form validation failed",
      errors: errors.array(),
    });
  }

  next();
};


// ADMIN USER CREATION VALIDATION
exports.adminUserValidation = [
  body("name")
    .isLength({ min: 3, max: 60 })
    .withMessage("Name must be 3–60 characters"),

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
