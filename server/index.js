const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const multer = require("multer");

const app = express();
const port = 8050;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// ==================== CREATE UPLOADS DIR ====================
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ==================== MIDDLEWARE ====================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));
app.options("*", cors());

// Serve uploads folder as static
app.use("/uploads", express.static(uploadDir));




// ==================== DATABASE ====================
const db = require("./models");







const Role = db.role;
const Message = db.message;


// db.sequelize.sync({ force: true }).then(async () => {
//   await initStates();
//   await initUserRoles();
//   await initCarousel();
//   await initCategories();
//   await initProductAttributes();
//   await initProductAttributeValues();
// });
// ==================== SOCKET.IO ====================
const socketUserMap = new Map(); 
const userSocketMap = new Map(); 

io.on('connection', (socket) => {

  socket.on('login', (userId) => {
    socketUserMap.set(socket.id, userId);
    userSocketMap.set(userId, socket.id);
    console.log(`User ${userId} connected with socket ${socket.id}`);
  });

  socket.on('logout', () => {
    const userId = socketUserMap.get(socket.id);
    if (userId) {
      userSocketMap.delete(userId);
      socketUserMap.delete(socket.id);
      console.log(`User ${userId} disconnected`);
    }
  });

  socket.on('create-message', async (data, callback) => {
    const { senderId, recieverId, message } = data;
    try {
      await Message.create({ senderId, recieverId, message });
      const receiverSocketId = userSocketMap.get(recieverId);
      if (receiverSocketId) io.to(receiverSocketId).emit('receive-message', { senderId, message });
      callback({ status: 'success', message: 'Message sent' });
    } catch (error) {
      console.error(error);
      callback({ status: 'error', message: 'Could not save message' });
    }
  });

  socket.on('disconnect', () => {
    const userId = socketUserMap.get(socket.id);
    if (userId) {
      userSocketMap.delete(userId);
      socketUserMap.delete(socket.id);
      console.log(`User disconnected: ${socket.id}`);
    }
  });
});

// ==================== INIT USER ROLES ====================
async function initUserRoles() {
  await Role.findOrCreate({ where: { id: 1 }, defaults: { name: "user" } });
  await Role.findOrCreate({ where: { id: 2 }, defaults: { name: "admin" } });
  await Role.findOrCreate({ where: { id: 3 }, defaults: { name: "superadmin" } });
  await Role.findOrCreate({ where: { id: 4 }, defaults: { name: "moderator" } });
}

// ==================== MULTER IMAGE UPLOAD ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage, fileFilter: (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images allowed"));
}});

// Image upload route
app.post("/api/upload/image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
    const filePath = `/uploads/${req.file.filename}`;
    res.json({ success: true, path: filePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});
// ==================== ROUTES ====================
require('./routes/user.routes')(app);
require('./routes/usertype.routes')(app);
require('./routes/state.routes')(app);
require('./routes/category.routes')(app);
require('./routes/detailscontent.routes')(app);
require('./routes/company.routes')(app);
require('./routes/imageupload.routes')(app);
require('./routes/carousel.routes')(app);
require('./routes/rating.routes')(app);
require('./routes/payment.routes')(app);
require('./routes/message.routes')(app);
require('./routes/content.routes')(app);
require('./routes/department.routes')(app);
require('./routes/contentSection.routes')(app);
require('./routes/videoRoutes')(app);



// static folder
app.use("/uploads", express.static("uploads"));

// routes
const videoRoutes = require('./routes/videoRoutes');
app.use("/video", videoRoutes);


// ==================== DUMMY CONTENT DB ====================
let contents = [
  {
    id: 1,
    section_name: "home",          // ✅ REQUIRED (home, slider, featured)
    name: "Sample Content",
    sku: "SKU001",
    title: "Title Here",
    description: "<p>Initial Description</p>",
    image_url: "/uploads/sample.jpg",
    sequence: 1,                   // ✅ order inside this section
    active: true,                  // ✅ admin toggle
    category_type: "maternal_health",
    sub_cate_type: "মাতৃত্বের প্রস্তুতি",
    content_type_id: null
  }
];


// GET content by id
app.get("/api/get/content/:id", (req, res) => {
  const item = contents.find(c => c.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, item });
});

// PUT update content
app.put("/api/update/content/:id", (req, res) => {
  const index = contents.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: "Not found" });

  const { name, sku, title, description, image_url, sequence, active, category_type, sub_cate_type } = req.body;
  contents[index] = { ...contents[index], name, sku, title, description, image_url, sequence, active, category_type, sub_cate_type };

  res.json({ success: true, item: contents[index] });
});



// ==================== START SERVER ====================
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
