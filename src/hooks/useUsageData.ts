import { useState, useEffect } from 'react';
import type { UsageState, Transaction, ContentSource } from '../types/usage';

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  {
    id: '1',
    timestamp: new Date('2024-01-15T10:30:00'),
    type: 'search',
    amount: 0.25,
    description: 'Search: "machine learning ethics"',
    credits: 1
  },
  {
    id: '2',
    timestamp: new Date('2024-01-15T11:15:00'),
    type: 'access',
    amount: 2.50,
    description: 'Accessed: "AI Ethics in Healthcare"',
    publisher: 'Wiley',
    contentTitle: 'AI Ethics in Healthcare: A Comprehensive Review',
    contentUrl: 'https://wiley.com/article/ai-ethics-healthcare',
    credits: 5
  },
  {
    id: '3',
    timestamp: new Date('2024-01-14T14:20:00'),
    type: 'credit_purchase',
    amount: 25.00,
    description: 'Credit purchase: 100 credits',
    credits: 100
  }
];

const mockContentSources: ContentSource[] = [
  {
    id: '1',
    title: 'AI Ethics in Healthcare: A Comprehensive Review',
    publisher: 'Wiley',
    url: 'https://wiley.com/article/ai-ethics-healthcare',
    accessedAt: new Date('2024-01-15T11:15:00'),
    cost: 2.50,
    contentType: 'article'
  },
  {
    id: '2',
    title: 'Machine Learning Bias Detection Methods',
    publisher: 'Sage Publications',
    url: 'https://sage.com/article/ml-bias-detection',
    accessedAt: new Date('2024-01-14T16:30:00'),
    cost: 1.75,
    contentType: 'journal'
  }
];

export const useUsageData = () => {
  const [usageState, setUsageState] = useState<UsageState>({
    metrics: {
      remainingCredits: 87,
      totalCredits: 100,
      remainingSearches: 43,
      totalSearches: 50,
      currentBalance: 22.50,
      monthlySpend: 27.50,
      monthlyLimit: 100.00
    },
    transactions: mockTransactions,
    contentSources: mockContentSources,
    isLoading: false,
    lastUpdated: new Date()
  });

  // Simulate API calls
  const refreshUsageData = async () => {
    setUsageState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUsageState(prev => ({
      ...prev,
      isLoading: false,
      lastUpdated: new Date()
    }));
  };

  useEffect(() => {
    // Initial data load
    refreshUsageData();
  }, []);

  return {
    ...usageState,
    refreshUsageData
  };
};