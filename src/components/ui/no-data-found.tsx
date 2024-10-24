
interface SearchNotFoundProps {
  query?: string
  message?: string
  suggestion?: string
  onReset?: () => void
}

export default function NoDataFound({
  query = '',
  message = 'No results found',
  suggestion = 'Try adjusting your search or filter to find what you\'re looking for.',
  onReset
}: SearchNotFoundProps = {}) {
  return (
    <div className="flex items-center justify-center min-h-[200px]  w-full p-4">
      <div className="text-center max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 mx-auto mb-4 text-gray-400"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{message}</h2>
        {query && (
          <p className="text-gray-600 mb-2">
            No results for <span className="font-medium">"{query}"</span>
          </p>
        )}
        <p className="text-sm text-gray-500 mb-4">{suggestion}</p>
        
        {onReset && (
          <button
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={onReset}
          >
            Reset Search
          </button>
        )}
      </div>
    </div>
  )
}