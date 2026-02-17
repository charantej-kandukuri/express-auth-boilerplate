import User from '../models/user.model';
import type { Request, Response } from 'express';

// Create User
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message }); 
    }
}

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

// Get single user
export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};