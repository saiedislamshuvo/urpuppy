import { r as reactExports, q, j as jsxRuntimeExports, f as fe } from "../ssr.js";
import { l as loadStripe } from "./index-BbhV0dfa.js";
const stripePromise = loadStripe("pk_test_51Hb5RYEVMkNoHaA6mVr0T6iuLDi2TNkBa94e6At9DPm37ENzrq8W9l3yI2EZnvLkgJa2ykoP2PIRmSPJusz4tonA004LN5z3Ee");
const CheckoutV2Form = ({ clientSecret, plan_id, type = "new" }) => {
  const [elements, setElements] = reactExports.useState(null);
  const [stripe, setStripe] = reactExports.useState(null);
  const [message, setMessage] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const paymentElementRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const initializeStripe = async () => {
      try {
        if (!clientSecret || typeof clientSecret !== "string" || clientSecret.trim() === "") {
          setMessage("Payment initialization error: Invalid payment configuration. Please refresh the page.");
          return;
        }
        const trimmedSecret = clientSecret.trim();
        if (!trimmedSecret.match(/^(seti_|pi_|si_)/)) {
          setMessage("Payment initialization error: Invalid payment configuration. Please refresh the page.");
          return;
        }
        const appearance = {
          rules: {
            ".Input:focus": {
              boxShadow: "none",
              borderColor: "#E88325",
              borderWidth: "1px",
              outline: "none"
            },
            ".Tab--selected:focus": {
              boxShadow: "none",
              outline: "none",
              borderColor: "#E88325",
              color: "#08314E"
            },
            ".Tab:focus": {
              borderColor: "#E88325",
              color: "#08314E"
            },
            ".Tab--selected:hover": {
              color: "#08314E"
            },
            ".Tab--selected": {
              boxShadow: "none",
              borderColor: "#E88325",
              borderWidth: "2px",
              outline: "none",
              color: "#08314E"
            },
            ".Tab--hover": {
              boxShadow: "none",
              outline: "none",
              color: "#08314E"
            },
            ".Input": {
              borderRadius: "150px",
              boxShadow: "none"
            },
            "p-TabLabel:hover": {
              color: "08314E"
            },
            ".Label": {
              fontFamily: '"Work Sans", sans-serif',
              fontSize: "1rem",
              fontWeight: "500",
              color: "#08314E",
              marginBottom: "0.6rem"
            }
          }
        };
        const stripeInstance = await stripePromise;
        if (!stripeInstance) {
          setMessage("Failed to load payment processor. Please refresh the page.");
          return;
        }
        const elementsInstance = stripeInstance == null ? void 0 : stripeInstance.elements({
          clientSecret: trimmedSecret
        });
        if (!elementsInstance) {
          setMessage("Failed to initialize payment form. Please refresh the page.");
          return;
        }
        setStripe(stripeInstance);
        setElements(elementsInstance);
        const paymentElement = elementsInstance.create("payment", {
          address: {
            allowedCountries: ["US"]
          }
        });
        paymentElementRef.current = paymentElement;
        paymentElement.mount("#payment-element");
      } catch (error) {
        console.error("Stripe initialization error:", error);
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
        }
      }
    };
  }, [clientSecret]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const { setupIntent, error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: "https://urpuppy.com/checkout/" + plan_id
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
      if (setupIntent.status === "requires_action") {
        return;
      } else if (setupIntent.status === "succeeded") {
        const data = {
          paymentMethod: setupIntent.payment_method,
          type,
          plan_id,
          _token: csrf
        };
        fe.post("/checkout/complete", data, {
          onError: (errors) => {
            setMessage("Failed to submit payment details.");
            setLoading(false);
          },
          onSuccess: () => {
            setLoading(false);
            setMessage("Payment details submitted successfully.");
          }
        });
      } else {
        setMessage("Payment failed. Please try again.");
        setLoading(false);
      }
    }
  };
  const csrf = q().props.csrf_token;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "payment-form", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", name: "_token", value: csrf }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", name: "plan_id", value: plan_id }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "payment-element" }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "payment-message", className: "mt-4 text-danger", children: message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        disabled: loading || !stripe || !elements,
        className: "btn btn-primary",
        children: loading ? "Processing..." : "Checkout"
      }
    ) })
  ] }) });
};
export {
  CheckoutV2Form as C
};
