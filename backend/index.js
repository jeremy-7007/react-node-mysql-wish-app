const express = require("express");
const db = require("./db.js");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
const app = express();
const bcrypt = require("bcrypt");

app.use(
  cookieSession({
    name: "session",
    keys: ["Huy"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoute);

app.post("/api/register", (req, res) => {
  const checkEmailQ = "SELECT * FROM users WHERE email = ?";
  const email = req.body.email;
  const name = req.body.name;

  db.query(checkEmailQ, [email], (err, user) => {
    if (err) return res.json(err);

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (user.length != 0) {
        // The user has registered before
        if (user[0].password !== null) {
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          });
        }

        // The user logged in through Google or Facebook before
        const updateUserQ =
          "UPDATE users SET name = ?, password = ? WHERE email = ?";
        const updateVals = [name, hash, email];

        db.query(updateUserQ, updateVals, (err, data) => {
          if (err) return res.json(err);
          return res.status(200).json({
            success: true,
            message: "User account merged",
          });
        });
      }

      const createUserQ =
        "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
      const regData = [name, email, hash];

      db.query(createUserQ, [regData], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json({
          success: true,
          message: "User successfully added",
        });
      });
    });
  });
});

app.get("/api", (req, res) => {
  res.json("Hello, this is the backend!");
});

app.post("/api/wishes", (req, res) => {
  const userId = req.body.userId;
  const q = "SELECT * FROM wishes WHERE userId = ?";
  db.query(q, [userId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/api/wishes/:id", (req, res) => {
  const wishId = req.params.id;
  const q = "SELECT * FROM wishes WHERE id = ?";

  db.query(q, [wishId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/api/wishes/add", (req, res) => {
  const q = "INSERT INTO wishes (`title`, `body`, `userId`) VALUES (?)";
  const values = [req.body.title, req.body.body, req.body.userId];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Wish created successfully");
  });
});

app.delete("/api/wishes/:id", (req, res) => {
  const wishId = req.params.id;
  const q = "DELETE FROM wishes WHERE id = ?";

  db.query(q, [wishId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Wish deleted successfully");
  });
});

app.put("/api/wishes/:id", (req, res) => {
  const wishId = req.params.id;
  const q = "UPDATE wishes SET `title` = ?, `body` = ? WHERE id = ?";
  const values = [req.body.title, req.body.body];

  db.query(q, [...values, wishId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Wish updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
