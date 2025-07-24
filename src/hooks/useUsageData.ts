import { useState, useEffect } from 'react';
import type { UsageState, Transaction, ContentSource, ConversationMessage } from '../types/usage';

// Mock data for Version 2 - Token-based system
const mockTransactions: Transaction[] = [
  {
    id: '1',
    timestamp: new Date('2024-01-15T10:30:00'),
    type: 'response_generation',
    tokensUsed: 15,
    usdAmount: 0.30,
    description: 'Generated response: "machine learning ethics research"',
    responseId: 'resp_001'
  },
  {
    id: '2',
    timestamp: new Date('2024-01-15T11:15:00'),
    type: 'content_access',
    tokensUsed: 25,
    usdAmount: 0.50,
    description: 'Accessed content from multiple sources',
    publisher: 'Multiple Publishers'
  },
  {
    id: '3',
    timestamp: new Date('2024-01-14T14:20:00'),
    type: 'token_purchase',
    tokensUsed: -500,
    usdAmount: 25.00,
    description: 'Token purchase: 500 tokens'
  },
  {
    id: '4',
    timestamp: new Date('2024-01-14T16:45:00'),
    type: 'response_generation',
    tokensUsed: 22,
    usdAmount: 0.44,
    description: 'Generated response: "sustainable AI development"',
    responseId: 'resp_002'
  }
];

const mockContentSources: ContentSource[] = [
  {
    id: '1',
    title: 'AI Ethics in Healthcare: A Comprehensive Review',
    publisher: 'Wiley',
    url: 'https://wiley.com/article/ai-ethics-healthcare',
    accessedAt: new Date('2024-01-15T11:15:00'),
    tokensUsed: 12,
    contentType: 'article',
    excerpt: 'This comprehensive review examines the ethical implications of AI in healthcare settings...',
    doi: '10.1002/widm.1234',
    publicationDate: new Date('2024-01-10')
  },
  {
    id: '2',
    title: 'Machine Learning Bias Detection Methods',
    publisher: 'Sage Publications',
    url: 'https://sage.com/article/ml-bias-detection',
    accessedAt: new Date('2024-01-14T16:30:00'),
    tokensUsed: 8,
    contentType: 'journal',
    excerpt: 'Novel approaches to detecting and mitigating bias in machine learning algorithms...',
    doi: '10.1177/sage.2024.5678',
    publicationDate: new Date('2024-01-05')
  },
  {
    id: '3',
    title: 'Sustainable Computing: Green AI Initiatives',
    publisher: 'Nature',
    url: 'https://nature.com/article/sustainable-computing',
    accessedAt: new Date('2024-01-14T16:45:00'),
    tokensUsed: 15,
    contentType: 'article',
    excerpt: 'Exploring energy-efficient approaches to artificial intelligence development...',
    doi: '10.1038/nature.2024.9012',
    publicationDate: new Date('2024-01-08')
  },
  {
    id: '4',
    title: 'Federated Learning Privacy Frameworks',
    publisher: 'ACM Digital Library',
    url: 'https://acm.org/article/federated-learning-privacy',
    accessedAt: new Date('2024-01-13T14:20:00'),
    tokensUsed: 10,
    contentType: 'journal',
    excerpt: 'Novel privacy-preserving techniques in distributed machine learning systems...',
    doi: '10.1145/acm.2024.3456',
    publicationDate: new Date('2024-01-03')
  }
];

const mockConversationHistory: ConversationMessage[] = [
  {
    id: 'msg_001',
    type: 'user',
    content: 'Can you help me find recent research on machine learning ethics?',
    timestamp: new Date('2024-01-15T10:30:00')
  },
  {
    id: 'msg_002',
    type: 'assistant',
    content: 'I found several relevant papers from reputable publishers. Here are the most recent findings on ML ethics, including perspectives from IEEE, ACM, and Nature publications.',
    timestamp: new Date('2024-01-15T10:31:00'),
    responseVariants: [
      {
        id: 'var_001',
        content: 'I found several relevant papers from reputable publishers. Here are the most recent findings on ML ethics, including perspectives from IEEE, ACM, and Nature publications.',
        sources: [mockContentSources[0], mockContentSources[1]],
        tokensUsed: 15,
        confidence: 0.92,
        uniqueReferences: 2
      },
      {
        id: 'var_002',
        content: 'Based on my search through academic databases, I\'ve compiled recent research on machine learning ethics from leading journals and conferences.',
        sources: [mockContentSources[0], mockContentSources[3]],
        tokensUsed: 18,
        confidence: 0.88,
        uniqueReferences: 2
      },
      {
        id: 'var_003',
        content: 'Here\'s a comprehensive overview of the latest ML ethics research, drawing from multiple authoritative sources including recent peer-reviewed publications.',
        sources: [mockContentSources[1], mockContentSources[2]],
        tokensUsed: 20,
        confidence: 0.85,
        uniqueReferences: 2
      }
    ],
    selectedVariantId: 'var_001'
  }
];

export const useUsageData = () => {
  const [usageState, setUsageState] = useState<UsageState>({
    metrics: {
      remainingTokens: 438,
      totalTokens: 500,
      monthlyTokensUsed: 162,
      monthlyTokenLimit: 1000,
      currentBalanceUSD: 23.75,
      tokenToUSDRate: 0.02, // $0.02 per token
      articlesAccessed: 12,
      uniquePublishers: 8
    },
    transactions: mockTransactions,
    contentSources: mockContentSources,
    conversationHistory: mockConversationHistory,
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