const db = require("../models");
const Content = db.content;

// ================= GET ALL CONTENT =================
exports.GetContent = async (req, res) => {
  try {
    const { category_type } = req.query;
    const whereClause = category_type ? { category_type } : {};

    const data = await Content.findAll({
      where: whereClause,
      order: [["sequence", "DESC"]],
    });

    // Just send response once
    res.json({ success: true, items: data });
  } catch (err) {
    console.error("GET CONTENT ERROR:", err);
    // Ensure headers are not already sent
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

// ================= GET CONTENT BY ID =================
exports.GetContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Content.findByPk(id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    res.json({ success: true, item });
  } catch (err) {
    console.error("GET BY ID ERROR:", err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

// ================= CREATE CONTENT =================
exports.CreateContent = async (req, res) => {
  try {
    const newContent = await Content.create(req.body);
    res.status(201).json({ success: true, item: newContent });
    
  } catch (err) {
    console.error("CREATE CONTENT ERROR:", err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

// ================= UPDATE CONTENT =================
exports.UpdateContent = async (req, res) => {
  try {
    const { id } = req.params;

    // Handle file upload
    let image_url = req.body.image_url;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    // Prepare payload
    const payload = {
      name: req.body.name,
      sku: req.body.sku,
      title: req.body.title,
      description: req.body.description,
      image_url,
      sequence: req.body.sequence || 1,
      category_type: req.body.category_type,
      sub_cate_type: req.body.sub_cate_type,
      active: req.body.active === "true" || req.body.active === true || req.body.active === 1,
    };

    const [updated] = await Content.update(payload, { where: { id } });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    const item = await Content.findByPk(id);
    res.json({ success: true, item });
  } catch (err) {
    console.error("UPDATE CONTENT ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
// ================= DELETE CONTENT =================
exports.DeleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Content.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    res.json({ success: true, message: "Content deleted successfully" });
  } catch (err) {
    console.error("DELETE CONTENT ERROR:", err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};



