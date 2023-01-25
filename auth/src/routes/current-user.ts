import express from "express";
const router = express.Router();

router.get('/api/users/currentuser', async (req, res) => {
  res.send(`Hello from Google Cloud! ${new Date()}`)
});

export { router as currentUserRouter }