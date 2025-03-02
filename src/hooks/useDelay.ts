export function useDelay() {
  return (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
}
