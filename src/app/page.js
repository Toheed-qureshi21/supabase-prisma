import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen min-w-screen flex flex-col gap-2 items-center pt-[5rem]">
      <h1>Todo</h1>
      <TodoForm />
      <TodoList/>
    </main>
  );
}
