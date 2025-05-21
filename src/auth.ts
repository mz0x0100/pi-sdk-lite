// src/auth.ts
import { AuthResult, PiScope, DEFAULT_SCOPES } from "./types";

export interface AuthOptions {
  /**
   * Which Pi scopes to request.
   * @default DEFAULT_SCOPES
   */
  scopes?: PiScope[];

  /**
   * Called when the SDK finds an incomplete payment left over.
   */
  onIncompletePaymentFound?: (payment: any) => void;
}

export class PiAuth {
  /**
   * Authenticate the current user with Pi in a single call.
   */
  static async authenticate(options: AuthOptions = {}): Promise<AuthResult> {
    const scopes = options.scopes ?? DEFAULT_SCOPES;
    const onIncomplete = options.onIncompletePaymentFound ?? (() => {});

    // wrap the global call internally
    const result = await window.Pi.authenticate(scopes, onIncomplete);

    return {
      accessToken: result.accessToken,
      user: {
        uid: result.user.uid,
        username: result.user.username,
      },
    };
  }
}
