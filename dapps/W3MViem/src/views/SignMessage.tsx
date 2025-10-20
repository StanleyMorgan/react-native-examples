import React, {useState} from 'react';

import {useAccount, useProvider} from '@reown/appkit-react-native';
import {signMessage} from 'viem';
import {ToastUtils} from '../utils/ToastUtils';
import {LoadingButton} from '../components/LoadingButton';

export function SignMessage() {
  const [isLoading, setIsLoading] = useState(false);

  const {provider} = useProvider();
  const {isConnected, address} = useAccount();

  const onSuccess = (data: any) => {
    ToastUtils.showSuccessToast('Sign successful', data);
  };

  const onError = (error: Error) => {
    ToastUtils.showErrorToast('Sign failed', error.message);
  };

  const onPress = async () => {
    if (!isConnected || !provider || !address) {
      return;
    }

    setIsLoading(true);

    try {
      const signature = await signMessage(provider, {
        account: address as `0x${string}`,
        message: 'hello appkit + viem',
      });
      onSuccess(signature);
    } catch (e) {
      onError(new Error('Error signing message'));
    } finally {
      setIsLoading(false);
    }
  };

  return isConnected ? (
    <LoadingButton 
      isLoading={isLoading} 
      onPress={onPress}
      loadingText="Signing..."
    >
      Sign message
    </LoadingButton>
  ) : null;
}
