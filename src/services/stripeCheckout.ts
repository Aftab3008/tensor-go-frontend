import { api } from "@/lib/api";

export const initiateCheckout = async () => {
  try {
    const successUrl = `${window.location.origin}/checkout/success`;
    const cancelUrl = `${window.location.origin}/checkout/cancel`;
    const response = await api.post("/api/orders/checkout", {
      successUrl,
      cancelUrl,
    });
    if (response.data && response.data.sessionId) {
      return {
        message: "Checkout session created successfully",
        success: true,
        sessionId: response.data.sessionId,
      };
    } else {
      return { message: "Failed to create checkout session", success: false };
    }
  } catch (error) {
    console.error(error);
    return { message: "Failed to initiate checkout", success: false };
  }
};
