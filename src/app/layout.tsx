import type { Metadata } from "next";
import ThemeRegistry from "./lib/theme/muiThemeRegistry";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth/nextAuthClient";
import NextAuthProvider from "./lib/auth/authProvider";
import { Inter } from "next/font/google";
import GeneralLayout from "./components/layouts/general/GeneralLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Next App",
  description: "Im the best",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <NextAuthProvider session={session}>
          <ThemeRegistry options={{ key: "mui" }}>
            <body className={inter.className}>
              <GeneralLayout>{children}</GeneralLayout>
            </body>
          </ThemeRegistry>
        </NextAuthProvider>
      </body>
    </html>
  );
}
