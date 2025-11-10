// utils/formatDate.ts

export function formatDate(
  date: string | Date,
  format: "short" | "default" | "mmddyyyy" = "short"
) {
  const d = new Date(date);

  switch (format) {
    case "short":
      // Example: Nov 02, 2025
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });

    case "default":
      // Example: 2025-11-02
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );

    case "mmddyyyy":
      return (
        String(d.getDate()).padStart(2, "0") +
        "/" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "/" +
        d.getFullYear()
      );

    default:
      return d.toLocaleDateString();
  }
}
