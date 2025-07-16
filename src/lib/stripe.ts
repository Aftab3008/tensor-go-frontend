import { loadStripe } from "@stripe/stripe-js";

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!stripePublishableKey) {
  throw new Error(
    "Stripe publishable key is not defined in environment variables."
  );
}

const stripe = loadStripe(stripePublishableKey);

export { stripe };
