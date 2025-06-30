// Helper to convert BigInt values in an object to strings recursively
export function serializeBigInt(obj) {
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  } else if (obj !== null && typeof obj === "object") {
    const res = {};
    for (const key in obj) {
      const val = obj[key];
      if (typeof val === "bigint") {
        res[key] = val.toString();
      } else if (typeof val === "object" && val !== null) {
        res[key] = serializeBigInt(val);
      } else {/*  */
        res[key] = val;
      }
    }
    return res;
  }
  return obj;
}
