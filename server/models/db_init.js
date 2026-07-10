const db = require(".");
const User = db.user
const Role = db.role;

module.exports = async function () {
    await db.sequelize.sync({ force: true });
    await initAdmin()
    await initUserRoles();
};
async function initAdmin() {
    await User.create({
        first_name: 'Admin',
        last_name: '',
        username: 'admin',
        email: 'admin@gmail.com',
        password: '123456',
        image_url: '',
        dept_id: false,
        address_id: false
    });
}

async function initUserRoles() {
    await Role.bulkCreate([
        { user_id: 1, name: "user" },
        { user_id: 2, name: "admin" },
        { user_id: 3, name: "superadmin" },
        { user_id: 4, name: "moderator" },
    ]);
}