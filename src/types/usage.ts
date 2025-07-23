export interface UsageMetrics {
  remainingCredits: number;
  totalCredits: number;
  remainingSearches: number;
  totalSearches: number;
  currentBalance: number;
  monthlySpend: number;
  monthlyLimit: number;
}

export interface Transaction {
  id: string;
  timestamp: Date;
  type: 'search' | 'access' | 'credit_purchase' | 'refund';
  amount: number;
  description: string;
  publisher?: string;
  contentTitle?: string;
  contentUrl?: string;
  credits?: number;
}

export interface ContentSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  accessedAt: Date;
  cost: number;
  contentType: 'article' | 'chapter' | 'book' | 'journal';
}

export interface UsageState {
  metrics: UsageMetrics;
  transactions: Transaction[];
  contentSources: ContentSource[];
  isLoading: boolean;
  lastUpdated: Date;
}