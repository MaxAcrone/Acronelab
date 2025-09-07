import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientCursorEffect from '../components/ClientCursorEffect';

// Используем клиентский компонент для курсора

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://acronelab.com'),
  title: 'Acronelab - Web3 Innovation Studio',
  description: 'Acronelab is a pioneering Web3 innovation studio specialized in blockchain games, NFT projects, and cutting-edge digital experiences led by Max, a former Apple Art Director.',
  openGraph: {
    title: 'Acronelab - Web3 Innovation Studio',
    description: 'Pioneering Web3 innovation studio specializing in blockchain games and NFT projects with deep expertise in Python development.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acronelab - Web3 Innovation Studio',
    description: 'Pioneering Web3 innovation studio specializing in blockchain games and NFT projects with deep expertise in Python development.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.png.svg" />
      </head>
      <body>
        <ClientCursorEffect />
        {children}
      </body>
    </html>
  );
}
