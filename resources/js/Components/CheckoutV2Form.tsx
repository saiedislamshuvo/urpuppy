import React, { useEffect, useState, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { usePage, router } from "@inertiajs/react";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutV2Form = ({ clientSecret, plan_id, type = 'new' }: any) => {

    const [elements, setElements] = useState(null);
    const [stripe, setStripe] = useState<any>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const paymentElementRef = useRef<any>(null);

    useEffect(() => {
        const initializeStripe = async () => {
            try {
                // Validate clientSecret before proceeding
                if (!clientSecret || typeof clientSecret !== 'string' || clientSecret.trim() === '') {
                    setMessage("Payment initialization error: Invalid payment configuration. Please refresh the page.");
                    return;
                }

                // Validate clientSecret format (Stripe client secrets typically start with "seti_", "pi_", or "si_")
                const trimmedSecret = clientSecret.trim();
                if (!trimmedSecret.match(/^(seti_|pi_|si_)/)) {
                    setMessage("Payment initialization error: Invalid payment configuration. Please refresh the page.");
                    return;
                }

                const appearance = {
                    rules: {
                        '.Input:focus': {
                            boxShadow: 'none',
                            borderColor: '#E88325',
                            borderWidth: '1px',
                            outline: 'none'
                        },
                        '.Tab--selected:focus': {
                            boxShadow: 'none',
                            outline: 'none',
                            borderColor: '#E88325',

                            color: '#08314E'
                        },
                        '.Tab:focus': {
                            borderColor: '#E88325',

                            color: '#08314E'
                        },
                        '.Tab--selected:hover': {
                            color: '#08314E'
                        },

                        '.Tab--selected': {
                            boxShadow: 'none',
                            borderColor: '#E88325',
                            borderWidth: '2px',
                            outline: 'none',
                            color: '#08314E'

                        },
                        '.Tab--hover': {
                            boxShadow: 'none',
                            outline: 'none',

                            color: '#08314E'
                        },

                        '.Input': {
                            borderRadius: '150px',
                            boxShadow: 'none'
                        },

                        'p-TabLabel:hover': {
                            color: '08314E'

                        },
                        '.Label': {
                            fontFamily: '"Work Sans", sans-serif',
                            fontSize: '1rem',
                            fontWeight: '500',
                            color: '#08314E',
                            marginBottom: '0.6rem',
                        },

                    },
                }

                const stripeInstance = await stripePromise as any;

                if (!stripeInstance) {
                    setMessage("Failed to load payment processor. Please refresh the page.");
                    return;
                }

                // Ensure clientSecret is passed as a clean string to Stripe
                const elementsInstance = stripeInstance?.elements({
                    clientSecret: trimmedSecret,
                });

                if (!elementsInstance) {
                    setMessage("Failed to initialize payment form. Please refresh the page.");
                    return;
                }

                setStripe(stripeInstance);
                setElements(elementsInstance);

                const paymentElement = elementsInstance.create("payment", {
                    address: {
                        allowedCountries: ["US"],
                    },
                });

                paymentElementRef.current = paymentElement;
                paymentElement.mount("#payment-element");
            } catch (error: any) {
                console.error('Stripe initialization error:', error);
                setMessage("Failed to initialize payment form. Please refresh the page.");
            }
        };

        if (clientSecret) {
            initializeStripe();
        }

        return () => {
            if (paymentElementRef.current) {
                try {
                    paymentElementRef.current.unmount();
                } catch (error) {
                    // Ignore unmount errors
                }
            }
        };
    }, [clientSecret]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!stripe || !elements) return;
        setLoading(true);

        const { setupIntent, error }: any = await stripe.confirmSetup({
            elements,
            confirmParams: {
                return_url: "https://urpuppy.com/checkout/" + plan_id,
            },
            redirect: "if_required"
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred.");
            }
            setLoading(false);
        } else {
            // If no error, check if the SetupIntent requires further action (e.g., redirect)
            if (setupIntent.status === "requires_action") {
                // Stripe will handle the redirect automatically
                return;
            } else if (setupIntent.status === "succeeded") {
                // Payment succeeded, submit the data to your backend
                const data = {
                    paymentMethod: setupIntent.payment_method,
                    type: type,
                    plan_id,
                    _token: csrf,
                };

                // Use Inertia.js router to submit the data
                router.post("/checkout/complete", data, {
                    onError: (errors) => {
                        setMessage("Failed to submit payment details.");
                        setLoading(false);
                    },
                    onSuccess: () => {
                        setLoading(false);
                        setMessage("Payment details submitted successfully.");
                    },
                });
            } else {
                setMessage("Payment failed. Please try again.");
                setLoading(false);
            }
        }
    };

    const csrf = usePage().props.csrf_token as string;

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>
                <input type="hidden" name="_token" value={csrf} />
                <input type="hidden" name="plan_id" value={plan_id} />

                <div id="payment-element">
                    {/* Stripe.js injects the Payment Element */}
                </div>


                {message && (
                    <div id="payment-message" className="mt-4 text-danger">
                        {message}
                    </div>
                )}

                <div className="mt-2">
                    <button
                        type="submit"
                        disabled={loading || !stripe || !elements}
                        className="btn btn-primary"
                    >
                        {loading ? 'Processing...' : 'Checkout'}
                    </button>
                </div>

            </form>
        </>
    );
};

export default CheckoutV2Form;

