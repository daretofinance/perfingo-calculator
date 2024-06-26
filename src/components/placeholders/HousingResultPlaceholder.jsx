const HousingResultPlaceholder = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Housing Result Visualization</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Your personalized housing and CPF projection will appear here once you've entered your information and calculated the results.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-blue-700">Here's what you'll see:</p>
            <ul className="list-disc list-inside text-blue-600 mt-2">
              <li>Detailed Housing information</li>
              <li>CPF account projections (OA, SA, MA)</li>
              <li>Housing payment breakdown</li>
              <li>Retirement sum estimates</li>
              <li>Detailed housing loan information</li>
            </ul>
          </div>
          <p className="text-gray-600">
            To get started, fill in the required fields in the calculator above and click the "Calculate" button.
          </p>
          <div className="mt-6">
            <button 
              className="bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition duration-300"
              onClick={() => {
                // Scroll to the top of the calculator form
                window.scrollTo({ top: 250, behavior: 'smooth' });
              }}
            >
              Go to Calculator
            </button>
          </div>
        </div>
      </div>
    );
  };

export default HousingResultPlaceholder;