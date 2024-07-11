import React, { useState } from 'react';
import { prepareHousingData, sendHousingRequest } from '../../utils/api'; 
import HousingResultVisualization from "../charts/HousingResult";
import HousingResultPlaceholder from '../placeholders/HousingResultPlaceholder';

const flatTypes = {
  'BTO 2-room Flexi (NM)': 162000,
  'BTO 2-room Flexi (M)': 277000,
  'BTO 3-room (NM)': 248000,
  'BTO 3-room (M)': 421000,
  'BTO 4-room (NM)': 381000,
  'BTO 4-room (M)': 617000,
  'BTO 5-room (NM)': 516000,
  'BTO 5-room (M)': 725000,
  '3-room Resale HDB': 380000,
  '4-room Resale HDB': 550000,
  '5-room Resale HDB': 700000,
  'BTO Studio EC': 560000,
  'BTO 2-room EC': 720000,
  'BTO 3-room EC': 960000,
  'BTO 4-room EC': 1400000,
  'BTO 5-room EC': 1760000,
  'BTO Penthouse EC': 1900000,
  '1-room condominium': 700000,
  '2-room condominium': 900000,
  '3-room condominium': 1200000,
  '4-room condominium': 1800000,
  '5-room condominium': 2200000,
  'Penthouse condominium': 3000000,
  '1-room New Launch condominium': 700000,
  '2-room New Launch condominium': 900000,
  '3-room New Launch condominium': 1200000,
  '4-room New Launch condominium': 1800000,
  '5-room New Launch condominium': 2200000,
  'Penthouse New Launch condominium': 3000000,
  'Landed Property': 10000000,
  'BTO 3-room (Prime)': 248000,
  'BTO 3-room (Plus)': 248000,
  'BTO 3-room (Standard)': 248000,
  'BTO 4-room (Prime)': 381000,
  'BTO 4-room (Plus)': 381000,
  'BTO 4-room (Standard)': 381000,
  'BTO 5-room (Prime)': 516000,
  'BTO 5-room (Plus)': 516000,
  'BTO 5-room (Standard)': 516000,
};

