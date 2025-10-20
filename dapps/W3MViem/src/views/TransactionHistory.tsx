import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Text, FlexView, Button} from '@reown/appkit-ui-react-native';
import {useAccount, useProvider} from '@reown/appkit-react-native';
import {getBlockNumber, getBlock} from 'viem';
import {ToastUtils} from '../utils/ToastUtils';

interface Transaction {
  hash: string;
  blockNumber: bigint;
  timestamp: number;
  from: string;
  to: string;
  value: string;
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {isConnected, address} = useAccount();
  const {provider} = useProvider();

  const fetchRecentTransactions = async () => {
    if (!isConnected || !provider || !address) {
      return;
    }

    setIsLoading(true);
    try {
      // Get the latest block number
      const latestBlockNumber = await getBlockNumber(provider);
      
      // Fetch last 5 blocks to find transactions
      const recentTransactions: Transaction[] = [];
      
      for (let i = 0; i < 5 && recentTransactions.length < 3; i++) {
        const blockNumber = latestBlockNumber - BigInt(i);
        const block = await getBlock(provider, {blockNumber});
        
        if (block.transactions) {
          for (const tx of block.transactions) {
            if (typeof tx === 'object' && 
                (tx.from?.toLowerCase() === address.toLowerCase() || 
                 tx.to?.toLowerCase() === address.toLowerCase())) {
              recentTransactions.push({
                hash: tx.hash,
                blockNumber: block.number,
                timestamp: Number(block.timestamp),
                from: tx.from || '',
                to: tx.to || '',
                value: tx.value.toString(),
              });
            }
          }
        }
      }
      
      setTransactions(recentTransactions.slice(0, 3));
    } catch (error) {
      ToastUtils.showErrorToast('Transaction fetch failed', 'Could not fetch transaction history');
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchRecentTransactions();
    } else {
      setTransactions([]);
    }
  }, [isConnected, address]);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatValue = (value: string) => {
    const eth = parseFloat(value) / 1e18;
    return eth > 0 ? `${eth.toFixed(4)} ETH` : '0 ETH';
  };

  if (!isConnected) {
    return null;
  }

  return (
    <FlexView style={styles.container}>
      <FlexView style={styles.header}>
        <Text variant="medium-600" style={styles.title}>
          Recent Transactions
        </Text>
        <Button 
          variant="outline" 
          size="small" 
          onPress={fetchRecentTransactions}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </Button>
      </FlexView>
      
      {transactions.length === 0 && !isLoading ? (
        <Text variant="small-400" style={styles.emptyText}>
          No recent transactions found
        </Text>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {transactions.map((tx, index) => (
            <FlexView key={tx.hash} style={styles.transactionItem}>
              <FlexView style={styles.transactionHeader}>
                <Text variant="small-600" style={styles.txHash}>
                  {formatAddress(tx.hash)}
                </Text>
                <Text variant="small-400" style={styles.value}>
                  {formatValue(tx.value)}
                </Text>
              </FlexView>
              <Text variant="small-400" style={styles.details}>
                From: {formatAddress(tx.from)} → To: {formatAddress(tx.to)}
              </Text>
              <Text variant="small-400" style={styles.blockNumber}>
                Block: {tx.blockNumber.toString()}
              </Text>
            </FlexView>
          ))}
        </ScrollView>
      )}
    </FlexView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  scrollView: {
    maxHeight: 200,
  },
  transactionItem: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  txHash: {
    fontFamily: 'monospace',
    color: '#007AFF',
  },
  value: {
    fontWeight: 'bold',
    color: '#34C759',
  },
  details: {
    color: '#666',
    marginBottom: 2,
  },
  blockNumber: {
    color: '#999',
    fontSize: 12,
  },
});
