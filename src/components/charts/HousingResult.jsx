import React from 'react';

const HousingResultVisualization = ({
  oa_list,
  sa_list,
  ma_list,
  cash_overflow_from_cpf,
  cpf_life_payout,
  cpf_excess_dict,
  total_payment_for_housing,
  cpf_payment_for_housing,
  cash_payment_for_housing,
  retirement_sum_achieved,
  housingObj,
  housing_info,
}) => {
  return (
    <div className="container mx-auto p-4 lg:p-8">
      <h2 className="text-3xl font-bold text-primary-600 mb-8 text-center">Housing and CPF Summary</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">CPF Balances</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold">Ordinary Account (OA)</h4>
            {Object.keys(oa_list).map((key) => (
              <div key={key}>
                <strong>{key}:</strong>
                <ul>
                  {oa_list[key].map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-semibold">Special Account (SA)</h4>
            {Object.keys(sa_list).map((key) => (
              <div key={key}>
                <strong>{key}:</strong>
                <ul>
                  {sa_list[key].map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-semibold">Medisave Account (MA)</h4>
            {Object.keys(ma_list).map((key) => (
              <div key={key}>
                <strong>{key}:</strong>
                <ul>
                  {ma_list[key].map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Housing Payments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold">Total Payment for Housing</h4>
            {Object.keys(total_payment_for_housing).map((key) => (
              <div key={key}>
                <strong>{key}:</strong>
                <ul>
                  {total_payment_for_housing[key].map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-semibold">CPF Payment for Housing</h4>
            {Object.keys(cpf_payment_for_housing).map((key) => (
              <div key={key}>
                <strong>{key}:</strong>
                <ul>
                  {cpf_payment_for_housing[key].map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-semibold">Cash Payment for Housing</h4>
            {Object.keys(cash_payment_for_housing).map((key) => (
              <div key={key}>
                <strong>{key}:</strong>
                <ul>
                  {cash_payment_for_housing[key].map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Cash Overflow from CPF</h3>
        <ul>
          {cash_overflow_from_cpf &&
            Object.keys(cash_overflow_from_cpf).map((key, index) => (
              <li key={index}>
                <strong>{key}:</strong> {cash_overflow_from_cpf[key].join(', ')}
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">CPF Life Payout</h3>
        <ul>
          {cpf_life_payout &&
            Object.keys(cpf_life_payout).map((key, index) => (
              <li key={index}>
                <strong>{key}:</strong> {cpf_life_payout[key]}
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">CPF Excess</h3>
        <ul>
          {cpf_excess_dict &&
            Object.keys(cpf_excess_dict).map((key, index) => (
              <li key={index}>
                <strong>{key}:</strong> {cpf_excess_dict[key]}
              </li>
            ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Housing Information</h3>
        <div>
          <strong>Estimated Cost of Flat at Purchase:</strong> {housing_info.est_cost_of_flat_at_purchase}
        </div>
        <div>
          <strong>Downpayment Details:</strong>
          <ul>
            {Object.keys(housing_info.downpayment_details).map((key, index) => (
              <li key={index}>
                <strong>{key}:</strong> {housing_info.downpayment_details[key]}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Miscellaneous Cost:</strong> {housing_info.miscellaneous_cost}
        </div>
        <div>
          <strong>Minimum Monthly Payment:</strong> {housing_info.min_monthly_payment}
        </div>
        <div>
          <strong>Loan Tenure:</strong> {housing_info.loan_tenure}
        </div>
        {housing_info.loan_amount && (
          <div>
            <strong>Loan Amount:</strong> {housing_info.loan_amount}
          </div>
        )}
        {housing_info.additional_cash_outlay_from_loan_shortage && (
          <div>
            <strong>Additional Cash Outlay from Loan Shortage:</strong> {housing_info.additional_cash_outlay_from_loan_shortage}
          </div>
        )}
        {housing_info.combined_income_at_flat_completion && (
          <div>
            <strong>Combined Income at Flat Completion:</strong> {housing_info.combined_income_at_flat_completion}
          </div>
        )}
        {housing_info.additional_payment_from_oa_excess && (
          <div>
            <strong>Additional Payment from OA Excess:</strong>
            <ul>
              {Object.keys(housing_info.additional_payment_from_oa_excess).map((key, index) => (
                <li key={index}>
                  <strong>{key}:</strong> {housing_info.additional_payment_from_oa_excess[key]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HousingResultVisualization;
