import React, { useState } from 'react';
import { MessageCircle, Send, Zap, Shield, University, Award, Eye, ChevronDown, Sparkles, BookOpen, Minimize2, BarChart3, X, ExternalLink, Users, Clock, TrendingUp, RefreshCw } from 'lucide-react';
import type { ConversationMessage, ResponseVariant } from './types/usage';
import { useUsageData } from './hooks/useUsageData';

// Extension Dashboard Modal
const ExtensionDashboard = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { metrics, transactions, contentSources } = useUsageData();
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'sources'>('overview');

  if (!isOpen) return null;

  const totalTokensUsed = metrics.totalTokens - metrics.remainingTokens;
  const tokenUsagePercentage = (totalTokensUsed / metrics.totalTokens) * 100;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-4 max-w-5xl max-h-[90vh] mx-auto my-auto bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
        {/* Extension Dashboard Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <img src="/cashmere-logo.svg" alt="Cashmere" className="h-8" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Cashmere Research Dashboard</h2>
              <p className="text-sm text-gray-600">Browser Extension Analytics</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Extension Dashboard Tabs */}
        <div className="flex border-b border-gray-200 bg-white">
          {[
            { id: 'overview', label: 'Token Overview', icon: TrendingUp },
            { id: 'activity', label: 'Research Activity', icon: BarChart3 },
            { id: 'sources', label: 'Verified Sources', icon: Shield }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Extension Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Token Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-600 rounded-xl">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-700">{metrics.remainingTokens}</div>
                      <div className="text-sm text-blue-600 font-medium">Research Tokens Left</div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600">
                    ${(metrics.remainingTokens * 0.002).toFixed(2)} research value remaining
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-600 rounded-xl">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-700">{contentSources.length}</div>
                      <div className="text-sm text-green-600 font-medium">Verified Sources</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-600">
                    From {metrics.uniquePublishers} trusted publishers
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-600 rounded-xl">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-700">{totalTokensUsed}</div>
                      <div className="text-sm text-purple-600 font-medium">Tokens Used</div>
                    </div>
                  </div>
                  <div className="text-xs text-purple-600">
                    ${(totalTokensUsed * 0.002).toFixed(2)} total research cost
                  </div>
                </div>
              </div>

              {/* Usage Progress */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Research Token Usage</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Usage</span>
                    <span className="font-medium">{totalTokensUsed}/{metrics.totalTokens} tokens ({tokenUsagePercentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all"
                      style={{ width: `${tokenUsagePercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Research Activity</h3>
              {transactions.slice(0, 10).map(transaction => (
                <div key={transaction.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {transaction.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{transaction.tokensUsed} tokens</div>
                      <div className="text-sm text-gray-500">${transaction.usdAmount.toFixed(3)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-4">Recently Verified Sources</h3>
              {contentSources.map(source => (
                <div key={source.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{source.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{source.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <University className="w-3 h-3" />
                          {source.publisher}
                        </span>
                        <span className="capitalize">{source.contentType}</span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {source.tokensUsed} tokens
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => window.open(source.url, '_blank')}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Cashmere Extension Floating Panel
const CashmereExtensionPanel = ({ isMinimized, onToggle }: { isMinimized: boolean, onToggle: () => void }) => {
  const { metrics } = useUsageData();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const percentage = (metrics.remainingTokens / metrics.totalTokens) * 100;
  const isLow = percentage < 20;

  if (isMinimized) {
    return (
      <div 
        className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 cursor-pointer hover:shadow-xl transition-all"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2 p-3">
          <img src="/cashmere-logo.svg" alt="Cashmere" className="h-5" />
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  isLow ? 'bg-red-500' : percentage < 50 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-700">{metrics.remainingTokens}</span>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-4 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-2">
            <img src="/cashmere-logo.svg" alt="Cashmere" className="h-5" />
            <div>
              <div className="font-semibold text-gray-900 text-sm">Cashmere Research</div>
              <div className="text-xs text-gray-500">Browser Extension v2.1</div>
            </div>
          </div>
          <button onClick={onToggle} className="p-1 hover:bg-white/50 rounded">
            <Minimize2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Research Tokens</span>
              <span className="text-xs text-blue-600">{percentage.toFixed(0)}% remaining</span>
            </div>
            <div className="relative w-full h-2 bg-blue-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  isLow ? 'bg-red-500' : percentage < 50 ? 'bg-yellow-500' : 'bg-blue-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-blue-700 mt-1">
              <span>{metrics.remainingTokens} left</span>
              <span>${(metrics.remainingTokens * 0.002).toFixed(2)} value</span>
            </div>
          </div>

          <button 
            onClick={() => setDashboardOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
          >
            <BarChart3 className="w-4 h-4" />
            View Full Dashboard
          </button>

          <div className="text-xs text-gray-500 flex items-center gap-2">
            <Shield className="w-3 h-3" />
            <span>Enhancing ChatGPT with verified research sources</span>
          </div>
        </div>
      </div>

      <ExtensionDashboard 
        isOpen={dashboardOpen} 
        onClose={() => setDashboardOpen(false)} 
      />
    </>
  );
};

// Extension-injected trust indicator
const ExtensionTrustBadge = ({ publisher, confidence }: { publisher: string, confidence: number }) => {
  const getTrustLevel = () => {
    if (publisher.includes('University') || publisher.includes('Institute')) return 'academic';
    if (['Nature', 'Science', 'Cell', 'Lancet'].includes(publisher)) return 'premier';
    if (['IEEE', 'ACM', 'Springer', 'Wiley'].includes(publisher)) return 'established';
    return 'standard';
  };

  const trustLevel = getTrustLevel();
  const trustConfig = {
    academic: { color: 'bg-blue-500', icon: University, label: 'Academic Institution' },
    premier: { color: 'bg-purple-500', icon: Award, label: 'Premier Journal' },
    established: { color: 'bg-green-500', icon: Shield, label: 'Established Publisher' },
    standard: { color: 'bg-gray-500', icon: BookOpen, label: 'Standard Source' }
  };

  const config = trustConfig[trustLevel];
  const IconComponent = config.icon;

  return (
    <div className="inline-flex items-center ml-1 group/trust">
      {/* Extension-style indicator */}
      <div className="relative">
        <div className={`w-2 h-2 rounded-full ${config.color} opacity-80 animate-pulse`} />
        <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-white rounded-full border border-gray-300"></div>
      </div>
      
      {/* Extension tooltip */}
      <div className="absolute invisible group-hover/trust:visible bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-50 -mt-12 left-0 border border-gray-700 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <img src="/cashmere-logo.svg" alt="Cashmere" className="h-3 opacity-80" />
          <span className="text-gray-300 text-xs">Verified by Cashmere</span>
        </div>
        <div className="flex items-center gap-2">
          <IconComponent className="w-3 h-3" />
          <span>{config.label}</span>
        </div>
        <div className="text-gray-400 text-xs">{Math.round(confidence * 100)}% confidence</div>
        <div className="absolute top-full left-4 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
};

// Extension-injected response footer
const ExtensionResponseFooter = ({ tokensUsed, sources }: { tokensUsed: number, sources: any[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 pt-3 border-t border-gray-100 bg-gradient-to-r from-blue-50/30 to-purple-50/30 -mx-4 px-4 pb-3">
      {/* Extension branding bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <img src="/cashmere-logo.svg" alt="Cashmere" className="h-3 opacity-60" />
          <span>Enhanced by Cashmere Extension</span>
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Eye className="w-3 h-3" />
          <span>View Details</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Token consumption display */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-600 flex items-center gap-2">
          <Shield className="w-3 h-3 text-green-500" />
          <span>Verified from {sources.length} trusted research sources</span>
        </div>
        <div className="flex items-center gap-2 text-xs bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200/50">
          <Sparkles className="w-3 h-3 text-blue-500" />
          <span className="font-medium text-gray-700">{tokensUsed} tokens</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">${(tokensUsed * 0.002).toFixed(3)}</span>
        </div>
      </div>

      {/* Expandable details */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
          {sources.map((source, index) => (
            <div key={index} className="bg-white/60 rounded-lg p-3 border border-gray-200/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{source.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{source.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <University className="w-3 h-3" />
                      {source.publisher}
                    </span>
                    <span>{source.contentType}</span>
                    {source.doi && <span className="font-mono">{source.doi}</span>}
                  </div>
                </div>
                <div className="ml-3 text-right">
                  <div className="text-xs text-blue-600 font-medium mb-1">{source.tokensUsed} tokens</div>
                  <button 
                    onClick={() => window.open(source.url, '_blank')}
                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    View Source
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Enhanced link with extension badge
const EnhancedLink = ({ href, children, source }: { href: string, children: React.ReactNode, source: any }) => {
  return (
    <span className="inline-flex items-center group/link">
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2 transition-colors"
        title={`${source.title} - ${source.publisher}`}
      >
        {children}
      </a>
      <ExtensionTrustBadge 
        publisher={source.publisher} 
        confidence={source.confidence || 0.9} 
      />
    </span>
  );
};

const renderParagraphWithInlineLinks = (paragraph: string, sources: any[]) => {
  if (!paragraph || sources.length === 0) {
    return paragraph;
  }

  let result: (string | React.ReactElement)[] = [paragraph];
  let linkIndex = 0;

  sources.forEach((source, sourceIndex) => {
    if (linkIndex >= 2) return;

    const patterns = [
      source.publisher,
      'researchers at ' + source.publisher,
      'scientists',
      source.title.split(' ').slice(0, 4).join(' ')
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
                <EnhancedLink
                  key={`link-${sourceIndex}-${linkIndex}`}
                  href={source.url}
                  source={source}
                >
                  {parts[i]}
                </EnhancedLink>
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
        break;
      }
    }
  });

  return result.length === 1 && typeof result[0] === 'string' ? result[0] : result;
};

function App() {
  const { conversationHistory } = useUsageData();
  const [messages, setMessages] = useState<ConversationMessage[]>(conversationHistory);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [extensionMinimized, setExtensionMinimized] = useState(false);

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
      {/* Pure ChatGPT Header - No Cashmere branding */}
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
              <span className="text-sm text-gray-700">4o</span>
            </div>
          </div>
        </div>
      </header>

      {/* Pure ChatGPT Chat Area */}
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
                      
                      {/* Extension-injected footer */}
                      {message.responseVariants && message.responseVariants.length > 0 && (
                        <ExtensionResponseFooter 
                          tokensUsed={message.responseVariants[0].tokensUsed}
                          sources={message.responseVariants[0].sources}
                        />
                      )}
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
                    {/* Extension enhancement indicator */}
                    <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      <img src="/cashmere-logo.svg" alt="Cashmere" className="h-2.5" />
                      <span>Researching</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pure ChatGPT Input Area */}
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
                ChatGPT can make mistakes. Check important info.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cashmere Extension Floating Panel */}
      <CashmereExtensionPanel 
        isMinimized={extensionMinimized} 
        onToggle={() => setExtensionMinimized(!extensionMinimized)} 
      />
    </div>
  );
}

export default App;