import { createContext, ReactNode, useContext, useState } from "react";
import { FoodItem } from "../types/FoodItem"; // ✅ Import the FoodItem type

type ScannerContextType = {
  scannedItem: FoodItem | null;
  setScannedItem: (item: FoodItem | null) => void;
};

const ScannerContext = createContext<ScannerContextType | undefined>(undefined);

export const ScannerProvider = ({ children }: { children: ReactNode }) => {
  const [scannedItem, setScannedItem] = useState<FoodItem | null>(null);

  return (
    <ScannerContext.Provider value={{ scannedItem, setScannedItem }}>
      {children}
    </ScannerContext.Provider>
  );
};

export const useScannerContext = () => {
  const context = useContext(ScannerContext);
  if (!context) {
    throw new Error("useScannerContext must be used within a ScannerProvider");
  }
  return context;
};
