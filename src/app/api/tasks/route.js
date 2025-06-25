import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prismaClient";

export const POST = async (req) => {
  try {
    const { title, description, userId } = await req.json();
    console.log("userid in post ", userId);

    if (!title || !description || !userId) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        user_id: userId,
      },
    });

   const safeData = JSON.parse(
  JSON.stringify(newTodo, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  )
);

return NextResponse.json(
  { data: safeData, message: "Task created successfully" },
  { status: 201 }
);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
