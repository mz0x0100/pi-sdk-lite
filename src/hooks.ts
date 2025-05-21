import { useCallback } from "react";
import { PiPay } from "./payment";
import { PaymentOptions } from "./types";

export function usePiPayment() {
  return useCallback((options: PaymentOptions) => {
    PiPay.create(options);
  }, []);
}
