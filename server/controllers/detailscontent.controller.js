const db = require("../models");
const Content = db.content;

exports.getDetails = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("Id query:", id);

    const whereClause = id ? { id } : {};

    const data = await Content.findAll({
      where: whereClause,
      limit: 1,
    });

    res.status(200).send({
      success: true,
      items: data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
