export const cookieConfigFn = (time) => {
  return {
    httpOnly: true,
    secure:process.env.NODE_ENV === "production"? true:false,
    path:"/",
    sameSite:"lax",
    maxAge:time,
  }
}
