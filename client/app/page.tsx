import FileUpload from "@/app/components/FileUpload";
import ChatArea from "./components/ChatArea";

export default function Home() {
  return (
    <div className="flex items-center">
      <div className="w-[30vw] min-h-screen bg-amber-200 p-2 flex justify-center items-center">
        <FileUpload />
      </div>
      <div className="w-[70vw] min-h-screen bg-blue-300 p-2">
        <ChatArea />
      </div>
    </div>
  );
}