const MortgageCalculatorWidget = () => {
  const [applicants, setApplicants] = useState([
    { citizenship: 'Singaporean', income: '5000', age: '30', cpfOA: '0', liabilities: '0' },
  ]);
  const [flatType, setFlatType] = useState('BTO 4-room (NM)');
  const [loanType, setLoanType] = useState('HDB');
  const [estimatedCost, setEstimatedCost] = useState(flatTypes['BTO 4-room (NM)']);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencyFormatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 0
  });

  const handleApplicantChange = (index, field, value) => {
    const newApplicants = [...applicants];
    if (field === 'income' || field === 'cpfOA' || field === 'liabilities') {
      newApplicants[index][field] = value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    } else {
      newApplicants[index][field] = value;
    }
    setApplicants(newApplicants);
  };

  const formatCurrency = (value) => {
    return currencyFormatter.format(value ? parseInt(value, 10) : 0);
  };

  const handleEstimatedCostChange = (value) => {
    setEstimatedCost(value.replace(/[^\d]/g, '')); // Remove non-numeric characters
  };

  const addApplicant = () => {
    if (applicants.length < 2) {
      setApplicants([...applicants, { citizenship: 'Singaporean', income: '5000', age: '28', cpfOA: '0', liabilities: '0' }]);
    }
  };

  const removeApplicant = (index) => {
    const newApplicants = [...applicants];
    newApplicants.splice(index, 1);
    setApplicants(newApplicants);
  };

  const checkEligibility = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const preparedData = prepareHousingData(applicants, flatType, loanType, estimatedCost);
      
      const data = await sendHousingRequest(preparedData);
      setResult(data);
    } catch (error) {
      console.error('Error in checkEligibility:', error);
      
      let errorMessage = 'An error occurred. Please try again.';
      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setError(errorMessage);
      
      // You might want to send this error to a logging service
      // logErrorToService(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <h2 className="text-3xl font-bold text-primary-600 mb-8 text-center">Check Your Eligibility</h2>
      {applicants.map((applicant, index) => (
        <div key={index} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Applicant {index + 1}</h3>
            {applicants.length > 1 && (
              <button
                type="button"
                onClick={() => removeApplicant(index)}
                className="bg-red-500 text-white py-1 px-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor={`citizenship-${index}`} className="block text-gray-700 font-semibold">Citizenship:</label>
              <select
                id={`citizenship-${index}`}
                value={applicant.citizenship}
                onChange={(e) => handleApplicantChange(index, 'citizenship', e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select</option>
                <option value="Singaporean">Singapore Citizen</option>
                <option value="Permanent Resident">Permanent Resident</option>
                <option value="Others">Non-Citizen</option>
              </select>
            </div>
            <div>
              <label htmlFor={`income-${index}`} className="block text-gray-700 font-semibold">Monthly Income:</label>
              <input
                type="text"
                id={`income-${index}`}
                value={formatCurrency(applicant.income)}
                onChange={(e) => handleApplicantChange(index, 'income', e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter monthly income"
              />
            </div>
            <div>
              <label htmlFor={`age-${index}`} className="block text-gray-700 font-semibold">Age:</label>
              <input
                type="number"
                id={`age-${index}`}
                value={applicant.age}
                onChange={(e) => handleApplicantChange(index, 'age', e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter age"
              />
            </div>
            {(applicant.citizenship === 'Singaporean' || applicant.citizenship === 'Permanent Resident') && (
              <div>
                <label htmlFor={`cpfOA-${index}`} className="block text-gray-700 font-semibold">CPF OA Balance:</label>
                <input
                  type="text"
                  id={`cpfOA-${index}`}
                  value={formatCurrency(applicant.cpfOA)}
                  onChange={(e) => handleApplicantChange(index, 'cpfOA', e.target.value)}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter CPF OA balance"
                />
              </div>
            )}
          </div>
        </div>
      ))}
      {applicants.length < 2 && (
        <button
          type="button"
          onClick={addApplicant}
          className="w-full bg-secondary-500 text-white py-3 rounded-lg font-semibold hover:bg-secondary-600 transition duration-300 mb-8"
        >
          Add Another Applicant
        </button>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="flat-type" className="block text-gray-700 font-semibold">Type of Flat:</label>
            <select
              id="flat-type"
              value={flatType}
              onChange={(e) => {
                setFlatType(e.target.value);
                setEstimatedCost(flatTypes[e.target.value]);
              }}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select</option>
              {Object.keys(flatTypes).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="estimated-cost" className="block text-gray-700 font-semibold">Estimated Cost of Flat:</label>
            <input
              type="text"
              id="estimated-cost"
              value={formatCurrency(estimatedCost)}
              onChange={(e) => handleEstimatedCostChange(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              placeholder="Enter the estimated cost"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={checkEligibility}
          className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Work the Magic'}
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {result ? (
        <HousingResultVisualization
          oa_list={result.oa_list}
          sa_list={result.sa_list}
          ma_list={result.ma_list}
          cash_overflow_from_cpf={result.cash_overflow_from_cpf}
          cpf_life_payout={result.cpf_life_payout}
          cpf_excess_dict={result.cpf_excess_dict}
          total_payment_for_housing={result.total_payment_for_housing}
          cpf_payment_for_housing={result.cpf_payment_for_housing}
          cash_payment_for_housing={result.cash_payment_for_housing}
          retirement_sum_achieved={result.retirement_sum_achieved}
          housingObj={result.housingObj}
          housing_info={result.housing_info}
        />
      ) : (
        <HousingResultPlaceholder />
      )}
    </div>
  );
};

export default MortgageCalculatorWidget;
