"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { createTodo, updateTodo, deleteTodo } from "@/actions/todo";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: Date;
}

export default function TodoList({
  initialTodos,
  userId,
}: {
  initialTodos: Todo[];
  userId: string;
}) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newTodo.title);
    formData.append("description", newTodo.description);

    const result = await createTodo(userId, formData);

    if ("error" in result && result.error) {
      toast.error(result.error);
    } else if ("todo" in result && result.todo) {
      const newTodoItem = {
        id: result.todo.id,
        title: newTodo.title,
        description: newTodo.description,
        completed: false,
        createdAt: new Date(),
      };
      setTodos([newTodoItem, ...todos]);
      toast.success(result.message);
      setNewTodo({ title: "", description: "" });
    } else {
      toast.error("Unexpected response from server");
    }
  };

  const handleToggle = async (todo: Todo) => {
    const result = await updateTodo(todo.id, { completed: !todo.completed });
    if (result.error) {
      toast.error(result.error);
    } else {
      setTodos(
        todos.map((t) =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t
        )
      );
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteTodo(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setTodos(todos.filter((t) => t.id !== id));
      toast.success(result.message);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Todo title"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Description (optional)"
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
            />
          </div>
          <Button type="submit">Add Todo</Button>
        </form>
      </Card>

      <div className="space-y-4">
        {todos.map((todo) => (
          <Card key={todo.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => handleToggle(todo)}
              />
              <div>
                <p
                  className={
                    todo.completed ? "line-through text-muted-foreground" : ""
                  }
                >
                  {todo.title}
                </p>
                {todo.description && (
                  <p className="text-sm text-muted-foreground">
                    {todo.description}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
