import React, {useState} from 'react';

import {Button} from '@reown/appkit-ui-react-native';
import {useAccount, useProvider} from '@reown/appkit-react-native';
import {sendTransaction, parseEther} from 'viem';

import {testAddress} from '../utils/misc';
import {ToastUtils} from '../utils/ToastUtils';

export function SendTransaction() {
  const [isLoading, setIsLoading] = useState(false);

  const {provider} = useProvider();
  const {isConnected, address} = useAccount();

  const onSuccess = (data: any) => {
    ToastUtils.showSuccessToast('Send successful', data);
  };

  const onError = (error: Error) => {
    ToastUtils.showErrorToast('Send failed', error.message);
  };

  const onPress = async () => {
    if (!isConnected || !provider || !address) {
      return;
    }

    setIsLoading(true);

    try {
      const hash = await sendTransaction(provider, {
        account: address as `0x${string}`,
        to: testAddress as `0x${string}`,
        value: parseEther('0.0001'),
        data: '0x',
      });
      onSuccess(hash);
    } catch (e) {
      onError(new Error('Error sending transaction'));
    } finally {
      setIsLoading(false);
    }
  };

  return isConnected ? (
    <Button disabled={isLoading} onPress={onPress}>
      {isLoading ? 'Loading...' : 'Send transaction'}
    </Button>
  ) : null;
}
