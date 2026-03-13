export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">
        Digital Krishi Officer
      </h1>

      <a href="/farmer" className="text-green-600 underline">
        Open Farmer App
      </a>

      <a href="/dashboard" className="text-blue-600 underline">
        Open Officer Dashboard
      </a>
    </div>
  )
}
