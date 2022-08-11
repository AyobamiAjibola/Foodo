import JWT from 'jsonwebtoken';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: resolve(__dirname, "../.env") });

  export const jwtGenerator = (id: string, isAdmin: boolean, role: string ) => {
  const payload = {
    user: id,
    admin: isAdmin,
    role: role
  };
  return JWT.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: "3d" });
};

export const jwtGen = (id: string, vendorId: string, isVendor: boolean ) => {
  const payload = {
    user: id,
    vendorId: vendorId,
    vendorStatus: isVendor,
  };
  return JWT.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: "3d" });
};

export const jwtUser = (id: string, email: string) => {
  const payload = {
    user: id,
    userEmail: email
  };
  return JWT.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: "3d" });
};

export const jwtRider = (id: string, email: string, isAvailable: boolean) => {
  const payload = {
    user: id,
    rider: email,
    isRider: isAvailable
  };
  return JWT.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: "3d" });
};