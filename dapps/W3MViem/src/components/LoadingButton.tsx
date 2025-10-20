import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Button, ButtonProps} from '@reown/appkit-ui-react-native';

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

export function LoadingButton({
  isLoading = false,
  loadingText = 'Loading...',
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled || isLoading}
      style={[styles.button, props.style]}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={props.variant === 'main' ? '#fff' : '#007AFF'} 
        />
      ) : (
        children
      )}
      {isLoading && loadingText && (
        <span style={styles.loadingText}>{loadingText}</span>
      )}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loadingText: {
    marginLeft: 8,
  },
});
