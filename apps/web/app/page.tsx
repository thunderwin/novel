"use client";
import { useEffect, useState } from "react";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import { Button } from "@/components/tailwind/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/tailwind/ui/dialog";
import Menu from "@/components/tailwind/ui/menu";
import { ScrollArea } from "@/components/tailwind/ui/scroll-area";
import { BookOpen, GithubIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 使用 useEffect 来安全地访问 localStorage
  useEffect(() => {
    // 只在客户端执行
    const savedContent = window.localStorage.getItem("markdown");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const saveToStrapi = async () => {
    try {
      // 在提交前从 localStorage 获取最新内容
      const currentContent = localStorage.getItem("markdown") || "";

      const response = await fetch("/api/novels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: currentContent, // 使用从 localStorage 获取的内容
        }),
      });

      if (!response.ok) {
        throw new Error("保存失败");
      }

      const data = await response.json();
      toast.success("保存成功！");
    } catch (error) {
      console.error("保存失败:", error);
      toast.error("保存失败，请重试");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4 sm:px-5">
      <h1>My Writer</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={saveToStrapi}
      >
        保存
      </button>
      <div className="input-container flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <TailwindAdvancedEditor />
    </div>
  );
}
