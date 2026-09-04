import "./globals.css";
import AppShell from "../components/AppShell";

export const metadata = {
  title: "FoodRescue LK",
  description: "Connecting surplus food with communities in need."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
