# W3M Viem Example

This is a React Native example implementing Reown AppKit with Viem integration.

## Features

- **AppKit Integration**: Modern Web3 modal with multi-chain support
- **Viem Library**: Type-safe Ethereum library for React Native
- **Multi-chain Support**: Ethereum, Polygon, Arbitrum, Solana, and Bitcoin
- **Wallet Integration**: Support for popular wallets like MetaMask, Phantom, Coinbase, etc.
- **Transaction Examples**: Sign messages, send transactions, interact with contracts

## Getting Started

### Prerequisites

- Node.js >= 18
- React Native development environment setup
- iOS Simulator or Android Emulator

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Reown project ID:
   ```
   ENV_PROJECT_ID=your_project_id_here
   ```
   - Get your project ID from [Reown Dashboard](https://dashboard.reown.com)

3. For iOS, install pods:
```bash
cd ios && pod install
```

### Running the App

#### iOS
```bash
yarn ios
```

#### Android
```bash
yarn android
```

## Project Structure

```
src/
├── App.tsx                 # Main application component
├── types/
│   └── env.d.ts           # Environment variable types
├── utils/
│   ├── ChainUtils.ts      # Blockchain network configurations
│   ├── StorageUtil.ts     # Storage utilities
│   ├── ToastUtils.ts      # Toast notification utilities
│   ├── misc.ts            # Miscellaneous utilities
│   ├── eip712.ts          # EIP-712 typed data examples
│   ├── wagmigotchiABI.ts  # Example contract ABI
│   ├── usdtAbi.ts         # USDT contract ABI
│   └── BitcoinUtil.ts     # Bitcoin utilities
└── views/
    ├── ActionsView.tsx        # Main actions container
    ├── WalletInfoView.tsx     # Wallet information display
    ├── ViemActionsView.tsx    # Viem-specific actions
    ├── SignMessage.tsx        # Sign message functionality
    ├── SendTransaction.tsx    # Send transaction functionality
    ├── SignTypedDataV4.tsx    # EIP-712 signing
    ├── ReadContract.tsx       # Read contract data
    ├── WriteContract.tsx      # Write to contracts
    ├── SolanaActionsView.tsx  # Solana-specific actions
    └── BitcoinActionsView.tsx # Bitcoin-specific actions
```

## Key Features

### Viem Integration
- Type-safe Ethereum interactions
- Modern async/await syntax
- Built-in TypeScript support
- Optimized for React Native

### Multi-chain Support
- **Ethereum**: Mainnet support
- **Polygon**: Layer 2 scaling solution
- **Arbitrum**: Optimistic rollup
- **Solana**: High-performance blockchain
- **Bitcoin**: Native Bitcoin support

### Wallet Support
- MetaMask
- Phantom (Solana)
- Coinbase Wallet
- And many more through AppKit

## Example Usage

### Sign a Message
```typescript
import { signMessage } from 'viem';

const signature = await signMessage(provider, {
  account: address,
  message: 'Hello from AppKit + Viem',
});
```

### Send a Transaction
```typescript
import { sendTransaction, parseEther } from 'viem';

const hash = await sendTransaction(provider, {
  account: address,
  to: recipientAddress,
  value: parseEther('0.1'),
});
```

### Read Contract Data
```typescript
import { readContract } from 'viem';

const balance = await readContract(provider, {
  address: contractAddress,
  abi: contractABI,
  functionName: 'balanceOf',
  args: [address],
});
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `yarn start --reset-cache`
2. **iOS build issues**: Clean build folder in Xcode
3. **Android build issues**: Run `cd android && ./gradlew clean`

### Environment Setup

Make sure you have:
- Xcode (for iOS development)
- Android Studio (for Android development)
- Node.js >= 18
- Yarn or npm

## Learn More

- [Reown AppKit Documentation](https://docs.reown.com/appkit)
- [Viem Documentation](https://viem.sh/)
- [React Native Documentation](https://reactnative.dev/)

## Support

For issues and questions:
- [Reown Discord](https://discord.com/invite/kdTQHQ6AFQ)
- [GitHub Issues](https://github.com/reownio/appkit/issues)
