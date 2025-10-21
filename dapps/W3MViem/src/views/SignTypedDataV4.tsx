import React, { useState } from "react";
import { Button } from "@reown/appkit-ui-react-native";
import { useAccount, useProvider } from "@reown/appkit-react-native";
import { signTypedData } from "viem";

import { eip712 } from "../utils/eip712";
import { ToastUtils } from "../utils/ToastUtils";

export function SignTypedDataV4() {
  const [isLoading, setIsLoading] = useState(false);
  const { provider } = useProvider();
  const { isConnected, address } = useAccount();

  const onSuccess = (data: any) => {
    ToastUtils.showSuccessToast("Sign successful", data);
  };

  const onError = (error: Error) => {
    ToastUtils.showErrorToast("Sign failed", error.message);
  };

  const onPress = async () => {
    if (!isConnected || !provider || !address) {
      return;
    }

    setIsLoading(true);

    try {
      const signature = await signTypedData(provider, {
        account: address as `0x${string}`,
        domain: eip712.example.domain,
        types: eip712.example.types,
        primaryType: eip712.example.primaryType,
        message: eip712.example.message,
      });

      onSuccess(signature);
    } catch (e) {
      console.log(e);
      onError(new Error("Error signing typed data"));
    } finally {
      setIsLoading(false);
    }
  };

  return isConnected ? (
    <Button disabled={isLoading} onPress={onPress}>
      {isLoading ? "Loading..." : "Sign typed data"}
    </Button>
  ) : null;
}
