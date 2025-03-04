import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user";

export const createUser = async (email: string, password: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create({ email, password });
  return await userRepository.save(user);
};

export const findUserByEmail = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.findOneBy({ email });
};
