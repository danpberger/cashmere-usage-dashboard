import { useState } from 'react';
import { MessageCircle, Send, Search, BookOpen } from 'lucide-react';
import { UsageIndicator } from './components/UsageIndicator';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user' as const,
      content: 'Can you help me find recent research on machine learning ethics?',
      timestamp: new Date('2024-01-15T10:30:00')
    },
    {
      id: 2,
      type: 'assistant' as const,
      content: 'I found several relevant papers from reputable publishers. Here are the most recent findings on ML ethics, including perspectives from IEEE, ACM, and Nature publications. Would you like me to access the full text of any specific papers?',
      timestamp: new Date('2024-01-15T10:31:00'),
      sources: [
        { title: 'AI Ethics in Healthcare: A Comprehensive Review', publisher: 'Wiley', cost: 2.50 },
        { title: 'Machine Learning Bias Detection Methods', publisher: 'Sage', cost: 1.75 }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'user',
        content: inputValue,
        timestamp: new Date()
      }]);
      setInputValue('');
      
      // Simulate assistant response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          type: 'assistant',
          content: 'I\'m searching through scholarly databases to find the most relevant and up-to-date information for your query. This may involve accessing paywalled content from our partner publishers.',
          timestamp: new Date(),
          sources: []
        }]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Cashmere Scholar Chat</h1>
            <p className="text-sm text-gray-600">AI-powered access to scholarly content</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl rounded-2xl px-4 py-3 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}>
                <div className="flex items-start gap-3">
                  {message.type === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.sources && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-medium text-gray-600">Sources accessed:</p>
                        {message.sources.map((source, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3 text-xs">
                            <div className="font-medium text-gray-800">{source.title}</div>
                            <div className="text-gray-600 mt-1">
                              {source.publisher} • ${source.cost.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about scholarly research, papers, or specific topics..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Questions may access paywalled content. Usage is tracked and billed per access.
          </p>
        </div>
      </div>

      {/* Usage Indicator */}
      <UsageIndicator />
    </div>
  );
}

export default App;
