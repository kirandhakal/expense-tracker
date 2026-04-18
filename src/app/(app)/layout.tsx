import './globals.css';
import StickyNotesWidget from '@/components/features/StickyNotes';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <StickyNotesWidget />
    </>
  );
}