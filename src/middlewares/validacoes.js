const messageDisplay = '"displayName" length must be at least 8 characters long';
const messagePassword = '"password" length must be at least 6 characters long';

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

    module.exports = {
        validationLogin,
        validationUserNome,
        validationUserConta,
    };