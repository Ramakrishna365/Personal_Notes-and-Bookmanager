import './globals.css';

export const metadata = {
  title: 'Personal Notes & Bookmark Manager',
  description: 'Manage your notes and bookmarks efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
