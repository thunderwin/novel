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
import { useRef } from "react";
import { type EditorRef } from "@/components/tailwind/advanced-editor";
export default function Page() {
  const [title, setTitle] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [url, setUrl] = useState("");
  const editorRef = useRef<EditorRef>(null);

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

  const handleClear = () => {
    editorRef.current?.clear();
    setTitle("");
    setSeoTitle("");
    setUrl("");
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4 sm:px-5">
      <h1>My Writer</h1>

      <div className="actions max-w-8xl flex justify-center w-full">
        <button
          className="bg-blue-500 text-2xl text-white px-4 py-2 rounded-md"
          onClick={saveToStrapi}
        >
          保存
        </button>

        <button
          className="bg-blue-500 ml-4 text-2xl text-white px-4 py-2 rounded-md"
          onClick={handleClear}
        >
          清空
        </button>
      </div>

      <div className="input-container w-full max-w-4xl flex flex-col gap-2">
        <div className="title">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" text-xl px-4 py-2 border w-full rounded-md"
          />
        </div>

        <div className="seo_title">
          <input
            type="text"
            placeholder="SEO Title"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="px-4 text-xl py-2 border w-full rounded-md"
          />
        </div>

        <div className="url">
          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="px-4 py-2 border w-full rounded-md"
          />
        </div>
      </div>
      <TailwindAdvancedEditor ref={editorRef} />
    </div>
  );
}
