import "./globals.css"

export const metadata = {
  title: "Digital Krishi Officer",
  description: "AI-powered agricultural advisory system"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
