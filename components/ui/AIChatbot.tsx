'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { announceToScreenReader, trapFocus } from '@/lib/a11y';
import { COMPANY } from '@/lib/constants';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const quickReplies = [
  '모듈러 건축이 뭔가요?',
  '가격대가 궁금해요',
  '시공 기간은 얼마나 걸려요?',
  '체류형 쉼터 만들 수 있나요?',
];

const autoReplies: Record<string, string> = {
  '모듈러': '모듈러 건축은 공장에서 모듈을 제작하고 현장에서 조립하는 방식이에요. 일반 건축보다 70% 빠르고, 균일한 품질을 보장합니다. 자세한 내용은 /modular-v2 페이지를 참고해주세요!',
  '가격': '모델에 따라 다르지만, S(3X6) 기본형부터 상담 안내드리고 있어요. 정확한 견적은 /quote 페이지에서 가이드 견적을 받아보시거나, 상담을 신청해주세요!',
  '기간': '모델에 따라 3주~3개월 정도 소요됩니다. 공장 제작과 현장 작업을 병행하기 때문에 일반 건축보다 훨씬 빨라요.',
  '체류형': '네! 33㎡ 이하 체류형 쉼터도 제작 가능합니다. 건축 허가 없이 설치할 수 있어요. /shelter 페이지에서 자세히 확인하실 수 있습니다.',
  'A/S': '구조 10년, 마감·설비 2년 무상 A/S를 제공합니다. 이후에도 유상 케어 서비스가 있어요.',
  '커스텀': '비스포크 서비스로 완전 맞춤 설계가 가능합니다. 카페, 팝업스토어, 스마트팜 등 다양한 용도로 제작할 수 있어요. /bespoke-v2 페이지를 확인해보세요!',
};

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const [keyword, reply] of Object.entries(autoReplies)) {
    if (lower.includes(keyword.toLowerCase())) {
      return reply;
    }
  }
  return `좋은 질문이에요! 더 정확한 답변을 위해 전문 상담사와 연결해드릴까요? ${COMPANY.phone}로 전화하시거나, 카카오톡으로 문의해주세요 :)`;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '안녕하세요! 위트 AI 상담봇이에요 🏠\n모듈러 건축에 대해 궁금한 거 편하게 물어보세요!' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    return trapFocus(modalRef.current);
  }, [isOpen]);

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleSend = (text?: string) => {
    const message = text ?? input.trim();
    if (!message) return;

    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setInput('');
    setIsTyping(true);
    scrollToBottom();

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: getReply(message) }]);
      announceToScreenReader('새로운 답변이 도착했습니다');
      setIsTyping(false);
      scrollToBottom();
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
            style={{ zIndex: 500 }}
          >
            <div className="flex items-center justify-between bg-gray-900 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-[#FEBD16]" />
                <span className="font-semibold text-white">위트 AI 상담</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="채팅 닫기"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-[350px] overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={cn('flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#FEBD16]/10">
                      <Bot className="h-4 w-4 text-[#FEBD16]" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line',
                      msg.role === 'user'
                        ? 'bg-[#FEBD16] text-black rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FEBD16]/10">
                    <Bot className="h-4 w-4 text-[#FEBD16]" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
              <div className="border-t border-gray-100 px-4 py-3">
                <p className="mb-2 text-xs text-gray-400">자주 묻는 질문</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleSend(q)}
                      className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-[#FEBD16] hover:text-gray-900"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-gray-100 p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="질문을 입력하세요..."
                className="min-h-[40px] flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-[#FEBD16]"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEBD16] text-black transition-colors hover:bg-[#E5A410] disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-4 right-20 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all',
          isOpen ? 'bg-gray-900 text-white' : 'bg-[#FEBD16] text-black hover:bg-[#E5A410]'
        )}
        style={{ zIndex: 500 }}
        aria-label={isOpen ? '채팅 닫기' : 'AI 상담 시작'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
