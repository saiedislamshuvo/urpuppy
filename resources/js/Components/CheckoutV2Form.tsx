import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { usePage, router } from "@inertiajs/react";
import Button from "./ui/Button";
const stripePromise = loadStripe("pk_live_51QCFB5B0xRl9Df0eXVBkh9yxfVuQWwCVbhTKipQGBxKGiidIJF6uYmI5c9uQ6agH6n2BEIMuMc5WfmGDz3gtyQHv00xhwM1fv7");

const CheckoutV2Form = ({ clientSecret, plan_id, type = 'new' }: any) => {
    const [elements, setElements] = useState(null);
    const [stripe, setStripe] = useState<any>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // New state to manage button disable

    useEffect(() => {
        const initializeStripe = async () => {
             const appearance = {
                rules: {
                    '.Input:focus': {
                    boxShadow: 'none',
                    borderColor: '#E88325',
                    borderWidth: '1px',
                    outline: 'none'
                  },
                    '.Tab--selected:focus' : {
                    boxShadow: 'none',
                    outline: 'none',
                        borderColor: '#E88325',

                    color: '#08314E'
                    },
                    '.Tab:focus': {
                        borderColor:  '#E88325',

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
            const elementsInstance = stripeInstance?.elements({ clientSecret, appearance });
            setStripe(stripeInstance);
            setElements(elementsInstance);

            const paymentElement = elementsInstance.create("payment", {
                address: {
                    allowedCountries: ["US"],
                },
            });

            paymentElement.mount("#payment-element");
        };

        if (clientSecret) {
            initializeStripe();
        }
    }, [clientSecret]);

const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setLoading(true);

    const { setupIntent, error }: any = await stripe.confirmSetup({
        elements,
        confirmParams: {
            return_url: "https://urpuppy.com/checkout/" + plan_id, // Ensure this URL is correct
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
                <Button disabled={loading} href="#" type="button" >
                    Checkout
                </Button>
            </div>

        </form>
</>
    );
};

export default CheckoutV2Form;

