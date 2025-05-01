import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_live_51QCFB5B0xRl9Df0eXVBkh9yxfVuQWwCVbhTKipQGBxKGiidIJF6uYmI5c9uQ6agH6n2BEIMuMc5WfmGDz3gtyQHv00xhwM1fv7");

async function confirmPayment() {
    const stripe = await stripePromise;
    const clientSecret = new URLSearchParams(window.location.search).get("client_secret");

    if (clientSecret) {
        const { error }: any = await stripe?.confirmCardPayment(clientSecret);

        if (error) {
            alert("Payment failed: " + error.message);
        } else {
            window.location.href = "/profile?tab=My Subscription";
        }
    }
}

// Run the function when the page loads
confirmPayment();

