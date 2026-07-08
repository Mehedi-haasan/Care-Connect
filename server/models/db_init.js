const db = require(".");

const Role = db.role;

module.exports = async function () {
    await db.sequelize.sync({ force: true });

    await initUserRoles();
};

async function initUserRoles() {
    await Role.bulkCreate([
        { id: 1, name: "user" },
        { id: 2, name: "admin" },
        { id: 3, name: "superadmin" },
        { id: 4, name: "moderator" },
    ]);
}