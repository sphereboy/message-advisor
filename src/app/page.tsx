import { MessageAdvisorComponent } from "@/components/message-advisor";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40vh] -left-[20vw] w-[80vw] h-[80vh] bg-purple-500/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[40vh] -right-[20vw] w-[80vw] h-[80vh] bg-blue-500/30 rounded-full blur-[120px]" />
        <div className="absolute top-[20vh] right-[10vw] w-[40vw] h-[40vh] bg-pink-500/20 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen backdrop-blur-3xl">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-8 pt-12 px-4">
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-100 via-purple-100 to-gray-100 bg-clip-text text-transparent">
              AI Dating Message Advisor
            </h1>
            <MessageAdvisorComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
