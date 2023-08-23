const { register, login } = require("../controllers/auth.controller")

const router = require("express").Router()

router.post("/auth/login",login)
router.post("/auth/register",register)

module.exports = router