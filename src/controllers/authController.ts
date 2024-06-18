import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.getByColumns({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    const user = await User.getById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
