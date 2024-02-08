import React from 'react';

interface PricesFormProps {
  OneThreeDays?: string;
  FourSixDays?: string;
  SevenThirteenDays?: string;
  FourteenTwentyNineDays?: string;
  Month?: string;
  Insurance?: string;
  Deposit?: string;
  Age?: string;
  License?: string;
  DailyLimit?: string;
  WeeklyLimit?: string;
  TwoWeeksLimit?: string;
  MonthlyLimit?: string;
  AnnualyLimit?: string;
  Service?: string;
  carName?: string;
  ReadMoreOne?: string;
  ReadMoreTwo?: string;
}

const PricesForm: React.FC<PricesFormProps> = ({
    OneThreeDays,
    FourSixDays,
    SevenThirteenDays,
    FourteenTwentyNineDays,
    Month,
    Insurance,
    Deposit,
    Age,
    License,
    DailyLimit,
    WeeklyLimit,
    TwoWeeksLimit,
    MonthlyLimit,
    AnnualyLimit,
    Service,
    carName,
    ReadMoreOne,
    ReadMoreTwo
}) => {

return (
  <div className="px-0 mt-50px text-white pt-25 pl-15 pr-15 md:mt-[70px] md:px-15">
    <div className="xl:w-desk mx-auto flex flex-col">
      <div className='flex flex-col md:flex-row' >
        <div className="w-full md:w-2/3 md:pr-[30px]">
            <p className="pl-[8px] border-l-4 border-yellow mb-[30px] font-bold text-[25px] text-left">
            Gross Prices
            </p>
            <div className="flex">
            <table className="w-full border-separate border-spacing-[2px] flex flex-row md:flex-col gap-[2px] md:gap-0 text-[13px]">
                <thead className='flex flex-row md:flex-col w-1/2 md:w-full'>
                <tr className='flex flex-col md:flex-row gap-px w-full'>
                    <th className="bg-days py-[24px] px-[4px] w-full md:w-1/5">
                    1-3 DAYS
                    </th>
                    <th className="bg-days py-[24px] px-[4px] w-full md:w-1/5">
                    4-6 DAYS
                    </th>
                    <th className="bg-days py-[24px] px-[4px] w-full md:w-1/5">
                    7-13 DAYS
                    </th>
                    <th className="bg-days py-[24px] px-[4px] w-full md:w-1/5">
                    14-29 DAYS
                    </th>
                    <th className="bg-days py-[24px] px-[4px] w-full md:w-1/5">1 MONTH</th>
                </tr>
                </thead>
                <tbody className='flex flex-row md:flex-col w-1/2 md:w-full'>
                <tr className='flex flex-col md:flex-row gap-px w-full'>
                    <td className="bg-prices text-yellow py-[24px] px-[4px] font-bold w-full md:w-1/5">
                    {OneThreeDays}
                    </td>
                    <td className="bg-prices text-yellow py-[24px] px-[4px] font-bold w-full md:w-1/5">
                    {FourSixDays}
                    </td>
                    <td className="bg-prices text-yellow py-[24px] px-[4px] font-bold w-full md:w-1/5">
                    {SevenThirteenDays}
                    </td>
                    <td className="bg-prices text-yellow py-[24px] px-[4px] font-bold w-full md:w-1/5">
                    {FourteenTwentyNineDays}
                    </td>
                    <td className="bg-prices text-yellow py-[24px] px-[4px] font-bold w-full md:w-1/5">
                    {Month}
                    </td>
                </tr>
                </tbody>
            </table>
            </div>

            <div className="flex flex-col md:flex-row gap-[50px] md:gap-[20px] mt-[50px]">
            <div className="w-full md:w-1/2">
                <p className="pl-[8px] border-l-4 border-yellow mb-[30px] font-bold text-[25px] text-left">
                Gross Refundable Deposit
                </p>
                <table className="w-full border-separate border-spacing-[2px] ">
                <thead>
                    <tr>
                    <th className="bg-days md:pt-[24px] md:pb-[10px] px-[6px] text-[13px] leading-[15px] h-[60px]">
                        PAYMENT AT THE OFFICE
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="bg-prices text-yellow px-[4px] font-bold text-[14px] h-[60px]">
                        {Deposit}
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>

            <div className="w-full md:w-1/2">
                <p className="pl-[8px] border-l-4 border-yellow mb-[30px] font-bold text-[25px] text-left">
                Insurance
                </p>
                <table className="w-full border-separate border-spacing-[2px] text-[13px]">
                <thead>
                    <tr>
                    <th className="bg-days md:pt-[20px] md:pb-[10px] px-[6px] text-[13px] leading-[15px] h-[60px]">
                        LIABILITY INSURANCE, COMPREHENSIVE INSURANCE, ACCIDENT
                        INSURANCE
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="bg-prices text-yellow px-[4px] font-bold text-[14px] h-[60px]">
                        {Insurance}
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-[20px] mt-[50px]">
            <div className="md:w-58p">
                <p className="pl-[8px] border-l-4 border-yellow mb-[30px] font-bold text-[25px] text-left">
                    Requirements
                </p>

                <table className="w-full border-separate border-spacing-[2px] flex flex-row md:flex-col gap-[2px] text-[13px]">
                <thead className='flex flex-row md:flex-col w-1/2 md:w-full'>
                    <tr className='flex flex-col md:flex-row gap-px w-full'>
                        <th className="bg-days px-[6px] text-[13px] leading-[15px] h-[60px] flex items-center justify-center md:w-1/2">
                            MINIMUM DRIVER'S AGE
                        </th>
                        <th className="bg-days px-[6px] text-[13px] leading-[15px] h-[60px] flex items-center justify-center md:w-1/2">
                            HAVING A DRIVER'S LICENSE
                        </th>
                    </tr>
                </thead>
                <tbody className='flex flex-row md:flex-col w-1/2 md:w-full'>
                    <tr className='flex flex-col md:flex-row gap-px w-full'>
                    <td className="bg-prices text-yellow px-[4px] font-bold text-[14px] h-[60px] flex items-center justify-center md:w-1/2">
                        {Age}
                    </td>
                    <td className="bg-prices text-yellow px-[4px] font-bold text-[14px] h-[60px] flex items-center justify-center md:w-1/2">
                        {License}
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>

            <div className="md:w-[41.66666667%] mt-[50px] md:mt-0">
                <p className="pl-[8px] border-l-4 border-yellow mb-[30px] font-bold text-[25px] text-left">
                    24/7 Service
                </p>

                <table className="w-full border-separate border-spacing-[2px] ">
                <thead>
                    <tr>
                    <th className="bg-days px-[6px] text-[13px] leading-[15px] h-[60px]">
                        MAINTENANCE, INSPECTIONS, TYRES
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="bg-prices text-yellow px-[4px] font-bold text-[14px] h-[60px]">
                        {Service}
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>

            <p className="pl-[8px] border-l-4 border-yellow mb-[30px] font-bold text-[25px] text-left mt-[50px]">
                Mileage Limit
            </p>

            <div className="flex ">
            <table className="w-full border-separate border-spacing-[2px] flex flex-row md:flex-col gap-[2px] md:gap-0 text-[13px]">
                <thead className='flex flex-row md:flex-col w-1/2 md:w-full'>
                <tr className='flex flex-col md:flex-row gap-px w-full'>
                    <th className="bg-days py-[24px] px-[4px] md:w-1/5">DAILY</th>
                    <th className="bg-days py-[24px] px-[4px] md:w-1/5">WEEKLY</th>
                    <th className="bg-days py-[24px] px-[4px] md:w-1/5">
                    TWO WEEKS
                    </th>
                    <th className="bg-days py-[24px] px-[4px] md:w-1/5">MONTHLY</th>
                    <th className="bg-days py-[24px] px-[4px] md:w-1/5">
                    ANNUALLY
                    </th>
                </tr>
                </thead>
                <tbody className='flex flex-row md:flex-col w-1/2 md:w-full'>
                <tr className='flex flex-col md:flex-row gap-px w-full'>
                    <td className="bg-prices text-yellow py-[24px] px-[4px] font-bold md:w-1/5">
                    {DailyLimit}
                    </td>
                    <td className="bg-prices text-yellow py-[24px] px-[4px] font-bold md:w-1/5">
                    {WeeklyLimit}
                    </td>
                    <td className="bg-prices text-yellow py-[24px] px-[4px] font-bold md:w-1/5">
                    {TwoWeeksLimit}
                    </td>
                    <td className="bg-prices text-yellow py-[24px] px-[4px] font-bold md:w-1/5">
                    {MonthlyLimit}
                    </td>
                    <td className="bg-prices text-yellow py-[24px] px-[4px] font-bold md:w-1/5">
                    {AnnualyLimit}
                    </td>
                </tr>
                </tbody>
            </table>
            </div>

            

        </div>

        <div className='w-full md:w-1/3 md:pl-[20px] mt-[50px]'>
            <div className='md:w-[95%] md:float-right'>
                <form method="post" className='bg-box-grey py-[36px] px-[32px] w-full'>
                    <h4 className='md:text-[18px] mb-[10px] md:mb-[15px] text-left font-bold'>{carName}</h4>
                    <div className="w-[125px] h-4 bg-primary mb-[20px]"></div>
                    <input type="date" className='w-full' />
                </form>
            </div>
            
        </div>
      </div>

        <div className='mb-[60px] mt-[100px] md:mb-[80px]' id='more'>
            <h2 className="mb-15 text-[26px] md:text-35 text-left font-bold leading-10">
                {carName}
            </h2>
            <div className="w-85px h-4 bg-primary mb-[40px]"></div>

            <div className='border-l-[4px] border-yellow px-[10px] py-[5px] text-left'>
                <p className='text-[14px] leading-[27px] mb-[40px] md:mb-[60px] px-[5px]'>{ReadMoreOne}</p>
                <p className='text-[14px] leading-[27px] mb-[40px] md:mb-[60px] px-[5px]'>{ReadMoreTwo}</p>
            </div>
        </div>

    </div>
  </div>
);
};

export default PricesForm;