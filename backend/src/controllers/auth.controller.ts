import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/user.repository";
import { hashPassword, verifyPassword, createAccessToken } from "../utils/auth";
import { validateRegisterBody, validateLoginBody } from "../validators";
import { OAuth2Client } from "google-auth-library";
import { config } from "../config";
import crypto from "crypto";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const valError = validateRegisterBody(req.body);
      if (valError) {
        return res.status(400).json({ detail: valError });
      }

      const { email, password, name } = req.body;

      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ detail: "Email already registered" });
      }

      const hashedPassword = await hashPassword(password);
      const user = await userRepository.create({
        email,
        name,
        hashed_password: hashedPassword,
      });

      return res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        is_active: user.is_active,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Login can receive OAuth2PasswordRequestForm which is urlencoded username/password
      const valError = validateLoginBody(req.body);
      if (valError) {
        return res.status(400).json({ detail: valError });
      }

      const { username, password } = req.body;

      const user = await userRepository.findByEmail(username);
      if (!user) {
        return res.status(401).json({ detail: "Incorrect email or password" });
      }

      const isValid = await verifyPassword(password, user.hashed_password);
      if (!isValid) {
        return res.status(401).json({ detail: "Incorrect email or password" });
      }

      const accessToken = createAccessToken(user.email);

      return res.status(200).json({
        access_token: accessToken,
        token_type: "bearer",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          is_active: user.is_active,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { credential } = req.body;
      if (!credential) {
        return res.status(400).json({ detail: "Google credential is required" });
      }

      if (!config.googleClientId) {
        return res
          .status(500)
          .json({ detail: "Google OAuth client ID is not configured on the server" });
      }

      const client = new OAuth2Client(config.googleClientId);
      let ticket;
      try {
        ticket = await client.verifyIdToken({
          idToken: credential,
          audience: config.googleClientId,
        });
      } catch (err: any) {
        return res.status(401).json({ detail: "Invalid Google token" });
      }

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        return res.status(400).json({ detail: "Email not provided by Google" });
      }

      const email = payload.email;
      const name = payload.name || email.split("@")[0];

      let user = await userRepository.findByEmail(email);

      if (!user) {
        // Create user with a secure random password
        const randomPassword = crypto.randomBytes(32).toString("hex");
        const hashedPassword = await hashPassword(randomPassword);
        user = await userRepository.create({
          email,
          name,
          hashed_password: hashedPassword,
        });
      }

      const accessToken = createAccessToken(user.email);

      return res.status(200).json({
        access_token: accessToken,
        token_type: "bearer",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          is_active: user.is_active,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
