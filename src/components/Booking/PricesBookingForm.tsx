import React, { useState, useEffect } from 'react';

interface PricesBookingFormProps {
  OneThreeDays?: string;
  FourSixDays?: string;
  SevenThirteenDays?: string;
  FourteenTwentyNineDays?: string;
  Month?: string;
  carName?: string;
  Deposit?: string;
  DailyLimit?: string;
  WeeklyLimit?: string;
  TwoWeeksLimit?: string;
  MonthlyLimit?: string;
  AnnualyLimit?: string;
  Booking?: string;
}

const PricesBookingForm: React.FC<PricesBookingFormProps> = ({
  OneThreeDays = '0',
  FourSixDays,
  SevenThirteenDays,
  FourteenTwentyNineDays,
  Month,
  carName,
  Deposit,
  DailyLimit,
  WeeklyLimit,
  TwoWeeksLimit,
  MonthlyLimit,
  AnnualyLimit,
  Booking,
}) => {
  const [selectedPickUpDateTime, setPickUpDateTime] = useState<string>('');
  const [selectedReturnDateTime, setReturnDateTime] = useState<string>('');
  const [selectedPickUpLocation, setPickUpLocation] = useState<string>('');
  const [selectedReturnLocation, setReturnLocation] = useState<string>('');
  const [selectedDailyPrice, setSelectedDailyPrice] = useState<number>(parseFloat(OneThreeDays || '0'));

  const pickUpLocations = [
    { label: 'Office - Bokserska 64', cost: 0 },
    { label: 'Chopin Airport', cost: 99 },
    { label: 'Modlin Airport', cost: 199 },
  ];

  function getDefaultPickUpDateTime(): string {
    const currentDate = new Date();
    return `${currentDate.toISOString().split('T')[0]}T12:00`;
  }

  function getDefaultReturnDateTime(pickUpDate: Date): string {
    const nextDay = new Date(pickUpDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return `${nextDay.toISOString().split('T')[0]}T12:00`;
  }

  const calculateDaysDifference = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.ceil(daysDifference);
  };

  const calculatePrice = (): number => {
    const days = calculateDaysDifference(selectedPickUpDateTime, selectedReturnDateTime);
    const pricePerDay = selectedDailyPrice;

    const pickUpLocationCost = pickUpLocations.find((loc) => loc.label === selectedPickUpLocation)?.cost || 0;
    const returnLocationCost = pickUpLocations.find((loc) => loc.label === selectedReturnLocation)?.cost || 0;

    return pricePerDay * days + pickUpLocationCost + returnLocationCost;
  };

  const calculateMileageLimit = (): string => {
    const days = calculateDaysDifference(selectedPickUpDateTime, selectedReturnDateTime);
    let mileageLimit = DailyLimit || '';

    if (days >= 7 && days <= 13) mileageLimit = WeeklyLimit || '';
    else if (days >= 14 && days <= 29) mileageLimit = TwoWeeksLimit || '';
    else if (days >= 30) mileageLimit = MonthlyLimit || '';

    return mileageLimit;
  };

  const updateDailyPrice = () => {
    const days = calculateDaysDifference(selectedPickUpDateTime, selectedReturnDateTime);

    if (days >= 1 && days <= 3) setSelectedDailyPrice(parseFloat(OneThreeDays || '0'));
    else if (days >= 4 && days <= 6) setSelectedDailyPrice(parseFloat(FourSixDays || '0'));
    else if (days >= 7 && days <= 13) setSelectedDailyPrice(parseFloat(SevenThirteenDays || '0'));
    else if (days >= 14 && days <= 29) setSelectedDailyPrice(parseFloat(FourteenTwentyNineDays || '0'));
    else if (days >= 30) setSelectedDailyPrice(parseFloat(Month || '0'));
  };

  useEffect(() => {
    setPickUpDateTime(getDefaultPickUpDateTime());
  }, []);

  useEffect(() => {
    if (selectedPickUpDateTime) {
      setReturnDateTime(getDefaultReturnDateTime(new Date(selectedPickUpDateTime)));
    }
  }, [selectedPickUpDateTime]);

  useEffect(() => {
    updateDailyPrice();
  }, [selectedPickUpDateTime, selectedReturnDateTime]);

  return (
    <form method="post" className="bg-box-grey w-full min-w-full text-left">
      <div className="mt-4 w-full flex flex-col text-left">
        <label htmlFor="pickUpDateTime" className='mb-[3px]'>Pick-up</label>
        <input
          type="datetime-local"
          id="pickUpDateTime"
          name="pickUpDateTime"
          value={selectedPickUpDateTime}
          onChange={(e) => setPickUpDateTime(e.target.value)}
          className='bg-box-grey p-[10px] md:py-[7px] md:p-[5px] border-[0.4px] border-forms-border rounded-none min-w-full text-left'
        />
      </div>

      <div className="mt-2 w-full flex flex-col text-left">
        <label htmlFor="returnDateTime" className='mb-[3px]'>Return</label>
        <input
          type="datetime-local"
          id="returnDateTime"
          name="returnDateTime"
          value={selectedReturnDateTime}
          onChange={(e) => setReturnDateTime(e.target.value)}
          className='bg-box-grey p-[10px] md:py-[7px] md:p-[5px] border-[0.4px] border-forms-border rounded-none min-w-full text-left'
        />
      </div>

      <div className="mt-2 w-full flex flex-col text-left">
        <label htmlFor="pickupLocation" className='mb-[3px]'>Pick-up Location:</label>
        <select
          value={selectedPickUpLocation}
          onChange={(e) => setPickUpLocation(e.target.value)}
          className='bg-box-grey p-[10px] md:py-[7px] md:p-[5px] border-[0.4px] border-forms-border rounded-none'
        >
          {pickUpLocations.map((location, index) => (
            <option key={index} value={location.label}>{`${location.label} - ${location.cost} PLN`}</option>
          ))}
        </select>
      </div>
      
      <div className="mt-2 w-full flex flex-col text-left">
        <label htmlFor="returnLocation" className='mb-[3px]'>Return Location:</label>
        <select
          value={selectedReturnLocation}
          onChange={(e) => setReturnLocation(e.target.value)}
          className='bg-box-grey p-[10px] md:py-[7px] md:p-[5px] border-[0.4px] border-forms-border rounded-none'
        >
          {pickUpLocations.map((location, index) => (
            <option key={index} value={location.label}>{`${location.label} - ${location.cost} PLN`}</option>
          ))}
        </select>
      </div>

      <div className="mt-[10px] flex flex-row justify-between py-[7px] border-t-[0.4px] border-forms-border text-[14px] font-normal font-bold text-yellow">
        <strong className='text-[14px] font-normal text-white'>Days</strong> {calculateDaysDifference(selectedPickUpDateTime, selectedReturnDateTime)}
      </div>

      <div className="flex flex-row justify-between py-[7px] border-t-[0.4px] border-forms-border text-[14px] font-bold text-yellow">
        <strong className='text-[14px] font-normal text-white'>Price per day</strong> {selectedDailyPrice} PLN
      </div>

      <div className="flex flex-row justify-between py-[7px] border-t-[0.4px] border-forms-border text-[14px] font-bold text-yellow">
        <strong className='text-[14px] font-normal text-white'>Refundable deposit</strong> {Deposit}
      </div>

      <div className="flex flex-row justify-between py-[7px] border-t-[0.4px] border-forms-border text-[14px] font-bold text-yellow">
        <strong className='text-[14px] font-normal text-white'>Total mileage limit</strong> {calculateMileageLimit()} 
      </div>

      <div className="flex flex-row justify-between py-[7px] border-t-[0.4px] border-forms-border text-[14px] font-bold text-yellow">
        <strong className='text-[14px] font-normal text-white text-left'>Car pick-up outside of office hours</strong>
        <span>{pickUpLocations.find((loc) => loc.label === selectedPickUpLocation)?.cost || '0'} PLN</span>
      </div>

      <div className="flex flex-row justify-between py-[7px] border-t-[0.4px] border-forms-border text-[14px] font-bold text-yellow">
        <strong className='text-[14px] font-normal text-white text-left'>Car return outside of office hours</strong>
        <span>{pickUpLocations.find((loc) => loc.label === selectedReturnLocation)?.cost || '0'} PLN</span>
      </div>

      <div className="flex flex-row justify-between pt-[12px]  pb-[7px] border-t-[0.4px] border-forms-border text-[14px] font-bold text-yellow">
        <strong className='text-[14px] font-normal text-white'>AMOUNT DUE</strong> {calculatePrice()} PLN
      </div>
    </form>
  );
};

export default PricesBookingForm;
