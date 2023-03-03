const { User } = require('../models');

const solicitarLogin = async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    console.log('teste');
    console.log(user);
    if (!user) {
        return { type: 'user', message: 'Invalid fields' };
    }

    return { type: null, message: user };
};

module.exports = {
    solicitarLogin,
};