export const formatTime = (time: number) =>
  new Date(time * 1000).toISOString().substring(time >= 3600 ? 11 : 14, 19);

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-success text-success-foreground";
    case "shipped":
      return "bg-primary text-primary-foreground";
    case "confirmed":
      return "bg-blue-500 text-white";
    case "pending":
      return "bg-muted text-muted-foreground";
    case "cancelled":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
