const db = require(".");
const User = db.user
const Role = db.role;
var bcrypt = require("bcryptjs");

module.exports = async function () {
    await db.sequelize.sync({ force: true });
    await initAdmin()
    await initUserRoles();
};
async function initAdmin() {
    await User.create({
        active:1,
        name: 'Admin',
        user_type: 'normal',
        username: 'admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 8),
        image_url: '',
        dept_id: null,
        address_id: null
    });

// Divisions
await db.division.bulkCreate([
    { id: 1, name: "Dhaka" },
    { id: 2, name: "Chattogram" },
    { id: 3, name: "Khulna" }
]);

// Districts
await db.distric.bulkCreate([
    // Dhaka Division
    { id: 1, name: "Tangail", division_id: 1 },
    { id: 2, name: "Gazipur", division_id: 1 },

    // Chattogram Division
    { id: 3, name: "Cumilla", division_id: 2 },
    { id: 4, name: "Feni", division_id: 2 },

    // Khulna Division
    { id: 5, name: "Jessore", division_id: 3 },
    { id: 6, name: "Satkhira", division_id: 3 }
]);

// Upazilas
await db.upazila.bulkCreate([
    // Tangail
    { name: "Sakhipur", district_id: 1 },
    { name: "Ghatail", district_id: 1 },
    { name: "Kalihati", district_id: 1 },

    // Gazipur
    { name: "Sreepur", district_id: 2 },
    { name: "Kaliakair", district_id: 2 },
    { name: "Kapasia", district_id: 2 },

    // Cumilla
    { name: "Daudkandi", district_id: 3 },
    { name: "Burichang", district_id: 3 },
    { name: "Chandina", district_id: 3 },

    // Feni
    { name: "Fulgazi", district_id: 4 },
    { name: "Parshuram", district_id: 4 },
    { name: "Sonagazi", district_id: 4 },

    // Jessore
    { name: "Abhaynagar", district_id: 5 },
    { name: "Bagherpara", district_id: 5 },
    { name: "Jhikargacha", district_id: 5 },

    // Satkhira
    { name: "Assasuni", district_id: 6 },
    { name: "Debhata", district_id: 6 },
    { name: "Kaliganj", district_id: 6 }
]);
}

async function initUserRoles() {
    await Role.bulkCreate([
        { user_id: 1, name: "user" },
        { user_id: 1, name: "admin" },
        { user_id: 1, name: "superadmin" },
        { user_id: 1, name: "moderator" },
    ]);
}