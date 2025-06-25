import LogoutButton from "@/components/LogoutButton";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { api } from "@/libs/api-calling";
import { supabaseAdmin } from "@/libs/supbaseClient";
import { headers } from "next/headers";
import Link from "next/link";


export default async function Home(req) {
  const headersList = await headers()
  const userId = headersList.get("x-user-id")
//  const user = await api.get(`/getProfile`);
//  console.log(user);
 
  
  

  return (
    <main className="flex flex-col bg-gray-200 items-center min-h-screen  gap-2">
      <nav className="flex  w-full bg-gray-100 shadow-xl  py-8 justify-center gap-6">
        <Link href="/">Home</Link>
        <LogoutButton/>
      </nav>
      <div className="flex flex-col gap-2 pt-[5rem]">
        
      <h1 className="text-center">Todo</h1>
      <TodoForm userId={userId}/>
      <TodoList userId={userId}/>
      </div>
    </main>
  );
}
