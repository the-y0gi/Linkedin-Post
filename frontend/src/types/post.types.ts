export type VoiceType =
  | "contrarian"
  | "authoritative"
  | "friendly"
  | "motivational";

export type LengthType = "short" | "medium" | "long";

export interface GeneratePostPayload {
  voice: VoiceType;
  audience: string;
  topic: string;
  length?: LengthType;
}

export interface PostResponse {
  post: string;
}
