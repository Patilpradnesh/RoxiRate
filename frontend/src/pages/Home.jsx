import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="card-padded overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="page-title">Discover stores. Rate honestly. Help others choose.</h1>
            <p className="page-subtitle mt-3">
              StoreRating lets you browse local stores, see average ratings, and submit your own rating in seconds.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/stores" className="btn-primary">
                Browse stores
              </Link>
              <Link to="/signup" className="btn-secondary">
                Create an account
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="badge">Fast</span>
              <span className="badge">Secure</span>
              <span className="badge">Role-based access</span>
              <span className="badge">Responsive UI</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-16 -top-14 h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -left-16 -bottom-12 h-56 w-56 rounded-full bg-accent/10 blur-2xl" />

            <div className="relative grid gap-3">
              <div className="card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-slate-600">Average rating</div>
                    <div className="mt-1 text-3xl font-semibold tracking-tight">4.6</div>
                  </div>
                  <span className="badge-warning">Top picks</span>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
                  <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-primary to-accent" />
                </div>
              </div>
              <div className="card p-4">
                <div className="text-sm text-slate-600">Your rating</div>
                <div className="mt-2 flex items-center gap-2 text-yellow-500">
                  <span className="text-xl">★★★★★</span>
                  <span className="text-sm text-slate-600">Tap to rate</span>
                </div>
              </div>
              <div className="card p-4">
                <div className="text-sm text-slate-600">For admins & owners</div>
                <div className="mt-1 text-base font-medium text-slate-900">Manage stores and view ratings</div>
                <div className="mt-3 flex gap-2">
                  <span className="badge-primary">Admin</span>
                  <span className="badge-primary">Owner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card-padded">
          <div className="text-sm font-semibold text-slate-900">Browse</div>
          <p className="mt-2 text-sm text-slate-600">Search by name, address, or email and sort by rating.</p>
        </div>
        <div className="card-padded">
          <div className="text-sm font-semibold text-slate-900">Rate</div>
          <p className="mt-2 text-sm text-slate-600">Give a 1–5 star rating and keep the community up to date.</p>
        </div>
        <div className="card-padded">
          <div className="text-sm font-semibold text-slate-900">Track</div>
          <p className="mt-2 text-sm text-slate-600">Owners can see feedback; admins can manage stores/users.</p>
        </div>
      </section>
    </div>
  );
}
