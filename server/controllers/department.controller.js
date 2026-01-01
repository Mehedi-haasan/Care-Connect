const { where } = require("sequelize");
const db = require("../models");
const Department = db.department;


// CREATE a new Department
exports.createDepartment = async (req, res) => {
    try {
        const { name, image_url, active } = req.body;

        // Basic validation (optional but recommended)
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Department name is required"
            });
        }

        const newDepartment = await Department.create({
            name,
            image_url: image_url || null,  
            active: active ?? true         
        });

        res.status(201).json({
            success: true,
            message: "Department created successfully"
        });

    } catch (error) {
        console.error("Error creating department:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create department",
            error: error.message
        });
    }
};

// GET all Departments (active ones by default)
exports.getAllDepartments = async (req, res) => {
    try {
        const { includeInactive } = req.query; // optional query param

        const where = {};
        if (includeInactive !== 'true') {
            where.active = true; // only active by default
        }

        const departments = await Department.findAll({
            where,
            order: [['name', 'ASC']], // optional: sort by name
            attributes: ['id', 'name', 'image_url', 'active'] // explicit fields
        });

        res.status(200).json({
            success: true,
            count: departments.length,
            data: departments
        });

    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch departments",
            error: error.message
        });
    }
};

// Optional: GET single Department by ID
exports.getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findByPk(id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        res.status(200).json({
            success: true,
            data: department
        });

    } catch (error) {
        console.error("Error fetching department:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch department",
            error: error.message
        });
    }
};