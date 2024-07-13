import React, { useState, useEffect } from 'react';


const InputField = ({ label, ...props }) => (
  <div className="mb-4">
    <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      {...props}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
    />
  </div>
);

const GuidedSessionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    advisorId: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const advisorId = urlParams.get('advisor');
    if (advisorId) {
      setFormData(prevData => ({ ...prevData, advisorId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form");
    if (isFormValid()) {
      setIsLoading(true);
      const payload = formatPayload();
      let ENDPOINT = "";
      if (import.meta.env.MODE === 'development') {
        ENDPOINT = "http://localhost:3000";
      } else {
        ENDPOINT = import.meta.env.PUBLIC_STORAGE_URL;
      }
      try {
        console.log("Sending request to:", `${ENDPOINT}/others/guidedUserSignup`);
        console.log("Payload:", JSON.stringify(payload));
        const response = await fetch(`${ENDPOINT}/others/guidedUserSignup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          mode: "cors"
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Submission failed: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        console.log("Response data:", data);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error details:', error);
        alert(`An error occurred while submitting the form: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormValid = () => {
    // Add your validation logic here
    return true; // Placeholder
  };

  const formatPayload = () => {
    const { name, email, phone, preferredDate, preferredTime, advisorId } = formData;
    let preferredDateTime = '';
    if (preferredDate && preferredTime) {
      const date = new Date(preferredDate);
      preferredDateTime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${preferredTime}`;
    } else if (preferredDate) {
      const date = new Date(preferredDate);
      preferredDateTime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at anytime`;
    } else if (preferredTime) {
      preferredDateTime = `Any date on ${preferredTime}`;
    } else {
      preferredDateTime = 'Not specified';
    }

    return {
      name,
      email,
      phone: `+65 ${phone}`,
      preferredDateTime,
      advisorId: advisorId || undefined
    };
  };

  const minDate = (() => {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    return now.toISOString().split('T')[0];
  })();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-green-700">
          Sign Up Successful!
        </h1>
        <p className="mb-6 text-gray-700 leading-relaxed">
          Thank you for signing up for a free guided session with Perfingo! Our advisor will contact you
          shortly. If you do not hear from an advisor within 5 working days, please reach out to us directly at
          <a href="mailto:hello@perfingo.com" className="text-green-600 hover:text-green-700 ml-1">hello@perfingo.com</a>.
        </p>
        <a href="/" className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <InputField
        label="Full Name"
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="John Doe"
      />
      <InputField
        label="Email Address"
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="john@example.com"
      />
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            +65
          </span>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            minLength={8}
            placeholder="1234 5678"
            className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>
      <InputField
        label="Preferred Date (Optional)"
        type="date"
        id="preferredDate"
        name="preferredDate"
        value={formData.preferredDate}
        onChange={handleChange}
        min={minDate}
      />
      <small className="block text-gray-500 mt-1 mb-4">Please select a date at least 7 days from today.</small>
      <InputField
        label="Preferred Time (Optional)"
        type="time"
        id="preferredTime"
        name="preferredTime"
        value={formData.preferredTime}
        onChange={handleChange}
      />
      <div className="mt-6">
        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Sign Up Now
        </button>
      </div>
    </form>
  );
};

export default GuidedSessionForm;