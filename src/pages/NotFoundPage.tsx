import { Link } from "react-router";
import { FaHome, FaSearch, FaExclamationCircle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center">
          {}
          <div className="mb-8 relative">
            <div className="text-9xl font-bold text-green-200 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaExclamationCircle className="text-green-600 text-6xl animate-pulse" />
            </div>
          </div>

          {}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-green-100">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist. It might have
              been moved or deleted.
            </p>

            {}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h2 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <FaSearch className="text-green-600" />
                What you can do:
              </h2>
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Check the URL for typos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Go back to the home page and navigate from there</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Use the navigation menu to find what you need</span>
                </li>
              </ul>
            </div>

            {}
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/"
                className="flex items-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <FaHome />
                Back to Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>

          {}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link
                to="/"
                className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm font-medium text-green-800 transition-colors text-center"
              >
                Dashboard
              </Link>
              <Link
                to="/news"
                className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm font-medium text-green-800 transition-colors text-center"
              >
                News
              </Link>
              <Link
                to="/projects"
                className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm font-medium text-green-800 transition-colors text-center"
              >
                Projects
              </Link>
              <Link
                to="/complaints"
                className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-sm font-medium text-green-800 transition-colors text-center"
              >
                Complaints
              </Link>
            </div>
          </div>

          {}
          <div className="mt-8">
            <p className="text-sm text-gray-500">
              If you believe this is an error, please contact the system
              administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
