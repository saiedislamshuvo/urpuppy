import { l as loadStripe } from "./index-BbhV0dfa.js";
const stripePromise = loadStripe(void 0);
async function confirmPayment() {
  const stripe = await stripePromise;
  const clientSecret = new URLSearchParams(window.location.search).get("client_secret");
  if (clientSecret) {
    const { error } = await (stripe == null ? void 0 : stripe.confirmCardPayment(clientSecret));
    if (error) {
      alert("Payment failed: " + error.message);
    } else {
      window.location.href = "/profile?tab=My Subscription";
    }
  }
}
confirmPayment();
