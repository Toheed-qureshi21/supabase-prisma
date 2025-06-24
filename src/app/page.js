import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { supabase } from "@/libs/supbaseClient";
import { headers } from "next/headers";

export default async function Home(req) {
  const headersList = await headers()
  const userId = headersList.get("x-user-id")
  
  return (
    <main className="min-h-screen min-w-screen flex flex-col gap-2 items-center pt-[5rem]">
      <h1>Todo</h1>
      <TodoForm userId={userId}/>
      <TodoList userId={userId}/>
    </main>
  );
}
