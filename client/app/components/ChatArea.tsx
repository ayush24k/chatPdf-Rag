'use client'
import axios from "axios"
import { useState } from "react"
import ChatBubble from "./ChatBubble";

interface Doc {
    pageContent?: string;
    metadat?: {
        loc?: {
            pageNumber?: number;
        };
        source?: string;
    };
}

interface IMessage {
    role: "assistant" | "user";
    content?: string;
    documents?: Doc[];
}

export default function ChatArea() {

    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<IMessage[]>([])

    async function hanldeChatQuery() {
        setMessages((prev) => [...prev, { role: "user", content: message }])
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat?message=${message}`)
        const data = response.data;
        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                content: data?.message,
                documents: data?.docs,
            }
        ])
    }

    return (
        <div className="p-4">
            <div className="flex flex-col gap-5">
                {messages.map((msg, index) => {
                    return (
                        <ChatBubble key={index} {...msg} />
                    )
                })}

            </div>
            <div className="fixed bottom-[38px] w-[70%] ml-[80px]">
                <div className="flex gap-5 flex-wrap">
                    <input
                        type="text"
                        placeholder="type your question here"
                        value={message}
                        className="bg-slate-100 p-4 rounded-sm shadow-2xl w-[70%] outline-0"
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}>
                    </input>
                    <button
                        className={`${message.trim() ? "bg-slate-900" : "bg-slate-700"} text-white p-4 rounded-sm px-6 shadow-2xl cursor-pointer`}
                        onClick={hanldeChatQuery}
                    >Send</button>
                </div>
            </div>
        </div>
    )
}