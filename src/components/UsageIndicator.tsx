import React, { useState } from 'react';
import { 
  Zap, 
  BookOpen, 
  EyeOff, 
  Maximize2, 
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { useUsageData } from '../hooks/useUsageData';
import { UsageDashboard } from './UsageDashboard';

export const UsageIndicator: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { metrics } = useUsageData();

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const openDashboard = () => {
    setShowDashboard(true);
  };

  const closeDashboard = () => {
    setShowDashboard(false);
  };

  const getStatusColor = () => {
    const tokenPercentage = (metrics.remainingTokens / metrics.totalTokens) * 100;
    if (tokenPercentage > 50) return 'text-green-600';
    if (tokenPercentage > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBgColor = () => {
    const tokenPercentage = (metrics.remainingTokens / metrics.totalTokens) * 100;
    if (tokenPercentage > 50) return 'bg-green-50 border-green-200';
    if (tokenPercentage > 20) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  if (isMinimized) {
    return (
      <>
        <div className={`usage-indicator minimized ${getStatusBgColor()} cursor-pointer hover:shadow-xl transition-shadow`}
             onClick={toggleMinimized}>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Zap className={`w-6 h-6 ${getStatusColor()} mx-auto mb-1`} />
              <div className={`text-xs font-semibold ${getStatusColor()}`}>
                {metrics.remainingTokens}
              </div>
            </div>
          </div>
        </div>
        {showDashboard && <UsageDashboard onClose={closeDashboard} />}
      </>
    );
  }

  return (
    <>
      <div className={`usage-indicator expanded ${getStatusBgColor()}`}>
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">Usage Status</h3>
            <div className="flex gap-1">
              <button
                onClick={openDashboard}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Open detailed dashboard"
              >
                <Maximize2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={toggleMinimized}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Minimize indicator"
              >
                <EyeOff className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            {/* Tokens */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">Tokens</span>
              </div>
              <div className="text-right">
                <div className={`font-semibold text-sm ${getStatusColor()}`}>
                  {metrics.remainingTokens}/{metrics.totalTokens}
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className={`h-1.5 rounded-full transition-all ${
                      metrics.remainingTokens > metrics.totalTokens * 0.5 ? 'bg-green-500' :
                      metrics.remainingTokens > metrics.totalTokens * 0.2 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(metrics.remainingTokens / metrics.totalTokens) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Articles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">Articles</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm text-gray-800">
                  {metrics.articlesAccessed}
                </div>
                <div className="text-xs text-gray-500">
                  accessed
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Balance</span>
              </div>
              <div className="font-semibold text-sm text-gray-800">
                ${metrics.currentBalanceUSD.toFixed(2)}
              </div>
            </div>

            {/* Monthly Usage */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-gray-600">This Month</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm text-gray-800">
                  {metrics.monthlyTokensUsed} tokens
                </div>
                <div className="text-xs text-gray-500">
                  of {metrics.monthlyTokenLimit} limit
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              onClick={openDashboard}
              className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md transition-colors font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      {showDashboard && <UsageDashboard onClose={closeDashboard} />}
    </>
  );
};