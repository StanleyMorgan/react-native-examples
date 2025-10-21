import React from "react";
import { StyleSheet } from "react-native";
import { Text, FlexView } from "@reown/appkit-ui-react-native";
import { useAccount } from "@reown/appkit-react-native";

export function ConnectionStatus() {
  const { isConnected, address, chainId } = useAccount();

  if (!isConnected) {
    return (
      <FlexView style={[styles.container, styles.disconnected]}>
        <FlexView style={styles.indicator} />
        <Text variant="small-600" style={styles.text}>
          Not Connected
        </Text>
      </FlexView>
    );
  }

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return "Ethereum";
      case 137:
        return "Polygon";
      case 42161:
        return "Arbitrum";
      default:
        return `Chain ${chainId}`;
    }
  };

  return (
    <FlexView style={[styles.container, styles.connected]}>
      <FlexView style={[styles.indicator, styles.connectedIndicator]} />
      <FlexView style={styles.statusInfo}>
        <Text variant="small-600" style={styles.text}>
          Connected to {getNetworkName(chainId)}
        </Text>
        <Text variant="small-400" style={styles.address}>
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
        </Text>
      </FlexView>
    </FlexView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    gap: 8,
  },
  connected: {
    backgroundColor: "#e8f5e8",
    borderWidth: 1,
    borderColor: "#4caf50",
  },
  disconnected: {
    backgroundColor: "#ffeaea",
    borderWidth: 1,
    borderColor: "#f44336",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f44336",
  },
  connectedIndicator: {
    backgroundColor: "#4caf50",
  },
  statusInfo: {
    flex: 1,
  },
  text: {
    color: "#333",
  },
  address: {
    color: "#666",
    fontFamily: "monospace",
    marginTop: 2,
  },
});
