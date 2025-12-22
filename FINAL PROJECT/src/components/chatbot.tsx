'use client';

import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, X, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatbot } from '@/ai/flows/chatbot-flow';
import Textarea from 'react-textarea-autosize';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import type { Message } from '@/lib/types';

interface ChatbotProps {
    userName: string;
}

const WelcomeBubble = ({ userName, onDismiss }: { userName: string, onDismiss: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="absolute bottom-full right-0 mb-2 w-64 animate-in fade-in zoom-in-95">
      <div className="bg-background border border-border p-3 rounded-lg shadow-lg relative">
        <p className="text-sm">Hey {userName}, Welcome back to ORBIT. How may I help you?</p>
        <div className="absolute -bottom-2 right-6 h-4 w-4 transform rotate-45 bg-background border-b border-r border-border"></div>
      </div>
    </div>
  );
};


export default function Chatbot({ userName }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [position, setPosition] = useState<{ x: number, y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setPosition({ x: window.innerWidth - 80, y: 80 });
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    if (nodeRef.current) {
        setIsDragging(true);
        dragStartRef.current = {
            x: e.clientX - nodeRef.current.getBoundingClientRect().left,
            y: e.clientY - nodeRef.current.getBoundingClientRect().top,
        };
    }
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (isDragging && nodeRef.current && position) {
        const newX = e.clientX - dragStartRef.current.x;
        const newY = e.clientY - dragStartRef.current.y;
        setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    } else {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);


  const toggleChat = () => {
    // Prevent toggling chat when finishing a drag
    if(isDragging) return;
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
        setMessages([
            { role: 'bot', text: "Hello! I'm your personal AI assistant. How can I help you with your studies or personal tasks today?" }
        ]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
setInput('');
    setIsLoading(true);

    try {
      const botResponse = await chatbot({ history: messages, message: input });
      setMessages([...newMessages, { role: 'bot', text: botResponse.response }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Could not get a response from the assistant.',
      });
       setMessages([...newMessages, { role: 'bot', text: 'Sorry, I am having trouble connecting. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!position) return null;

  return (
    <>
      <div 
        ref={nodeRef}
        className="fixed z-50"
        style={{ left: position.x, top: position.y }}
      >
        <div className="relative">
          {showWelcome && !isOpen && <WelcomeBubble userName={userName} onDismiss={() => setShowWelcome(false)} />}
          <Button
            size="icon"
            className="rounded-full h-16 w-16 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 scale-100 transition-transform duration-300 hover:scale-110 cursor-grab"
            onMouseDown={handleMouseDown}
            onClick={toggleChat}
          >
            {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "fixed z-40 w-[calc(100%-2rem)] max-w-md origin-top-right transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
        style={{ top: position.y + 70, right: window.innerWidth - position.x - 64 }}
      >
        <Card className="h-[60vh] flex flex-col shadow-2xl bg-background/80 backdrop-blur-xl border-white/20">
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold text-lg text-center">Your Personal Assistant</h3>
            </div>
            <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}
                >
                  {message.role === 'bot' && (
                    <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                       <AvatarFallback><Bot size={20}/></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-4 py-2 text-sm',
                      message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'
                    )}
                  >
                    {message.text}
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback><User size={20} /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               {isLoading && (
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                       <AvatarFallback><Bot size={20}/></AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary text-secondary-foreground rounded-2xl px-4 py-2 text-sm rounded-bl-none">
                      <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="flex-1 resize-none bg-background border-border"
                  minRows={1}
                  maxRows={4}
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
