import Link from "next/link";

export const metadata = {
  title: "About — Mining Equipment Hour Meter Tracker",
  description: "Learn about the Mining Equipment Hour Meter Tracker",
};

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <nav className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex space-x-8">
              <Link
                href="/"
                className="text-zinc-600 hover:text-zinc-900 px-3 py-2 text-sm font-medium"
              >
                Equipment
              </Link>
              <Link
                href="/about"
                className="text-zinc-900 px-3 py-2 text-sm font-medium border-b-2 border-zinc-900"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-zinc-900 mb-6">
            About This Application
          </h1>

          <div className="space-y-4 text-zinc-700 leading-relaxed">
            <p className="text-lg">
              This website is designed to track and manage hour meter readings
              for equipment operating at mine sites.
            </p>

            <p>
              Hour meters are essential for monitoring equipment usage and
              scheduling maintenance. By keeping accurate records of equipment
              hours, mine operators can ensure machinery receives timely
              servicing, reduce downtime, and extend equipment lifespan.
            </p>

            <p>
              This application provides a simple, centralized platform to view
              current hour meter readings and update them as equipment is used
              throughout daily operations.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
