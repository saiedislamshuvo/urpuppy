import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

async function confirmPayment() {
    const stripe = await stripePromise;
    const clientSecret = new URLSearchParams(window.location.search).get("client_secret");

    if (clientSecret) {
        const { error }: any = await stripe?.confirmCardPayment(clientSecret);

        if (error) {
            alert("Payment failed: " + error.message);
        } else {
            window.location.href = "/my-subscription";
        }
    }
}

// Run the function when the page loads
confirmPayment();

