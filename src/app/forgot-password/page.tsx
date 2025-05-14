export default function ForgotPasswordPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Reset Your Password
        </h1>
        <form>
          <input
            type="email"
            name="email"
            placeholder="Enter your UofT email"
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </main>
  );
}
