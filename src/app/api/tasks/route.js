import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prismaClient";

export const POST = async (req) => {
  try {
    const { title, description, userId, dueDate } = await req.json();
      console.log("date",dueDate);
      
    if (!title || !description || !userId) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }
    let properDueDate;
    if (dueDate && !isNaN(Date.parse(dueDate))) {
      properDueDate = new Date(dueDate); // valid
    } else {
      properDueDate = new Date(); // fallback to today
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        due_date: properDueDate,
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
