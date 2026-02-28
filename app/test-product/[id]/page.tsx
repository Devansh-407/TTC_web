export default async function TestProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-4">Test Product Page</h1>
      <p className="text-lg">Product ID: {id}</p>
      <p className="text-gray-600">This is a test to verify dynamic routing works.</p>
      <a href="/" className="text-blue-500 underline">← Back to Home</a>
    </div>
  )
}
