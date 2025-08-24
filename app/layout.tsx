import "@/styles/globals.scss";

export const metadata = {
  title: "Next.js Auth Project",
  description: "Demo Authentication page with Next.js, TypeScript, SCSS Modules",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}