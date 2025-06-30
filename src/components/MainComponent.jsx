

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import SideBar from "./SideBar";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function MainComponent({user}) {
    return(
        <main className="flex flex-col bg-gray-200  min-h-screen  gap-2">
      <nav className="flex  w-full bg-gray-100 shadow-xl  py-8 justify-center gap-6">
        <Link href="/">Home</Link>
        <LogoutButton/>
      </nav>
      <div className="flex gap-[8rem]">
        <SideBar user={user}/>
      <div className="flex flex-col gap-2 pt-[5rem]">
        
      <h1 className="text-center">Todo</h1>
      <TodoForm userId={user.id}/>
      <TodoList userId={user.id}/>
      {/* <TodoComponent userId={userId}/> */}
      </div>
      </div>
    </main>
    )
}