import React, { useState } from 'react';
import {
  X,
  RefreshCw,
  Zap,
  BookOpen,
  DollarSign,
  TrendingUp,
  Calendar,
  ExternalLink,
  Download,
  Filter,
  Sparkles,
  Users,
  BarChart3,
  Clock,
  Award
} from 'lucide-react';
import { useUsageData } from '../hooks/useUsageData';
import type { Transaction } from '../types/usage';

interface UsageDashboardProps {
  onClose: () => void;
}

export const UsageDashboard: React.FC<UsageDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'sources' | 'analytics'>('overview');
  const [transactionFilter, setTransactionFilter] = useState<'all' | 'response_generation' | 'content_access' | 'token_purchase'>('all');
  
  const { metrics, transactions, contentSources, isLoading, refreshUsageData, lastUpdated } = useUsageData();

  const filteredTransactions = transactions.filter(t => 
    transactionFilter === 'all' || t.type === transactionFilter
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'response_generation': return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'content_access': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'token_purchase': return <Zap className="w-4 h-4 text-green-600" />;
      default: return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  const openContentSource = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const totalTokensUsed = metrics.totalTokens - metrics.remainingTokens;
  const tokenUsagePercentage = (totalTokensUsed / metrics.totalTokens) * 100;
  const monthlyUsagePercentage = (metrics.monthlyTokensUsed / metrics.monthlyTokenLimit) * 100;

  return (
    <>
      {/* Overlay */}
      <div className="dashboard-overlay" onClick={onClose} />
      
      {/* Dashboard Panel */}
      <div className="dashboard-panel animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Usage Dashboard
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Token usage and research analytics • Last updated: {formatDate(lastUpdated)}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={refreshUsageData}
              disabled={isLoading}
              className="p-2 hover:bg-white/60 rounded-xl transition-colors disabled:opacity-50 border border-white/20 backdrop-blur-sm"
              title="Refresh data"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/60 rounded-xl transition-colors border border-white/20 backdrop-blur-sm"
              title="Close dashboard"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'transactions', label: 'Activity', icon: Calendar },
            { id: 'sources', label: 'Research Sources', icon: BookOpen },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'transactions' | 'sources' | 'analytics')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all relative ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-white shadow-sm border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          {activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/80 p-6 rounded-2xl border border-blue-200/50 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-600 rounded-xl">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-700">
                        {metrics.remainingTokens}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">Tokens Left</div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600">
                    ${(metrics.remainingTokens * metrics.tokenToUSDRate).toFixed(2)} value
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100/80 p-6 rounded-2xl border border-purple-200/50 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-600 rounded-xl">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-700">
                        {metrics.articlesAccessed}
                      </div>
                      <div className="text-sm text-purple-600 font-medium">Articles Accessed</div>
                    </div>
                  </div>
                  <div className="text-xs text-purple-600">
                    From {metrics.uniquePublishers} publishers
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100/80 p-6 rounded-2xl border border-green-200/50 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-600 rounded-xl">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-700">
                        ${metrics.currentBalanceUSD.toFixed(2)}
                      </div>
                      <div className="text-sm text-green-600 font-medium">Balance</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-600">
                    ${metrics.tokenToUSDRate.toFixed(3)} per token
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100/80 p-6 rounded-2xl border border-orange-200/50 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-600 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-700">
                        {metrics.monthlyTokensUsed}
                      </div>
                      <div className="text-sm text-orange-600 font-medium">Tokens This Month</div>
                    </div>
                  </div>
                  <div className="text-xs text-orange-600">
                    ${(metrics.monthlyTokensUsed * metrics.tokenToUSDRate).toFixed(2)} spent
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-800">Token Usage</span>
                    <span className="text-sm text-gray-600 font-medium">
                      {totalTokensUsed}/{metrics.totalTokens} tokens used ({tokenUsagePercentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all shadow-sm"
                      style={{ width: `${tokenUsagePercentage}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-800">Monthly Token Limit</span>
                    <span className="text-sm text-gray-600 font-medium">
                      {metrics.monthlyTokensUsed}/{metrics.monthlyTokenLimit} tokens ({monthlyUsagePercentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all shadow-sm ${
                        monthlyUsagePercentage > 80 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                        monthlyUsagePercentage > 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                        'bg-gradient-to-r from-green-500 to-green-600'
                      }`}
                      style={{ width: `${monthlyUsagePercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="p-6 space-y-4">
              {/* Filter */}
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200/50 shadow-sm">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={transactionFilter}
                  onChange={(e) => setTransactionFilter(e.target.value as 'all' | 'response_generation' | 'content_access' | 'token_purchase')}
                  className="border border-gray-300/50 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90"
                >
                  <option value="all">All Activity</option>
                  <option value="response_generation">Response Generation</option>
                  <option value="content_access">Content Access</option>
                  <option value="token_purchase">Token Purchases</option>
                </select>
                <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              {/* Transaction List */}
              <div className="space-y-3">
                {filteredTransactions.map(transaction => (
                  <div key={transaction.id} className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-5 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-50 rounded-xl">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 mb-1">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(transaction.timestamp)}
                            </span>
                            {transaction.publisher && (
                              <span className="flex items-center gap-1 text-blue-600">
                                <Users className="w-3 h-3" />
                                {transaction.publisher}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-lg ${
                          transaction.type === 'token_purchase' ? 'text-green-600' : 'text-gray-800'
                        }`}>
                          {transaction.type === 'token_purchase' ? '+' : '-'}{transaction.tokensUsed} tokens
                        </div>
                        <div className="text-sm text-gray-500">
                          ${transaction.usdAmount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200/50 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Recently Accessed Research
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                  <Download className="w-4 h-4" />
                  Export Sources
                </button>
              </div>

              <div className="grid gap-4">
                {contentSources.map(source => (
                  <div key={source.id} className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-2 text-lg leading-tight">
                          {source.title}
                        </h4>
                        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                          {source.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <strong>{source.publisher}</strong>
                          </span>
                          <span className="capitalize font-medium">{source.contentType}</span>
                          <span>{formatDate(source.accessedAt)}</span>
                          {source.doi && (
                            <span className="text-blue-600 font-mono text-xs">
                              DOI: {source.doi}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="flex items-center gap-1 text-blue-600 font-bold mb-2">
                          <Zap className="w-4 h-4" />
                          {source.tokensUsed} tokens
                        </div>
                        <button
                          onClick={() => openContentSource(source.url)}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Access Article
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    Usage Efficiency
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg tokens per response</span>
                      <span className="font-semibold text-gray-800">
                        {(metrics.monthlyTokensUsed / Math.max(1, filteredTransactions.filter(t => t.type === 'response_generation').length)).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cost per article accessed</span>
                      <span className="font-semibold text-gray-800">
                        ${((metrics.monthlyTokensUsed * metrics.tokenToUSDRate) / Math.max(1, metrics.articlesAccessed)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Research diversity</span>
                      <span className="font-semibold text-gray-800">
                        {metrics.uniquePublishers} publishers
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    Usage Projections
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Projected monthly usage</span>
                      <span className="font-semibold text-gray-800">
                        {Math.round((metrics.monthlyTokensUsed / new Date().getDate()) * 30)} tokens
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Estimated monthly cost</span>
                      <span className="font-semibold text-gray-800">
                        ${((metrics.monthlyTokensUsed / new Date().getDate()) * 30 * metrics.tokenToUSDRate).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Days until token depletion</span>
                      <span className={`font-semibold ${
                        (metrics.remainingTokens / (metrics.monthlyTokensUsed / new Date().getDate())) < 30 ? 'text-red-600' : 'text-gray-800'
                      }`}>
                        {Math.round(metrics.remainingTokens / Math.max(1, metrics.monthlyTokensUsed / new Date().getDate()))} days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};