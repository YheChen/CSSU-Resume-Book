import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex flex-col items-center justify-center flex-1 bg-gradient-to-b from-gray-900 to-gray-700 text-white text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          University of Toronto Computer Science Student Union
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-xl">
          Connect talented UofT Computer Science students with industry-leading
          companies through our resume portal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-6 py-3 bg-white text-black rounded hover:bg-gray-200 transition">
            Student Sign Up
          </button>
          <button className="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-black transition">
            Sponsor Access
          </button>
        </div>
      </section>
    </main>
  );
}
