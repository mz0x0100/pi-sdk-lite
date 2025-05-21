// src/payment.ts

import { PaymentOptions, PaymentResult } from "./types";

export class PiPay {
  /**
   * Start a Pi payment flow.
   */
  static create(options: PaymentOptions): void {
    const {
      amount,
      memo,
      metadata,
      onApprove,
      onComplete,
      onCancel = () => {},
      onError = () => {},
    } = options;

    window.Pi.createPayment(
      { amount, memo, metadata },
      {
        // Step 1: ready for your server to approve
        onReadyForServerApproval: async (paymentId: string) => {
          try {
            await onApprove(paymentId);
          } catch (err) {
            onError(err as Error, paymentId);
          }
        },

        // Step 2: server has approved and Pi has processed – complete on backend
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          try {
            // let user finalize server-side and return its response
            const serverResponse = (await options.onApprove)
              ? undefined
              : undefined; // (no-op if handled in onApprove)
            const result: PaymentResult = { paymentId, txid, serverResponse };
            onComplete(result);
          } catch (err) {
            onError(err as Error, paymentId);
          }
        },

        // User cancelled in Pi
        onCancel: (paymentId: string) => {
          onCancel(paymentId);
        },

        // SDK / network error
        onError: (error: Error, payment: any) => {
          onError(error, payment?.id);
        },
      }
    );
  }
}
