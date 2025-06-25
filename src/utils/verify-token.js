import { jwtVerify } from "jose";

// Convert my supabase jwt  secret strings to Uint8Array
const encoder = new TextEncoder();
export const secret = encoder.encode(process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET);

export const verifyTokens = async (token) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
};

