const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();

const app = express();
const port = 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const penyakitData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "penyakit.json"), "utf-8")
);

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");

// MIDDLEWARE

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));
const ensureAuthenticated = require("./middleware/auth");
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// DATABASE CONNECTION

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jangkau_medis",
});

// ROUTE

app.get("/", ensureAuthenticated, (req, res) => {
  if (req.session.user) {
    res.send(`<h2>Selamat datang, ${req.session.user.name}!</h2>
              <a href="/logout">Logout</a>`);
  } else {
    res.redirect("/login");
  }
});

app.get("/daftar-penyakit", ensureAuthenticated, (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  // Kirim seluruh array penyakit ke template
  res.render("daftarPenyakit", { penyakitData });
});

app.get("/penyakit/:nama", ensureAuthenticated, (req, res) => {
  const namaPenyakit = req.params.nama.toLowerCase();

  // Cari penyakit berdasarkan Nama_penyakit (case-insensitive)
  const penyakit = penyakitData.find(
    (p) => p.Nama_penyakit.toLowerCase() === namaPenyakit
  );

  if (!penyakit) {
    return res.status(404).send("Penyakit tidak ditemukan");
  }

  // Render halaman penyakit.ejs dan kirim data
  res.render("penyakit", { penyakit });
});

app.get("/chat", ensureAuthenticated, (req, res) => {
  console.log(genAI);

  res.render("chat.ejs");
});

app.post("/api/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt tidak boleh kosong" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const promptKondisi = `Kamu adalah seorang asisten medis yang bertugas mengidentifikasi penyakit berdasarkan deskripsi kondisi medis yang diberikan.

    [Kondisi Medis]
    ${prompt}

    Instruksi:

    1. Analisis kondisi medis yang diberikan.
    2. Tentukan satu nama penyakit yang paling relevan dan sesuai berdasarkan deskripsi tersebut.
    3. Jawaban harus berupa satu kata atau satu frasa singkat yang merupakan nama penyakit (contoh: Asma, Diabetes Mellitus, Hipertensi).
    4. Jangan sertakan penjelasan tambahan, gejala, atau informasi lain.
    5. Jika tidak dapat menentukan dengan pasti, kembalikan jawaban dengan “Tidak Diketahui”.`;

    const result = await model.generateContent(promptKondisi);

    res.status(200).json({
      success: true,
      prompt: prompt,
      response: result.response.text(),
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      success: false,
      error: "Terjadi kesalahan saat memproses permintaan",
    });
  }
});

app.get("/register", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  res.render("register", { error: null });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  res.render("login", { error: null });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err) => {
      if (err) {
        console.error(err);
        return res.render("register", { error: "Email sudah digunakan!" });
      }
      res.redirect("/");
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        return res.render("login", { error: "User tidak ditemukan!" });
      }

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        req.session.user = user;
        res.redirect("/");
      } else {
        res.render("login", { error: "Password salah!" });
      }
    }
  );
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// CONNECTION

const server = app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
