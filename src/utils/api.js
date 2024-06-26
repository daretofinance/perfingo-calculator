export const prepareHousingData = (applicants, flatType, loanType, estimatedCost) => {
    const housing = {
      own_property: "No", 
      type_of_flat: flatType,
      loan_type: loanType,
      mortgage_interest: 2.6,
      refinance: "Yes", // or "No" based on your logic
      self_fund: applicants.length > 1 ? "No": "Yes", 
      payor: applicants.length > 1 ? "Both" : "applicant1",
      co_fund_ratio: applicants.length > 1 ? 50 : 100,
      inflation: 0,
      convert_to_decimal: true,
      change_flat: "No",
      property_plan: "Yes",
      age_getting_flat: parseInt(applicants[0].age, 10),
      spouse_age_getting_flat: applicants.length > 1 ? parseInt(applicants[1].age, 10) : null,
      est_cost_of_flat: parseInt(estimatedCost, 10),
      potential_grant: 0,
      staggered_downpayment: "Yes", // or "No" based on your logic
      cpf_cash_ratio: 100
    };
  
    const propertyConfig = {
        MSR:0.3,
        TDSR:0.55,
        BTO_WAITING_PERIOD:4,
        PRIVATE_WAITING_PERIOD:2,
        HDB_DOWNPAYMENT:0.15,
        HDB_FIRST_DOWNPAYMENT:0.05,
        HDB_SECOND_DOWNPAYMENT:0.10,
        OA_BAL_RETENTION_FOR_HDB_LOAN:20000,
        HDB_LOAN_INTEREST:0.026,
        HDB_LOAN_INTEREST_FLOOR:0.026,
        MAX_HDB_LOAN_TENURE_MTHS:25 * 12,
        MAX_HDB_LOAN_TILL_AGE:65,
        MAX_BANK_LOAN_TENURE_MTHS_HDB:25 * 12,
        MAX_BANK_LOAN_TENURE_MTHS_PRIVATE:25 * 12,
        BANK_LOAN_INTEREST_FLOOR:0.035,
        BANK_DOWNPAYMENT_CPF:0.20,
        BANK_DOWNPAYMENT_CASH:0.05,
        BANK_LTV: 0.75,
        MAX_BANK_LOAN_TILL_AGE:65,
        convert_to_decimal: false,
    };
  
    const cpf_balances_dict = {};
    const projected_income_dict = {};
    const income_contribute_to_cpf_dict = {};
    const current_age_dict = {};
    const ideal_financial_freedom_age_dict = {};
    const citizenship_dict = {};
    const ad_hoc_cpf_topup_dict = {};
    const medisave_expenses = {};
    const total_liabilities = {};
  
    applicants.forEach((applicant, index) => {
      const key = `applicant${index + 1}`;
      cpf_balances_dict[key] = {
        ordinary_account: parseInt(applicant.cpfOA, 10),
        special_account: 0,
        medisave_account: 0,
        transfer_oa_to_sa: "No"
      };
    //   projected_income_dict[key] = [parseInt(applicant.income, 10)];
    //   Assume income is constant for now till financial freedom age and 0 till 100
      projected_income_dict[key] = Array(65 - parseInt(applicant.age, 10)).fill(parseInt(applicant.income*12, 10));
        projected_income_dict[key] = projected_income_dict[key].concat(Array(100 - 65).fill(0));

      income_contribute_to_cpf_dict[key] = true;
      current_age_dict[key] = parseInt(applicant.age, 10);
      ideal_financial_freedom_age_dict[key] = 65; // example age for financial freedom
      citizenship_dict[key] = applicant.citizenship;
      ad_hoc_cpf_topup_dict[key] = [];
      medisave_expenses[key] = [];
      total_liabilities[key] = [parseInt(applicant.liabilities || 0, 10)];
    });
  
    return {
      housing,
      propertyConfig,
      cpf_balances_dict,
      projected_income_dict,
      income_contribute_to_cpf_dict,
      current_age_dict,
      ideal_financial_freedom_age_dict,
      citizenship_dict,
      ad_hoc_cpf_topup_dict,
      medisave_expenses,
      total_liabilities
    };
  };
  
  export const sendHousingRequest = async (data) => {
    try {
        console.log(data);
      const response = await fetch('http://127.0.0.1:8000/project_cpf_and_housing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
  
      const result = await response.json();
      console.log('Result:', result);
      return result;
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  };
  