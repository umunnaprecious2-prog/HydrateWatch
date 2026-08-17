import { Request } from "express";

export interface TokenPayload {
  sub: string;
  exp?: number;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  is_active: boolean;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: UserResponse;
}

export interface SensorReadingResponse {
  id: number;
  mode: string;
  temperature: number;
  pressure: number;
  flow_rate: number;
  timestamp: Date;
  hydrate_risk: number;
}

export interface FeedItem {
  source_id: string;
  source_type: string;
  source_name: string;
  source_url: string;
  title: string;
  content: string;
  author?: string;
  published_at?: Date | string;
  tags?: string[];
}
