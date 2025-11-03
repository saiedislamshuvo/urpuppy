import { l as loadStripe } from "./index-BbhV0dfa.js";
const stripePromise = loadStripe("pk_test_51Hb5RYEVMkNoHaA6mVr0T6iuLDi2TNkBa94e6At9DPm37ENzrq8W9l3yI2EZnvLkgJa2ykoP2PIRmSPJusz4tonA004LN5z3Ee");
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
