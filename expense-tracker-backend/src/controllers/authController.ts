import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../repositories/userRepository";

export const register = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const userExists = await findUserByEmail(email);
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
