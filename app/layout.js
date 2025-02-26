import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cortix',
  description: 'Chat with Cortix',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}