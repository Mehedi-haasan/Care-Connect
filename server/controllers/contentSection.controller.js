const db = require("../models");
const ContentSection = db.content;

// ==================== ADMIN: GET ALL (active + inactive) ====================
exports.GetContentSectionsAdmin = async (req, res) => {
  try {
    const { section_name } = req.query;
    const whereClause = section_name ? { section_name } : {};

    const items = await ContentSection.findAll({
      where: whereClause,
      order: [["sequence", "ASC"]],
    });

    res.json({ success: true, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== CLIENT: GET ONLY ACTIVE CONTENT ====================
exports.GetContentSectionsClient = async (req, res) => {
  try {
    const { section_name } = req.query;
    const whereClause = { active: true };
    if (section_name) whereClause.section_name = section_name;

    const items = await ContentSection.findAll({
      where: whereClause,
      order: [["sequence", "ASC"]],
      attributes: [
        "id",
        "name",
        "title",
        "description",
        "image_url",
        "sequence",
        "category_type",
        "sub_cate_type",
      ],
    });

    res.json({ success: true, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== ADMIN: UPDATE ====================
exports.UpdateContentSection = async (req, res) => {
  try {
    const { id } = req.params;

    // update content fields + active + position
    const [updated] = await ContentSection.update(req.body, { where: { id } });

    if (!updated)
      return res.status(404).json({ success: false, message: "Not found" });

    const item = await ContentSection.findByPk(id);
    res.json({ success: true, item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== ADMIN: DELETE ====================
exports.DeleteContentSection = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ContentSection.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==================== ADMIN: UPDATE SEQUENCE / POSITION ====================
exports.UpdateSequence = async (req, res) => {
  try {
    const { items } = req.body; // [{ id, sequence }]
    const promises = items.map((i) =>
      ContentSection.update({ sequence: i.sequence }, { where: { id: i.id } })
    );
    await Promise.all(promises);
    res.json({ success: true, message: "Sequence updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
