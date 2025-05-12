import ReactMarkdown from "react-markdown";

export default function ChatBubble ({role, content}:any) {
    return (
        <div className={`${role === "user" ? "bg-slate-200 self-start" : "bg-green-400 text-gray-800 self-end"} rounded-sm shadow-xl max-w-[800px] p-6`}>
            <div className="flex flex-col gap-2">
                <h3 className="text-[18px] font-semibold">{role}:</h3>
                {role === "user" ? <span>{content}</span> : <ReactMarkdown>{content}</ReactMarkdown>}
            </div>
        </div>
    )
}