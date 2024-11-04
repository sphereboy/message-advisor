"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Upload, Send, Image as ImageIcon, Clipboard } from "lucide-react";

// Define types for our advice structure
type AdviceItem = {
  category: string;
  advice: string;
  examples: string[];
};

// Enhanced AI response function with more detailed categories
const getAIAdvice = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _message: string
): AdviceItem[] => {
  return [
    {
      category: "Emotional Intelligence",
      advice:
        "The message suggests they're feeling [emotion]. Consider acknowledging their feelings before responding.",
      examples: [
        "I can understand why you'd feel that way...",
        "That must have been quite an experience...",
      ],
    },
    {
      category: "Conversation Hooks",
      advice: "They mentioned [topic]. Use this to deepen the conversation.",
      examples: [
        "Tell me more about your experience with...",
        "What inspired you to get into...",
      ],
    },
    {
      category: "Personality Match",
      advice:
        "Their communication style seems [style]. Match their energy while staying authentic.",
      examples: [
        "Keep the tone light and playful",
        "Show genuine interest in their perspective",
      ],
    },
    {
      category: "Next Steps",
      advice: "Based on the conversation flow, consider these actions.",
      examples: [
        "Suggest meeting for coffee",
        "Share a related experience of yours",
      ],
    },
  ];
};

export function MessageAdvisorComponent(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [advice, setAdvice] = useState<AdviceItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (): void => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const aiAdvice = getAIAdvice(message);
      setAdvice(aiAdvice);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would use OCR to extract text from the image
      setMessage(`Image uploaded: ${file.name}\n[OCR text would appear here]`);
    }
  };

  const handlePaste = async (): Promise<void> => {
    try {
      const text = await navigator.clipboard.readText();
      setMessage(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <Card className="border-secondary/20 bg-secondary/20 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

        <CardHeader className="space-y-4 relative">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-100 via-purple-100 to-gray-100 bg-clip-text text-transparent">
            Message Advisor
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Paste your message or upload a screenshot to get AI-powered dating
            response suggestions
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="flex space-x-3">
            <div className="flex-grow space-y-3">
              <Textarea
                placeholder="Paste the message or conversation here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] resize-none bg-background/50 border-secondary/30 focus:border-primary/30 transition-colors"
              />
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePaste}
                  className="text-xs hover:bg-secondary/80 transition-colors"
                >
                  <Clipboard className="h-4 w-4 mr-1.5" />
                  Paste from Clipboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => document.getElementById("fileUpload")?.click()}
                  className="text-xs hover:bg-secondary/80 transition-colors"
                >
                  <ImageIcon className="h-4 w-4 mr-1.5" />
                  Upload Screenshot
                </Button>
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              onClick={handleSubmit}
              disabled={isLoading || !message}
              className="bg-white h-[120px] w-[48px] rounded-[24px] transition-all duration-300 
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-gray-100 hover:shadow-lg
                flex items-center justify-center"
            >
              <Send className="h-5 w-5 text-black" />
            </Button>
          </div>

          <Input
            type="file"
            id="fileUpload"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />

          {isLoading && (
            <div className="text-center py-8 text-muted-foreground animate-pulse">
              Analyzing message and generating suggestions...
            </div>
          )}

          {advice.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                Response Strategy:
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {advice.map((item, index) => (
                  <Card
                    key={index}
                    className="border-secondary/20 bg-secondary/30 backdrop-blur-sm hover:bg-secondary/40 transition-colors duration-300"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                        {item.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {item.advice}
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary/80">
                          Example responses:
                        </p>
                        <ul className="list-disc pl-4 space-y-2">
                          {item.examples.map((example, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground hover:text-primary/80 transition-colors cursor-default"
                            >
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
