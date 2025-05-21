# Pi SDK Lite

A lightweight TypeScript/JavaScript wrapper for integrating [Pi Network](https://minepi.com/) authentication and payments into your app with minimal configuration.

> ✅ Supports Node + ESM + Browser global environments
>
> ⚡️ Handles both `authenticate()` and `createPayment()` flows with clean types

---

## ⚠️ Pi SDK Dependency

This package **depends on the official Pi SDK script** to be loaded globally.

In your HTML file, **include this script before using `pi-sdk-lite`**:

```html
<script src="https://sdk.minepi.com/pi-sdk.js"></script>
```

---

## 📦 Installation

```bash
npm install pi-sdk-lite
```

---

## 🔐 Authentication

```ts
import { PiAuth } from "pi-sdk-lite";

async function login() {
  const result = await PiAuth.authenticate({
    scopes: ["username", "payments"]
  });

  console.log("Authenticated:", result);
  // result.accessToken
  // result.user.username
}
```

### 🔁 Handle Incomplete Payments

```ts
await PiAuth.authenticate({
  onIncompletePaymentFound: (payment) => {
    console.log("User has unfinished payment:", payment);
  }
});
```

---

## 💸 Payments

```ts
import { PiPay } from "pi-sdk-lite";

PiPay.create({
  amount: 3.14,
  memo: "Your payment memo",
  metadata: { context: "purchase" },

  async onApprove(paymentId) {
    await fetch("/api/payments/approve", {
      method: "POST",
      body: JSON.stringify({ paymentId })
    });
  },

  onComplete({ txid, paymentId }) {
    console.log("Payment completed!", txid);
  },

  onCancel(paymentId) {
    console.log("User cancelled", paymentId);
  },

  onError(err, paymentId) {
    console.error("Error in payment", err, paymentId);
  }
});
```

---

## 🪝 React Hook

```tsx
import { usePiPayment } from "pi-sdk-lite";

const pay = usePiPayment();

function handlePayNow() {
  pay({
    amount: 1,
    memo: "Test transaction",
    async onApprove(id) {
      await fetch("/api/payments/approve", { method: "POST", body: JSON.stringify({ id }) });
    },
    onComplete(result) {
      console.log("Done!", result);
    },
    onError(err) {
      console.error(err);
    },
  });
}
```

---

## 📘 Types

### AuthResult

```ts
{
  accessToken: string;
  user: {
    uid: string;
    username: string;
  };
}
```

### PaymentOptions

```ts
{
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
  onApprove: (paymentId: string) => Promise<void>;
  onComplete: (result: PaymentResult) => void;
  onCancel?: (paymentId: string) => void;
  onError?: (err: Error, paymentId?: string) => void;
}
```

### PaymentResult

```ts
{
  paymentId: string;
  txid: string;
  serverResponse: any;
}
```

---

## 🧪 Example HTML Usage

```html
<script src="https://sdk.minepi.com/pi-sdk.js"></script>
<script src="/dist/index.global.js"></script>
<script>
  PiConnect.PiAuth.authenticate().then(console.log);
</script>
```

> When using `index.global.js`, the SDK is exposed under the `PiConnect` global.

---

## 🧱 Build Outputs

| Format | File                   | Use Case              |
| ------ | ---------------------- | --------------------- |
| ESM    | `dist/index.mjs`       | Modern bundlers       |
| CJS    | `dist/index.js`        | CommonJS (Node)       |
| IIFE   | `dist/index.global.js` | `<script>` tag (HTML) |
| Types  | `dist/index.d.ts`      | TypeScript support    |

---

## 🔖 License

MIT © 2025 Muhammad Adamu Kala
