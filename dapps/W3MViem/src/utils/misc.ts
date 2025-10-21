// Test address for sending transactions
export const testAddress = "0x742d35Cc6634C0532925a3b8D0C0E1c4C5f2E2E2";

/**
 * Truncates a given address to a shorter format for display.
 * @param address The full address string.
 * @param startLength The number of characters to show at the beginning (default: 6).
 * @param endLength The number of characters to show at the end (default: 4).
 * @returns The truncated address string, e.g., "0x1234...abcd".
 */
export function truncateAddress(
  address: string,
  startLength = 6,
  endLength = 4
): string {
  if (!address || address.length <= startLength + endLength) {
    return address;
  }
  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength
  )}`;
}
