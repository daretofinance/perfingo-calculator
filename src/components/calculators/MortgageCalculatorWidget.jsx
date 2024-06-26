import React, { useState } from 'react';
import { prepareHousingData, sendHousingRequest } from '../../utils/api'; 
import HousingResultVisualization from "../charts/HousingResult";

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

const dummyData = {
    oa_list: {
      applicant1: [1000, 2000, 3000],
      applicant2: [1500, 2500, 3500]
    },
    sa_list: {
      applicant1: [500, 1000, 1500],
      applicant2: [750, 1250, 1750]
    },
    ma_list: {
      applicant1: [300, 600, 900],
      applicant2: [450, 750, 1050]
    },
    cash_overflow_from_cpf: {
      applicant1: [200, 400, 600],
      applicant2: [300, 500, 700]
    },
    cpf_life_payout: {
      applicant1: 1200,
      applicant2: 1300
    },
    cpf_excess_dict: {
      applicant1: 1500,
      applicant2: 1600
    },
    total_payment_for_housing: {
      applicant1: [5000, 10000, 15000],
      applicant2: [6000, 11000, 16000]
    },
    cpf_payment_for_housing: {
      applicant1: [2000, 4000, 6000],
      applicant2: [2500, 4500, 6500]
    },
    cash_payment_for_housing: {
      applicant1: [3000, 6000, 9000],
      applicant2: [3500, 6500, 9500]
    },
    retirement_sum_achieved: {
      applicant1: 100000,
      applicant2: 120000
    },
    housingObj: {},
    housing_info: {
      est_cost_of_flat_at_purchase: 300000,
      downpayment_details: {
        initial: 50000,
        second: 50000
      },
      miscellaneous_cost: 10000,
      min_monthly_payment: 1200,
      loan_tenure: 25,
      loan_amount: 200000,
      additional_cash_outlay_from_loan_shortage: 10000,
      combined_income_at_flat_completion: 8000,
      additional_payment_from_oa_excess: {
        applicant1: 500,
        applicant2: 600
      }
    }
  };
  

const MortgageCalculatorWidget = () => {
    const [applicants, setApplicants] = useState([
      { citizenship: 'citizen', income: '5000', age: '30', cpfOA: '20000', liabilities: '5000' },
      { citizenship: 'pr', income: '4000', age: '28', cpfOA: '15000', liabilities: '3000' }
    ]);
    const [flatType, setFlatType] = useState('BTO 4-room (NM)');
    const [loanType, setLoanType] = useState('HDB');
    const [estimatedCost, setEstimatedCost] = useState(flatTypes['BTO 4-room (NM)']);
    const [result, setResult] = useState(dummyData);
  
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
        setApplicants([...applicants, { citizenship: '', income: '', age: '', cpfOA: '', liabilities: '' }]);
      }
    };
  
    const removeApplicant = (index) => {
      const newApplicants = [...applicants];
      newApplicants.splice(index, 1);
      setApplicants(newApplicants);
    };
  
    const checkEligibility = async () => {
      try {
        const preparedData = prepareHousingData(applicants, flatType, loanType, estimatedCost);
        const data = await sendHousingRequest(preparedData);
        setResult(data);
      } catch (error) {
        setResult('An error occurred. Please try again.');
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
                  <option value="citizen">Singapore Citizen</option>
                  <option value="pr">Permanent Resident</option>
                  <option value="non-citizen">Non-Citizen</option>
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
              {(applicant.citizenship === 'citizen' || applicant.citizenship === 'pr') && (
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
              {loanType === 'Bank' && (
                <div>
                  <label htmlFor={`liabilities-${index}`} className="block text-gray-700 font-semibold">Current Liabilities:</label>
                  <input
                    type="text"
                    id={`liabilities-${index}`}
                    value={formatCurrency(applicant.liabilities)}
                    onChange={(e) => handleApplicantChange(index, 'liabilities', e.target.value)}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                    placeholder="Enter current liabilities"
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
              <label htmlFor="loan-type" className="block text-gray-700 font-semibold">Loan Type:</label>
              <select
                id="loan-type"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select</option>
                <option value="HDB">HDB</option>
                <option value="Bank">Bank</option>
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
          >
            Check Eligibility
          </button>
        </div>
        {result && (
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
        )}
      </div>
    );
  };
  
export default MortgageCalculatorWidget;