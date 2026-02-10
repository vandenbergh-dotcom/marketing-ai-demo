interface MetricCardProps {
  title: string;
  value: number;
  format: "number" | "currency" | "percent" | "multiplier";
  loading?: boolean;
  change?: number;
}

export function MetricCard({ title, value, format, loading, change }: MetricCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-EU", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case "number":
        return new Intl.NumberFormat("en-US", { notation: "compact" }).format(val);
      case "percent":
        return `${val.toFixed(2)}%`;
      case "multiplier":
        return `${val.toFixed(1)}x`;
      default:
        return val.toString();
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border bg-white p-4">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-7 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-bold">{formatValue(value)}</p>
      {change !== undefined && (
        <p
          className={`mt-1 text-xs font-medium ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change >= 0 ? "+" : ""}{change.toFixed(1)}%
        </p>
      )}
    </div>
  );
}
