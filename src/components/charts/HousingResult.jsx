import React, { useState } from 'react';
import PremiumFeatureLock from "../PremiumFeatureLock";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Home, CreditCard, Clock, DollarSign, Package, AlertTriangle, Users, Landmark, PlusCircle, ArrowDownCircle, Lock } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

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
  const [activeTab, setActiveTab] = useState('overview');
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const years = cpf_payment_for_housing.applicant1.map((_, index) => `Year ${index + 1}`);

  const generateLineChartData = (data, label) => {
    const applicant1Data = data.applicant1;
    const applicant2Data = data.applicant2;
    const labels = Array.from({ length: Math.max(applicant1Data.length, applicant2Data.length) }, (_, i) => `Year ${i + 1}`);

    return {
      labels,
      datasets: [
        {
          label: `Applicant 1 ${label}`,
          data: applicant1Data,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: `Applicant 2 ${label}`,
          data: applicant2Data,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  };

  const cpfBalanceData = {
    labels: ['OA', 'SA', 'MA'],
    datasets: [
      {
        label: 'Applicant 1',
        data: [
          oa_list.applicant1[oa_list.applicant1.length - 1],
          sa_list.applicant1[sa_list.applicant1.length - 1],
          ma_list.applicant1[ma_list.applicant1.length - 1],
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
      {
        label: 'Applicant 2',
        data: [
          oa_list.applicant2[oa_list.applicant2.length - 1],
          sa_list.applicant2[sa_list.applicant2.length - 1],
          ma_list.applicant2[ma_list.applicant2.length - 1],
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.9)', 'rgba(54, 162, 235, 0.9)', 'rgba(255, 206, 86, 0.9)'],
      },
    ],
  };

  const housingPaymentData = {
    labels: years,
    datasets: [
      {
        label: 'Applicant 1 CPF',
        data: cpf_payment_for_housing.applicant1,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        stack: 'Applicant 1',
      },
      {
        label: 'Applicant 1 Cash',
        data: cash_payment_for_housing.applicant1,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        stack: 'Applicant 1',
      },
      {
        label: 'Applicant 2 CPF',
        data: cpf_payment_for_housing.applicant2,
        backgroundColor: 'rgba(75, 192, 192, 0.9)',
        stack: 'Applicant 2',
      },
      {
        label: 'Applicant 2 Cash',
        data: cash_payment_for_housing.applicant2,
        backgroundColor: 'rgba(153, 102, 255, 0.9)',
        stack: 'Applicant 2',
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 10 } },
  };

  const formatCurrency = (value) => {
    // Round off to nearest whole number
    value = Math.round(value);
    return value != null ? `$${value.toLocaleString()}` : 'N/A';
  };


  const renderInfoItem = (icon, title, value, colorClass) => (
    <div key={title} className="bg-gray-100 p-4 rounded-lg flex items-center">
      {React.createElement(icon, { className: `${colorClass} mr-3`, size: 24 })}
      <div>
        <p className="font-semibold">{title}</p>
        <p className={`text-xl font-bold ${colorClass}`}>{value}</p>
      </div>
    </div>
  );

  const renderDownpaymentDetails = () => {
    const downpayment = housing_info?.downpayment_details || {};
    const items = [];

    if (housingObj?.housing?.loan_type === "Bank") {
      if (downpayment.downpayment_cpf != null) {
        items.push(renderInfoItem(Landmark, "Downpayment (CPF)", formatCurrency(downpayment.downpayment_cpf), "text-blue-600"));
      }
      if (downpayment.downpayment_cash != null) {
        items.push(renderInfoItem(Landmark, "Downpayment (Cash)", formatCurrency(downpayment.downpayment_cash), "text-green-600"));
      }
    } else {
      if (downpayment.first_downpayment_cpf != null) {
        items.push(renderInfoItem(Landmark, "First Downpayment (CPF)", formatCurrency(downpayment.first_downpayment_cpf), "text-blue-600"));
      }
      if (downpayment.first_downpayment_cash != null) {
        items.push(renderInfoItem(Landmark, "First Downpayment (Cash)", formatCurrency(downpayment.first_downpayment_cash), "text-green-600"));
      }
      if (downpayment.second_downpayment_cpf != null) {
        items.push(renderInfoItem(Landmark, "Second Downpayment (CPF)", formatCurrency(downpayment.second_downpayment_cpf), "text-purple-600"));
      }
      if (downpayment.second_downpayment_cash != null) {
        items.push(renderInfoItem(Landmark, "Second Downpayment (Cash)", formatCurrency(downpayment.second_downpayment_cash), "text-indigo-600"));
      }
    }

    return items.length > 0 ? items : <p>No downpayment information available.</p>;
  };

  const redirectToPerfingo = () => {
    window.open('https://www.perfingo.com/create-account', '_blank');
  }


  return (
    <motion.div
      className="container mx-auto p-4 lg:p-8 bg-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-4xl font-bold text-primary-600 mb-8 text-center">Housing and CPF Summary</h2>

      <div className="flex flex-wrap justify-center mb-8 gap-2">
        <motion.button
          className={`px-4 py-2 rounded-full ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          onClick={() => setActiveTab('overview')}
          variants={tabVariants}
          animate={activeTab === 'overview' ? 'active' : 'inactive'}
        >
          Overview
        </motion.button>
        <motion.button
          className={`px-4 py-2 rounded-full ${activeTab === 'housingPayments' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          onClick={() => setActiveTab('housingPayments')}
          variants={tabVariants}
          animate={activeTab === 'housingPayments' ? 'active' : 'inactive'}
        >
          Housing Payments
        </motion.button>
        <motion.button
          className={`px-4 py-2 rounded-full ${activeTab === 'cpfProjection' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          onClick={() => setActiveTab('cpfProjection')}
          variants={tabVariants}
          animate={activeTab === 'cpfProjection' ? 'active' : 'inactive'}
        >
          CPF Projection
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'overview' && (
          <>
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Detailed Housing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderInfoItem(Home, "Estimated Cost of Flat", formatCurrency(housing_info?.est_cost_of_flat_at_purchase), "text-blue-600")}
                {renderInfoItem(CreditCard, "Loan Amount", formatCurrency(housing_info?.loan_amount), "text-green-600")}
                {renderInfoItem(Clock, "Loan Tenure", housing_info?.loan_tenure != null ? `${housing_info.loan_tenure} months` : 'N/A', "text-purple-600")}
                {renderInfoItem(DollarSign, "Minimum Monthly Payment", formatCurrency(housing_info?.min_monthly_payment), "text-red-600")}
                {renderInfoItem(Package, "Miscellaneous Cost", formatCurrency(housing_info?.miscellaneous_cost), "text-orange-600")}
                {renderInfoItem(AlertTriangle, "Additional Cash Outlay", formatCurrency(housing_info?.additional_cash_outlay_from_loan_shortage), "text-indigo-600")}
                {renderInfoItem(Users, "Combined Annual Income at Completion", formatCurrency(housing_info?.combined_income_at_flat_completion), "text-teal-600")}
                </div>
                
                <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Downpayment Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderDownpaymentDetails()}
                    </div>
                </div>
                
                <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Additional Payment from OA Excess</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderInfoItem(PlusCircle, "Applicant 1", formatCurrency(housing_info?.additional_payment_from_oa_excess?.applicant1), "text-purple-600")}
                    {renderInfoItem(PlusCircle, "Applicant 2", formatCurrency(housing_info?.additional_payment_from_oa_excess?.applicant2), "text-indigo-600")}
                </div>
                </div>
            </motion.div>
          </>
        )}

        {activeTab === 'housingPayments' && (
          <>
            {
                isPremiumUser ? (
                    <>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Housing Payments</h3>
                        <div className="w-full max-w-2xl mx-auto">
                        <Bar
                            data={housingPaymentData}
                            options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: {
                                position: 'top',
                                },
                                title: {
                                display: true,
                                text: 'Housing Payment Breakdown',
                                },
                            },
                            }}
                        />
                        </div>
                    </>
                ): (
                  <PremiumFeatureLock
                  featureDescription={'Find out exactly how much you need to pay for your housing!'}
                  />
                )          
            }
          </>
        )}

        {activeTab === 'cpfProjection' && (
          <>
            {
                isPremiumUser ? (
                    <>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">CPF Projection</h3>
                    <div className="w-full max-w-2xl mx-auto space-y-8">
                    <Line data={generateLineChartData(oa_list, 'OA')} options={{ responsive: true, plugins: { title: { display: true, text: 'Ordinary Account Trend' } } }} />
                    <Line data={generateLineChartData(sa_list, 'SA')} options={{ responsive: true, plugins: { title: { display: true, text: 'Special Account Trend' } } }} />
                    <Line data={generateLineChartData(ma_list, 'MA')} options={{ responsive: true, plugins: { title: { display: true, text: 'Medisave Account Trend' } } }} />
                    </div>
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Additional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="flex items-center">
                            <ArrowDownCircle className="text-blue-500 mr-2" />
                            <p><span className="font-semibold">CPF Life Payout (Applicant 1):</span> ${cpf_life_payout.applicant1.toLocaleString()} per month</p>
                            </div>
                            <div className="flex items-center">
                            <ArrowDownCircle className="text-green-500 mr-2" />
                            <p><span className="font-semibold">Retirement Sum (Applicant 1):</span> ${retirement_sum_achieved.applicant1.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center">
                            <ArrowDownCircle className="text-purple-500 mr-2" />
                            <p><span className="font-semibold">CPF Excess (Applicant 1):</span> ${cpf_excess_dict.applicant1.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                            <ArrowDownCircle className="text-blue-500 mr-2" />
                            <p><span className="font-semibold">CPF Life Payout (Applicant 2):</span> ${cpf_life_payout.applicant2.toLocaleString()} per month</p>
                            </div>
                            <div className="flex items-center">
                            <ArrowDownCircle className="text-green-500 mr-2" />
                            <p><span className="font-semibold">Retirement Sum (Applicant 2):</span> ${retirement_sum_achieved.applicant2.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center">
                            <ArrowDownCircle className="text-purple-500 mr-2" />
                            <p><span className="font-semibold">CPF Excess (Applicant 2):</span> ${cpf_excess_dict.applicant2.toLocaleString()}</p>
                            </div>
                        </div>
                        </div>
                    </motion.div>
                    </>

                ) : (
                  <PremiumFeatureLock
                  featureDescription={'Find out how your housing payments affect your CPF balance and retirement sum!'}
                  />
                  )
            }
          </>
        )}
      </motion.div>

    </motion.div>
  );
};

export default HousingResultVisualization;