import React from "react";
import { StyleSheet } from "react-native";
import { Text, FlexView, Button } from "@reown/appkit-ui-react-native";
import { useAccount, useSwitchNetwork } from "@reown/appkit-react-native";
import { mainnet, polygon, arbitrum } from "../utils/ChainUtils";

const networks = [
  { id: 1, name: "Ethereum", chain: mainnet },
  { id: 137, name: "Polygon", chain: polygon },
  { id: 42161, name: "Arbitrum", chain: arbitrum },
];

export function NetworkSwitcher() {
  const { isConnected, chainId } = useAccount();
  const { switchNetwork } = useSwitchNetwork();

  if (!isConnected) {
    return null;
  }

  const currentNetwork = networks.find((network) => network.id === chainId);

  return (
    <FlexView style={styles.container}>
      <Text variant="medium-600" style={styles.title}>
        Network Switcher
      </Text>
      <Text variant="small-400" style={styles.currentNetwork}>
        Current: {currentNetwork?.name || "Unknown"}
      </Text>
      <FlexView style={styles.buttonContainer}>
        {networks.map((network) => (
          <Button
            key={network.id}
            variant={chainId === network.id ? "main" : "outline"}
            size="small"
            onPress={() => switchNetwork(network.chain)}
            style={styles.networkButton}
          >
            {network.name}
          </Button>
        ))}
      </FlexView>
    </FlexView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    gap: 8,
  },
  title: {
    textAlign: "center",
  },
  currentNetwork: {
    textAlign: "center",
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  networkButton: {
    flex: 1,
    minWidth: 80,
  },
});
