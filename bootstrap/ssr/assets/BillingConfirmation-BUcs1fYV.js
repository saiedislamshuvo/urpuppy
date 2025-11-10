import { l as loadStripe } from "./index-BbhV0dfa.js";
const stripePromise = loadStripe("pk_live_51QCFB5B0xRl9Df0eXVBkh9yxfVuQWwCVbhTKipQGBxKGiidIJF6uYmI5c9uQ6agH6n2BEIMuMc5WfmGDz3gtyQHv00xhwM1fv7");
async function confirmPayment() {
  const stripe = await stripePromise;
  const clientSecret = new URLSearchParams(window.location.search).get("client_secret");
  if (clientSecret) {
    const { error } = await (stripe == null ? void 0 : stripe.confirmCardPayment(clientSecret));
    if (error) {
      alert("Payment failed: " + error.message);
    } else {
      window.location.href = "/my-subscription";
    }
  }
}
confirmPayment();
