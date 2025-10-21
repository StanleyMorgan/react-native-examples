import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, FlexView, Button } from "@reown/appkit-ui-react-native";
import { useAccount, useProvider } from "@reown/appkit-react-native";
import { getBalance, formatEther } from "viem";
import { ToastUtils } from "../utils/ToastUtils";

export function BalanceView() {
  const [balance, setBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected, address, chainId } = useAccount();
  const { provider } = useProvider();

  const fetchBalance = async () => {
    if (!isConnected || !provider || !address) {
      return;
    }

    setIsLoading(true);
    try {
      const balanceWei = await getBalance(provider, {
        address: address as `0x${string}`,
      });
      const balanceEth = formatEther(balanceWei);
      setBalance(parseFloat(balanceEth).toFixed(4));
    } catch (error) {
      ToastUtils.showErrorToast(
        "Balance fetch failed",
        "Could not fetch balance"
      );
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchBalance();
    } else {
      setBalance("0");
    }
  }, [isConnected, address, chainId]);

  if (!isConnected) {
    return null;
  }

  return (
    <FlexView style={styles.container}>
      <Text variant="medium-600" style={styles.title}>
        Wallet Balance
      </Text>
      <FlexView style={styles.balanceContainer}>
        <Text variant="large-600" style={styles.balance}>
          {isLoading ? "Loading..." : `${balance} ETH`}
        </Text>
        <Button
          variant="outline"
          size="small"
          onPress={fetchBalance}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </FlexView>
    </FlexView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    gap: 8,
  },
  title: {
    textAlign: "center",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balance: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
