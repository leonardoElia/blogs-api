const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const secret = process.env.JWT_SECRET || 'secretJWT';

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };
    
    const token = jwt.sign({ data: { userId: user.dataValues.id } }, secret, jwtConfig);
    return token;
};

module.exports = generateToken;
