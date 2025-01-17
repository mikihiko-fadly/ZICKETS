import express from "express";
import { pool } from "../db.js";
import cors from "cors";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// Public Routes (No authentication required)
app.post("/api/login", async (req, res) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    req.body.username,
  ]);
  if (result.rows.length > 0) {
    const user = result.rows[0];
    if (await argon2.verify(user.password, req.body.password)) {
      const token = jwt.sign(user, process.env.SECRET_KEY);
      res.json({
        token,
        message: "Login berhasil.",
      });
    } else {
      res.status(401).send("Kata sandi salah.");
    }
  } else {
    res.status(404).send(`Pengguna dengan nama pengguna ${req.body.username} tidak ditemukan.`);
  }
});

app.post("/api/register", async (req, res) => {
  const hash = await argon2.hash(req.body.password);
  await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [req.body.username, hash]
  );
  res.send("Pendaftaran berhasil");
});

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.split(" ")[1];
    try {
      req.user = jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (error) {
      res.status(401).send("Token tidak valid.");
    }
  } else {
    res.status(401).send("Anda belum login (tidak ada otorisasi).");
  }
}

// Protected Routes (Authentication required)
app.post("/api/tickets", authenticateToken, async (req, res) => {
  const result = await pool.query(
    "INSERT INTO tickets (name, price, imageurl) VALUES ($1, $2, $3) RETURNING *",
    [req.body.name, req.body.price, req.body.imageurl]
  );
  res.json(result.rows[0]);
});

app.get("/api/tickets", async (req, res) => {
  const result = await pool.query("SELECT * FROM tickets");
  res.json(result.rows);
});

app.put("/api/tickets/:id", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE tickets SET name = $1, price = $2, imageurl = $3 WHERE id = $4",
      [req.body.name, req.body.price, req.body.imageurl, req.params.id]
    );
    
    if (result.rowCount === 0) {
      // Jika tidak ada baris yang diperbarui, mungkin ID tidak ditemukan
      return res.status(404).send("Ticket tidak ditemukan");
    }

    res.send("Ticket berhasil diperbarui");
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).send("Terjadi kesalahan saat memperbarui tiket");
  }
});

app.put("/api/tickets/:id", authenticateToken, async (req, res) => {
  try {
    const { name, price, imageurl } = req.body;
    const { id } = req.params;

    // Update ticket di tabel tickets
    const result = await pool.query(
      "UPDATE tickets SET name = $1, price = $2, imageurl = $3 WHERE id = $4 RETURNING *",
      [name, price, imageurl, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Ticket tidak ditemukan");
    }

    const updatedTicket = result.rows[0];

    // Insert data ke tabel riwayatUpdate
    await pool.query(
      "INSERT INTO riwayatUpdate (user_id, ticket_id, name, price, imageurl) VALUES ($1, $2, $3, $4, $5)",
      [req.user.id, updatedTicket.id, name, price, imageurl]
    );

    res.send("Ticket berhasil diperbarui");
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).send("Terjadi kesalahan saat memperbarui tiket");
  }
});




app.delete("/api/tickets/:id", authenticateToken, async (req, res) => {
  await pool.query("DELETE FROM tickets WHERE id= $1", [req.params.id]);
  res.send("Tiket berhasil dihapus");
});

app.listen(3000, () => console.log("Server berhasil dijalankan"));
