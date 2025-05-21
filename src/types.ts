// src/types.ts
export type AuthResult = {
  accessToken: string;
  user: {
    uid: string;
    username: string;
  };
};

export enum PiScope {
  Payments = "payments",
  Username = "username",
  Roles = "roles",
  Platform = "platform",
  WalletAddress = "wallet_address",
  PreferredLanguage = "preferred_language",
}

// default scopes you want every consumer to get
export const DEFAULT_SCOPES: PiScope[] = [PiScope.Username, PiScope.Payments];

export type PaymentMetadata = Record<string, any>;

export type PaymentResult = {
  paymentId: string;
  txid: string; // on server completion
  serverResponse: any; // whatever your backend returns
};

export interface PaymentOptions {
  /**
   * Amount of Pi to pay.
   */
  amount: number;

  /**
   * Memo or description shown in the Pi app.
   */
  memo: string;

  /**
   * Arbitrary metadata you want returned to your server.
   */
  metadata?: PaymentMetadata;

  /**
   * Called before asking your server to approve the payment.
   * Should call your backend endpoint to mark “approved”.
   */
  onApprove: (paymentId: string) => Promise<void>;

  /**
   * Called after server returns completion data.
   * Receives your backend’s response.
   */
  onComplete: (result: PaymentResult) => void;

  /**
   * Called if the user cancels in the Pi app.
   */
  onCancel?: (paymentId: string) => void;

  /**
   * Called on any error in the flow.
   */
  onError?: (err: Error, paymentId?: string) => void;
}
