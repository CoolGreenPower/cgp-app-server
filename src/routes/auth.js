const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { VAR_SECRET } = require('../modules/ApplicationPropertiesSingleton')
const bcrypt = require('bcryptjs')

router.post('/',
    [check('password', 'Password is required').exists()],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            let user = await User.findOne({ username })

            if (!user) {
                return res.status(400)
                    .json({ errors: [{ msg: 'Username does not exist' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Password' }] });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                VAR_SECRET,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        "token": token,
                        "user": user
                    });
                }
            )
        } catch (err) {
            res.status(500).send(`Server error: ${err.msg}`);
        }
    }
)

module.exports = router