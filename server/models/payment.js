module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        amount: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.0,
            allowNull: false
        },
        currency: {
            type: Sequelize.STRING,
            defaultValue: "BDT"
        },
        payment_method: {
            type: Sequelize.ENUM(
                "cash",
                "card",
                "bkash",
                "nagad",
                "rocket",
                "bank_transfer",
                "online"
            ),
            allowNull: false
        },
        payment_status: {
            type: Sequelize.ENUM(
                "pending",
                "paid",
                "failed",
                "cancelled",
                "refunded"
            ),
            defaultValue: "pending"
        },
        transaction_id: {
            type: Sequelize.STRING,
            allowNull: true
        },
        gateway: {
            type: Sequelize.STRING,
            allowNull: true
        },
        paid_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        notes: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    Payment.associate = (models) => {
        Payment.hasMany(models.appoinment, {
            foreignKey: "payment_id",
            as: "appointments"
        });
    };

    return Payment;
};