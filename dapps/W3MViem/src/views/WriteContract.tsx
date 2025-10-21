import React, { useState } from "react";
import { Button } from "@reown/appkit-ui-react-native";
import { useAccount, useProvider } from "@reown/appkit-react-native";
import { writeContract } from "viem";

import usdtAbi from "../utils/usdtAbi";
import { ToastUtils } from "../utils/ToastUtils";

export function WriteContract() {
  const [isLoading, setIsLoading] = useState(false);

  const { provider } = useProvider();
  const { isConnected, address } = useAccount();

  const onSuccess = (data: any) => {
    ToastUtils.showSuccessToast("Write successful", data);
  };
  const onError = (error: Error) => {
    ToastUtils.showErrorToast("Write failed", error.message);
  };

  const onPress = async () => {
    if (!isConnected || !provider || !address) {
      return;
    }

    setIsLoading(true);

    try {
      const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      const hash = await writeContract(provider, {
        address: contractAddress as `0x${string}`,
        abi: usdtAbi,
        functionName: "approve",
        args: [address as `0x${string}`, BigInt(100000)],
        account: address as `0x${string}`,
      });
      onSuccess(hash);
    } catch (e) {
      onError(new Error("Error writing contract"));
    } finally {
      setIsLoading(false);
    }
  };

  return isConnected ? (
    <Button disabled={isLoading} onPress={onPress}>
      {isLoading ? "Loading..." : "Write contract"}
    </Button>
  ) : null;
}
