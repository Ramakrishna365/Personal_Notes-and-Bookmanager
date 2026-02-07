import Link from 'next/link';
import { BookMarked, FileText, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText size={28} />
            Notes & Bookmarks
          </h1>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Your Personal Manager
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Organize your thoughts and save your favorite links all in one place
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Link
            href="/notes"
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-8 border-t-4 border-blue-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <FileText size={40} className="text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-800">My Notes</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Create, organize, and search your personal notes with tags for easy filtering.
            </p>
            <div className="flex items-center text-blue-500 font-semibold">
              Go to Notes <ArrowRight size={20} className="ml-2" />
            </div>
          </Link>

          <Link
            href="/bookmarks"
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-8 border-t-4 border-green-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <BookMarked size={40} className="text-green-500" />
              <h3 className="text-2xl font-bold text-gray-800">My Bookmarks</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Save and organize your favorite websites with automatic title fetching.
            </p>
            <div className="flex items-center text-green-500 font-semibold">
              Go to Bookmarks <ArrowRight size={20} className="ml-2" />
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">📝 Notes</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>✓ Create and edit notes</li>
                <li>✓ Organize with tags</li>
                <li>✓ Full-text search</li>
                <li>✓ Mark as favorite</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-2">🔖 Bookmarks</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>✓ Save website links</li>
                <li>✓ Auto-fetch page titles</li>
                <li>✓ Search and filter</li>
                <li>✓ Mark as favorite</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>Personal Notes & Bookmark Manager • Built with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}
