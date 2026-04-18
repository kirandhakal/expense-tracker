import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
                Page Not Found
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
                The page you are looking for does not exist.
            </p>
            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Go Home
            </Link>
        </div>
    );
}