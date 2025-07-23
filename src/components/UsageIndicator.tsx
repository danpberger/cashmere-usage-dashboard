import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
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
    const creditPercentage = (metrics.remainingCredits / metrics.totalCredits) * 100;
    if (creditPercentage > 50) return 'text-green-600';
    if (creditPercentage > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBgColor = () => {
    const creditPercentage = (metrics.remainingCredits / metrics.totalCredits) * 100;
    if (creditPercentage > 50) return 'bg-green-50 border-green-200';
    if (creditPercentage > 20) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  if (isMinimized) {
    return (
      <>
        <div className={`usage-indicator minimized ${getStatusBgColor()} cursor-pointer hover:shadow-xl transition-shadow`}
             onClick={toggleMinimized}>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <CreditCard className={`w-6 h-6 ${getStatusColor()} mx-auto mb-1`} />
              <div className={`text-xs font-semibold ${getStatusColor()}`}>
                {metrics.remainingCredits}
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
            {/* Credits */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">Credits</span>
              </div>
              <div className="text-right">
                <div className={`font-semibold text-sm ${getStatusColor()}`}>
                  {metrics.remainingCredits}/{metrics.totalCredits}
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className={`h-1.5 rounded-full transition-all ${
                      metrics.remainingCredits > metrics.totalCredits * 0.5 ? 'bg-green-500' :
                      metrics.remainingCredits > metrics.totalCredits * 0.2 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(metrics.remainingCredits / metrics.totalCredits) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Searches */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">Searches</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm text-gray-800">
                  {metrics.remainingSearches}/{metrics.totalSearches}
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-purple-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${(metrics.remainingSearches / metrics.totalSearches) * 100}%` }}
                  />
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
                ${metrics.currentBalance.toFixed(2)}
              </div>
            </div>

            {/* Monthly Spend */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-gray-600">This Month</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm text-gray-800">
                  ${metrics.monthlySpend.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  of ${metrics.monthlyLimit.toFixed(2)}
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