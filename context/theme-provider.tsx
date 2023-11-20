'use client';
import { ThemeProvider as TP } from 'next-themes';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TP attribute='class' defaultTheme='system' enableSystem>
      {children}
    </TP>
  );
}
