import React, { useState } from 'react';
import { MessageCircle, Send, Zap } from 'lucide-react';
import { UsageIndicator } from './components/UsageIndicator';
import type { ConversationMessage, ResponseVariant } from './types/usage';
import { useUsageData } from './hooks/useUsageData';

const renderParagraphWithInlineLinks = (paragraph: string, sources: any[]) => {
  if (!paragraph || sources.length === 0) {
    return paragraph;
  }

  let result: (string | React.ReactElement)[] = [paragraph];
  let linkIndex = 0;

  sources.forEach((source, sourceIndex) => {
    if (linkIndex >= 2) return; // Limit to 2 links per paragraph

    // Look for potential reference patterns (publishers, key terms, etc.)
    const patterns = [
      source.publisher,
      'researchers at ' + source.publisher,
      'scientists',
      source.title.split(' ').slice(0, 4).join(' ') // First few words of title
    ].filter(Boolean);

    for (const pattern of patterns) {
      if (linkIndex >= 2) break;
      
      const newResult: (string | React.ReactElement)[] = [];
      let foundMatch = false;

      result.forEach((part) => {
        if (typeof part === 'string' && part.toLowerCase().includes(pattern.toLowerCase())) {
          const regex = new RegExp(`(${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
          const parts = part.split(regex);
          
          for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
              if (parts[i]) newResult.push(parts[i]);
            } else if (!foundMatch) {
              newResult.push(
                <a 
                  key={`link-${sourceIndex}-${linkIndex}`}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2 transition-colors"
                  title={`${source.title} - ${source.publisher}`}
                >
                  {parts[i]}
                </a>
              );
              foundMatch = true;
              linkIndex++;
            } else {
              if (parts[i]) newResult.push(parts[i]);
            }
          }
        } else {
          newResult.push(part);
        }
      });

      if (foundMatch) {
        result = newResult;
        break; // Found a match for this source, move to next source
      }
    }
  });

  return result.length === 1 && typeof result[0] === 'string' ? result[0] : result;
};

function App() {
  const { conversationHistory, metrics } = useUsageData();
  const [messages, setMessages] = useState<ConversationMessage[]>(conversationHistory);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateResponse = (query: string): ResponseVariant => {
    return {
      id: `var_${Date.now()}_1`,
      content: `Based on my search of the most recent ${query.toLowerCase()} research, here are the key breakthrough findings from 2025:\n\nNew Therapeutic Target Discovery Researchers at Virginia Commonwealth University discovered that an enzyme called lactate dehydrogenase (BbLDH) serves as an "Achilles heel" for the ${query.toLowerCase()} pathogen. This enzyme is essential for bacterial growth and infectivity, and has unique biochemical features not found in any other microorganisms, making it an ideal target for developing genus-specific treatments.\n\nRevolutionary Antibiotic Alternative Northwestern University researchers identified piperacillin, a member of the penicillin family, as potentially much more effective than the current standard treatment doxycycline. In mouse studies, piperacillin effectively cured ${query.toLowerCase()} at 100-times less than the effective dose of doxycycline. This could address major limitations of current treatment, including gut microbiome damage and inability to treat young children.`,
      sources: [
        {
          id: '1',
          title: `Novel Therapeutic Targets in ${query} Disease Research`,
          publisher: 'Virginia Commonwealth University',
          url: 'https://nature.com/article/recent-advances',
          accessedAt: new Date(),
          tokensUsed: 8,
          contentType: 'article' as const,
          excerpt: 'This study examines recent methodological improvements and their implications for future research directions...',
          doi: '10.1038/nature.2024.001'
        },
        {
          id: '2', 
          title: `Piperacillin Efficacy Against ${query} Pathogens`,
          publisher: 'Northwestern University',
          url: 'https://ieee.org/article/methodological-frameworks',
          accessedAt: new Date(),
          tokensUsed: 6,
          contentType: 'journal' as const,
          excerpt: 'An analysis of emerging methodological approaches and their comparative effectiveness across different application domains...',
          doi: '10.1109/ieee.2024.002'
        }
      ],
      tokensUsed: 14,
      confidence: 0.94,
      uniqueReferences: 2
    };
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isGenerating) {
      const userMessage: ConversationMessage = {
        id: `msg_${Date.now()}`,
        type: 'user',
        content: inputValue,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      const query = inputValue;
      setInputValue('');
      setIsGenerating(true);
      
      // Simulate response generation with realistic delay
      setTimeout(() => {
        const response = generateResponse(query);
        const assistantMessage: ConversationMessage = {
          id: `msg_${Date.now() + 1}`,
          type: 'assistant',
          content: response.content,
          timestamp: new Date(),
          responseVariants: [response],
          selectedVariantId: response.id
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsGenerating(false);
      }, 2000);
    }
  };


  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - ChatGPT style */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-medium text-gray-900">ChatGPT</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
              <Zap className="w-3 h-3 text-gray-600" />
              <span className="text-sm text-gray-700">{metrics.remainingTokens}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map(message => (
            <div key={message.id} className="group">
              <div className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'assistant' && (
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-3xl ${message.type === 'user' 
                    ? 'bg-gray-100 rounded-2xl px-4 py-3' 
                    : 'bg-transparent'
                }`}>
                  {message.type === 'user' ? (
                    <p className="text-gray-900 leading-relaxed">{message.content}</p>
                  ) : (
                    <div className="space-y-4">
                      <div className="prose prose-gray max-w-none">
                        {message.content.split('\n').map((paragraph, idx) => {
                          const selectedVariant = message.responseVariants?.find(v => v.id === message.selectedVariantId);
                          return (
                            <p key={idx} className="text-gray-900 leading-relaxed mb-4 last:mb-0">
                              {renderParagraphWithInlineLinks(paragraph, selectedVariant?.sources || [])}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-medium">U</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isGenerating && (
            <div className="group">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                </div>
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area - ChatGPT style */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="Message ChatGPT..."
                  disabled={isGenerating}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isGenerating}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center mt-2">
              <p className="text-xs text-gray-500 text-center">
                {metrics.remainingTokens} tokens remaining • Research sources accessed via tokens
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Indicator */}
      <UsageIndicator />
    </div>
  );
}

export default App;