'use client';

import Link from 'next/link';
import { BookMarked, FileText } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <FileText size={28} />
          Notes & Bookmarks
        </Link>

        <div className="flex gap-6">
          <Link
            href="/notes"
            className="flex items-center gap-2 hover:text-blue-200 transition"
          >
            <FileText size={20} />
            Notes
          </Link>
          <Link
            href="/bookmarks"
            className="flex items-center gap-2 hover:text-blue-200 transition"
          >
            <BookMarked size={20} />
            Bookmarks
          </Link>
        </div>
      </div>
    </nav>
  );
}
