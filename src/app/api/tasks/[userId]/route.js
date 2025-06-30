import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";

// Helper to convert BigInt values in an object to strings recursively
function serializeBigInt(obj) {
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  } else if (obj !== null && typeof obj === "object") {
    const res = {};
    for (const key in obj) {
      const val = obj[key];
      if (typeof val === "bigint") {
        res[key] = val.toString();
      } else if (val instanceof Date) {
        res[key] = val.toISOString(); // ✅ Convert Date to string
      } else if (typeof val === "object" && val !== null) {
        res[key] = serializeBigInt(val);
      } else {
        res[key] = val;
      }
    }
    return res;
  }
  return obj;
}

// export const GET = async (req, { params }) => {
//   try {
//     const { userId } = await params;

//     const todos = await prisma.todo.findMany({
//       where: { user_id: userId },
//       orderBy: {
//         created_at: "desc",
//       },
//     });
  
    
//     const serializedTodos = serializeBigInt(todos);
  
    

//     return NextResponse.json({ data: serializedTodos }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };

export const GET = async (req, { params }) => {
  try {
    const { userId } = await params;

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Get total count
    const totalCount = await prisma.todo.count({
      where: { user_id: userId },
    });

    // Fetch paginated todos
    const todos = await prisma.todo.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    });

    const serializedTodos = serializeBigInt(todos);

    return NextResponse.json({
      data: serializedTodos,
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        pageSize: limit,
      },
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};