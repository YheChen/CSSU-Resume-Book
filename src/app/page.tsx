import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-white">CSSU Resume Book</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Student Login
              </Button>
            </Link>
            <Link href="/sponsorlogin">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Sponsor Login
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary to-primary/80 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">University of Toronto Computer Science Student Union</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connect talented UofT Computer Science students with industry-leading companies through our resume portal.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Student Sign Up
                </Button>
              </Link>
              <Link href="/sponsorlogin">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Sponsor Access
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">For Students</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary text-white p-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p>Create a profile with your academic information</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary text-white p-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p>Upload your resume to be viewed by top companies</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary text-white p-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p>Increase your visibility to potential employers</p>
                </li>
              </ul>
              <Link href="/signup" className="mt-6 inline-block">
                <Button>Sign Up Now</Button>
              </Link>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4">For Sponsors</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary text-white p-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p>Access a curated pool of talented CS students</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary text-white p-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p>Browse and download student resumes</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-primary text-white p-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p>Find the perfect candidates for your opportunities</p>
                </li>
              </ul>
              <Link href="/sponsorlogin" className="mt-6 inline-block">
                <Button>Sponsor Login</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} University of Toronto Computer Science Student Union</p>
        </div>
      </footer>
    </div>
  )
}
