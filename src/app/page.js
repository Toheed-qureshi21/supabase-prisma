import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { supabase } from "@/libs/supbaseClient";
import { headers } from "next/headers";

export default async function Home(req) {
  const headersList = await headers()
  const userId = headersList.get("x-user-id")
  
  return (
    <main className="flex h-screen flex-col gap-2 items-center pt-[5rem] bg-zinc-950 overflow-hidden">
      <h1 className="text-white">Todo</h1>
      <TodoForm userId={userId}/>
      <TodoList userId={userId}/>
    </main>
  );
}
