import React, { useState } from 'react';
import {
  X,
  RefreshCw,
  CreditCard,
  Search,
  DollarSign,
  TrendingUp,
  Calendar,
  ExternalLink,
  Download,
  Filter,
  Eye
} from 'lucide-react';
import { useUsageData } from '../hooks/useUsageData';
import type { Transaction } from '../types/usage';

interface UsageDashboardProps {
  onClose: () => void;
}

export const UsageDashboard: React.FC<UsageDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'sources'>('overview');
  const [transactionFilter, setTransactionFilter] = useState<'all' | 'search' | 'access' | 'purchase'>('all');
  
  const { metrics, transactions, contentSources, isLoading, refreshUsageData, lastUpdated } = useUsageData();

  const filteredTransactions = transactions.filter(t => 
    transactionFilter === 'all' || t.type === transactionFilter || 
    (transactionFilter === 'purchase' && t.type === 'credit_purchase')
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
      case 'search': return <Search className="w-4 h-4 text-purple-600" />;
      case 'access': return <Eye className="w-4 h-4 text-blue-600" />;
      case 'credit_purchase': return <CreditCard className="w-4 h-4 text-green-600" />;
      default: return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  const openContentSource = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Overlay */}
      <div className="dashboard-overlay" onClick={onClose} />
      
      {/* Dashboard Panel */}
      <div className="dashboard-panel animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Usage Dashboard</h2>
            <p className="text-sm text-gray-600 mt-1">
              Last updated: {formatDate(lastUpdated)}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={refreshUsageData}
              disabled={isLoading}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              title="Close dashboard"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'transactions', label: 'Transactions', icon: Calendar },
            { id: 'sources', label: 'Content Sources', icon: ExternalLink }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold text-blue-700">
                        {metrics.remainingCredits}
                      </div>
                      <div className="text-sm text-blue-600">Credits Left</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <Search className="w-8 h-8 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold text-purple-700">
                        {metrics.remainingSearches}
                      </div>
                      <div className="text-sm text-purple-600">Searches Left</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-green-700">
                        ${metrics.currentBalance.toFixed(2)}
                      </div>
                      <div className="text-sm text-green-600">Balance</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                    <div>
                      <div className="text-2xl font-bold text-orange-700">
                        ${metrics.monthlySpend.toFixed(2)}
                      </div>
                      <div className="text-sm text-orange-600">This Month</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Credit Usage</span>
                    <span className="text-sm text-gray-500">
                      {metrics.totalCredits - metrics.remainingCredits}/{metrics.totalCredits} used
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${((metrics.totalCredits - metrics.remainingCredits) / metrics.totalCredits) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Monthly Spend Limit</span>
                    <span className="text-sm text-gray-500">
                      ${metrics.monthlySpend.toFixed(2)}/${metrics.monthlyLimit.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        metrics.monthlySpend / metrics.monthlyLimit > 0.8 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                        metrics.monthlySpend / metrics.monthlyLimit > 0.6 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                        'bg-gradient-to-r from-green-500 to-green-600'
                      }`}
                      style={{ width: `${(metrics.monthlySpend / metrics.monthlyLimit) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4">
              {/* Filter */}
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={transactionFilter}
                  onChange={(e) => setTransactionFilter(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Transactions</option>
                  <option value="search">Searches</option>
                  <option value="access">Content Access</option>
                  <option value="purchase">Credit Purchases</option>
                </select>
                <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              {/* Transaction List */}
              <div className="space-y-2">
                {filteredTransactions.map(transaction => (
                  <div key={transaction.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <div className="font-medium text-gray-800">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {formatDate(transaction.timestamp)}
                            {transaction.publisher && (
                              <span className="ml-2 text-blue-600">• {transaction.publisher}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          transaction.type === 'credit_purchase' ? 'text-green-600' : 'text-gray-800'
                        }`}>
                          {transaction.type === 'credit_purchase' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </div>
                        {transaction.credits && (
                          <div className="text-xs text-gray-500">
                            {transaction.type === 'credit_purchase' ? '+' : '-'}{transaction.credits} credits
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recently Accessed Content</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Export List
                </button>
              </div>

              <div className="grid gap-4">
                {contentSources.map(source => (
                  <div key={source.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-2 leading-tight">
                          {source.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {source.publisher}
                          </span>
                          <span>{source.contentType}</span>
                          <span>{formatDate(source.accessedAt)}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-semibold text-gray-800 mb-1">
                          ${source.cost.toFixed(2)}
                        </div>
                        <button
                          onClick={() => openContentSource(source.url)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Access
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};