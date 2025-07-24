export interface UsageMetrics {
  remainingTokens: number;
  totalTokens: number;
  monthlyTokensUsed: number;
  monthlyTokenLimit: number;
  currentBalanceUSD: number;
  tokenToUSDRate: number; // How much 1 token costs in USD
  articlesAccessed: number;
  uniquePublishers: number;
}

export interface Transaction {
  id: string;
  timestamp: Date;
  type: 'response_generation' | 'content_access' | 'token_purchase' | 'refund';
  tokensUsed: number;
  usdAmount: number;
  description: string;
  publisher?: string;
  contentTitle?: string;
  contentUrl?: string;
  responseId?: string;
}

export interface ContentSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  accessedAt: Date;
  tokensUsed: number;
  contentType: 'article' | 'chapter' | 'book' | 'journal';
  excerpt?: string;
  doi?: string;
  publicationDate?: Date;
}

export interface ResponseVariant {
  id: string;
  content: string;
  sources: ContentSource[];
  tokensUsed: number;
  confidence: number;
  uniqueReferences: number;
}

export interface ConversationMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  responseVariants?: ResponseVariant[];
  selectedVariantId?: string;
}

export interface UsageState {
  metrics: UsageMetrics;
  transactions: Transaction[];
  contentSources: ContentSource[];
  conversationHistory: ConversationMessage[];
  isLoading: boolean;
  lastUpdated: Date;
}