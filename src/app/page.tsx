import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-black to-gray-800 text-white">
        <h2 className="text-4xl sm:text-5xl font-bold max-w-3xl">
          University of Toronto Computer Science Student Union
        </h2>
        <p className="mt-4 text-lg max-w-xl">
          Connect talented UofT Computer Science students with industry-leading
          companies through our resume portal.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="bg-white text-black font-medium px-6 py-2 rounded hover:bg-gray-200 transition">
            Student Sign Up
          </button>
          <button className="bg-white text-black font-medium px-6 py-2 rounded hover:bg-gray-200 transition">
            Become a Sponsor
          </button>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-left">
          {/* Students */}
          <div>
            <h3 className="text-2xl font-bold mb-6">For Students</h3>
            <ul className="space-y-4">
              {[
                "Create a profile with your academic information",
                "Upload your resume to be viewed by top companies",
                "Increase your visibility to potential employers",
              ].map((text, i) => (
                <li key={i} className="flex items-start">
                  <span className="mt-1 mr-3 text-green-600">✅</span>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition">
              Sign Up Now
            </button>
          </div>

          {/* Sponsors */}
          <div>
            <h3 className="text-2xl font-bold mb-6">For Sponsors</h3>
            <ul className="space-y-4">
              {[
                "Access a curated pool of talented CS students",
                "Browse and download student resumes",
                "Find the perfect candidates for your opportunities",
              ].map((text, i) => (
                <li key={i} className="flex items-start">
                  <span className="mt-1 mr-3 text-green-600">✅</span>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition">
              Become a Sponsor
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
