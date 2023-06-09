const messageDisplay = '"displayName" length must be at least 8 characters long';
const messagePassword = '"password" length must be at least 6 characters long';
const jwt = require('jsonwebtoken');

const validationLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    
    next();
    };

    const validationUserNome = (req, res, next) => {
        const { displayName } = req.body;

        if (!displayName || displayName.length <= 7) {
            return res.status(400).json({ message: messageDisplay });
        }

        next();
    };

    const validationUserConta = (req, res, next) => {
        const { password, email } = req.body;
        const regex = /\S+@\S+\.\S+/;

        if (!password || password.length <= 5) {
            return res.status(400).json({ message: messagePassword });
        }

        if (!email || regex.test(email) === false) {
            return res.status(400).json({ message: '"email" must be a valid email' });
        }

        next();
    };

    const validateToken = (req, res, next) => {
        const secret = process.env.JWT_SECRET || 'secretJWT';
        const { authorization } = req.headers;
        if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
        }

        try {
        const decode = jwt.verify(authorization, secret);
        req.user = decode;
        next();
        } catch (e) {
      return res.status(401).json({ message: 'Expired or invalid token' });
        }
    };

    const validateId = (req, res, next) => {
        const { id } = req.params;
        if (!id) return res.status(404).json({ message: 'User does not exist' });
        next();
    };

    const validateName = (req, res, next) => {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: '"name" is required' });
        next();
    };

    const validatePost = (req, res, next) => {
        const { title, content, categoryIds } = req.body;
        if (title.length === 0 || content === 0 || categoryIds.length === 0) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }

 next();
    };

    const validateUpdate = (req, res, next) => {
        const { title, content } = req.body;
        if (title.length === 0 || content === 0) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }

 next();
    };

    module.exports = {
        validationLogin,
        validationUserNome,
        validationUserConta,
        validateToken,
        validateId,
        validateName,
        validatePost,
        validateUpdate,
    };