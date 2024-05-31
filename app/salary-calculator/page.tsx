"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  getBasicSalary,
  resetBasicSalary,
} from "@/redux/basicSalary/BasicSalary";
import { RootState } from "@/redux/store";
import { getEarnings, resetEarnings } from "@/redux/earnings/Earnings";
import { getDeductions, resetDeductions } from "@/redux/deductions/Deductions";
import calculateTax from "@/lib/calculateTax";
import Image from "next/image";

/*=============== Types ===============*/
interface Earnings {
  id: number;
  value: string;
  epfEtf: boolean;
  amount: number;
}
interface Deductions {
  id: number;
  value: string;
  amount: number;
}

const Page = () => {
  const dispatch = useDispatch();

  /*=============== Get data ===============*/
  const StoredBasicSalary = useSelector(
    (state: RootState) => state.basicSalary.basicSalary
  );
  const StoredEarning = useSelector(
    (state: RootState) => state.earnings.earnings
  );
  const StoredDeductions = useSelector(
    (state: RootState) => state.deductions.deductions
  );

  const [basicSalary, setBasicSalary] = useState<number>(0);

  useEffect(() => {
    setBasicSalary(StoredBasicSalary);
  }, [StoredBasicSalary]);

  const handleBasicSalaryChange = (e: { target: { value: any } }) => {
    const value = +e.target.value;
    dispatch(getBasicSalary(value));
  };

  /*=============== Earnings ===============*/
  const [earnings, setEarnings] = useState<Earnings[]>([]);

  useEffect(() => {
    if (StoredEarning.length > 0) {
      setEarnings(StoredEarning);
    } else {
      setEarnings([{ id: 1, value: "", epfEtf: false, amount: 0 }]);
    }
  }, []);

  const addEarning = () => {
    setEarnings([
      ...earnings,
      { id: earnings.length + 1, value: "", epfEtf: false, amount: 0 },
    ]);
  };

  const removeEarning = (id: number) => {
    setEarnings(earnings.filter((earning) => earning.id !== id));
  };

  const handleEarningChange = (id: number, key: string, value: any) => {
    setEarnings((prevEarnings) =>
      prevEarnings.map((earning) =>
        earning.id === id ? { ...earning, [key]: value } : earning
      )
    );
  };

  const [sumOfEarnings, setSumOfEarnings] = useState<number>(0);
  useEffect(() => {
    const total = earnings.reduce((acc, curr) => acc + curr.amount, 0);
    setSumOfEarnings(total);
    dispatch(getEarnings(earnings));
  }, [earnings]);

  const totalEarningsForEPF = earnings
    .filter((earning) => earning.epfEtf)
    .reduce((acc, curr) => acc + curr.amount, 0);

  /*=============== Deductions ===============*/
  const [deductions, setDeductions] = useState<Deductions[]>([]);

  useEffect(() => {
    if (StoredDeductions.length > 0) {
      setDeductions(StoredDeductions);
    } else {
      setDeductions([{ id: 1, value: "", amount: 0 }]);
    }
  }, []);

  const addDeduction = () => {
    setDeductions([
      ...deductions,
      { id: deductions.length + 1, value: "", amount: 0 },
    ]);
  };

  const removeDeduction = (id: number) => {
    setDeductions(deductions.filter((deduction) => deduction.id !== id));
  };

  const handleDeductionChange = (id: number, key: string, value: any) => {
    setDeductions((prevDeductions) =>
      prevDeductions.map((deduction) =>
        deduction.id === id ? { ...deduction, [key]: value } : deduction
      )
    );
  };

  const [totalDeductions, setTotalDeductions] = useState<number>(0);
  useEffect(() => {
    const total = deductions.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalDeductions(total);
    dispatch(getDeductions(deductions));
  }, [deductions]);

  /*=============== calculation ===============*/
  const grossEarnings = (basicSalary ?? 0) * 1 + sumOfEarnings * 1;
  const EmployeeEPF = ((basicSalary ?? 0) * 1 + totalEarningsForEPF * 1) * 0.08;
  const EmployerEPF = ((basicSalary ?? 0) * 1 + totalEarningsForEPF * 1) * 0.12;
  const EmployerETF = ((basicSalary ?? 0) * 1 + totalEarningsForEPF * 1) * 0.03;
  const APIT = calculateTax(grossEarnings);
  const NetSalary =
    grossEarnings * 1 - totalDeductions * 1 - EmployeeEPF * 1 - APIT;
  const CTC =
    grossEarnings * 1 - totalDeductions * 1 + EmployerEPF * 1 + EmployerETF * 1;

  /*=============== Reset ===============*/
  const resetAll = () => {
    dispatch(resetBasicSalary());
    dispatch(resetEarnings());
    dispatch(resetDeductions());
    setEarnings([{ id: 1, value: "", epfEtf: false, amount: 0 }]);
    setDeductions([{ id: 1, value: "", amount: 0 }]);
  };

  return (
    <div className="flex justify-center items-stretch align-i px-10 max-md:px-3 py-5 gap-10 max-xl:flex-col">
      <div className="m p-6 bg-gray-100 rounded-lg shadow-md flex-auto ring-2 ring-[#E0E0E0] w-3/5 max-xl:w-full">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-bold">Calculate Your Salary</h4>
          <Button color="primary" variant="light" onClick={resetAll}>
            {/* <SlReload className="w-5 h-5 text-blue-500" /> */}
            <Image
              src="/assets/icons/reset.png"
              alt="reset"
              width={20}
              height={20}
            />
            <span className="ml-2 text-xl text-blue-500 font-medium">
              Reset
            </span>
          </Button>
        </div>
        <div className="mb-6">
          <label
            className="text-base font-semibold block mb-2"
            htmlFor="basic-salary"
          >
            Basic Salary
          </label>
          <Input
            type="number"
            id="basic-salary"
            placeholder="Basic Salary"
            variant="bordered"
            radius="sm"
            className="w-1/2 max-md:w-full"
            onChange={handleBasicSalaryChange}
            value={basicSalary?.toString()}
          />
        </div>
        <div className="mb-6">
          <h2 className="text-base font-semibold block mb-2">Earnings</h2>
          <p className="text-sm font-normal block mb-2 text-gray-500">
            Allowance, Fixed Allowance, Bonus and etc.
          </p>
          {earnings.map((earning) => (
            <div key={earning.id} className="flex mb-2 max-md:flex-col">
              <div className="flex items-center justify-between w-1/2 max-md:w-full gap-2">
                <Input
                  id={`Earnings${earning.id}`}
                  variant="bordered"
                  radius="sm"
                  className="w-3/5 max-md:w-full"
                  placeholder="Pay Details (Title)"
                  value={earning.value}
                  onChange={(e) =>
                    handleEarningChange(earning.id, "value", e.target.value)
                  }
                />
                <Input
                  type="number"
                  id={`EarningsPrice${earning.id}`}
                  placeholder="Amount"
                  variant="bordered"
                  radius="sm"
                  className="w-2/5 max-md:w-full"
                  value={earning.amount.toString()}
                  onChange={(e) =>
                    handleEarningChange(earning.id, "amount", +e.target.value)
                  }
                />
              </div>
              <div className="flex items-center justify-start max-md:justify-around max-md:flex-col-reverse gap-5 max-md:gap-3 max-md:pt-2 pl-5 w-1/2 max-md:w-full ">
                <Button
                  isIconOnly
                  color="default"
                  variant="flat"
                  radius="full"
                  size="sm"
                  onClick={() => removeEarning(earning.id)}
                >
                  <IoClose className="w-5 h-5" />
                </Button>
                <Checkbox
                  checked={earning.epfEtf}
                  onChange={(e) =>
                    handleEarningChange(earning.id, "epfEtf", e.target.checked)
                  }
                >
                  EPF/ETF
                </Checkbox>
              </div>
            </div>
          ))}
          <Button
            className="flex items-center"
            variant="light"
            onClick={addEarning}
          >
            <FaPlus className="w-5 h-5 text-blue-500" />
            <span className="ml-2 text-blue-500">Add New Allowance</span>
          </Button>
        </div>
        <div>
          <h2 className="text-base font-semibold block mb-2">Deductions</h2>
          <p className="text-sm font-normal block mb-2 text-gray-500">
            Salary Advances, Loan Deductions and all
          </p>
          {deductions.map((deduction) => (
            <div key={deduction.id} className="flex mb-2 max-md:flex-col max-md:items-center">
              <div className="flex items-center justify-between w-1/2 max-md:w-full gap-2">
                <Input
                  id={`Deductions${deduction.id}`}
                  variant="bordered"
                  radius="sm"
                  className="w-3/5 max-md:w-full"
                  placeholder="Pay Details (Title)"
                  value={deduction.value}
                  onChange={(e) =>
                    handleDeductionChange(deduction.id, "value", e.target.value)
                  }
                />
                <Input
                  type="number"
                  id={`DeductionsPrice${deduction.id}`}
                  placeholder="Amount"
                  variant="bordered"
                  radius="sm"
                  className="w-2/5 max-md:w-full"
                  value={deduction.amount.toString()}
                  onChange={(e) =>
                    handleDeductionChange(
                      deduction.id,
                      "amount",
                      +e.target.value
                    )
                  }
                />
              </div>
              <div className="flex items-center justify-start max-md:justify-center gap-5 pl-5 max-md:pl-0 max-md:pt-2 w-1/2">
                <Button
                  isIconOnly
                  color="default"
                  variant="flat"
                  radius="full"
                  size="sm"
                  onClick={() => removeDeduction(deduction.id)}
                >
                  <IoClose className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            className="flex items-center"
            variant="light"
            onClick={addDeduction}
          >
            <FaPlus className="w-5 h-5 text-blue-500" />
            <span className="ml-2 text-blue-500">Add New Deduction</span>
          </Button>
        </div>
      </div>
      <div className="bg-gray-50 shadow-md rounded-lg p-6 flex-auto ring-2 ring-[#E0E0E0] w-2/5 max-xl:w-full">
        <h2 className="text-xl font-bold pb-2">Your salary</h2>
        <div className="space-y-2">
          <div className="flex justify-between pb-2">
            <span className="text-sm font-normal block text-gray-500">
              Items
            </span>
            <span className="text-sm font-normal block text-gray-500">
              Amount
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-normal text-base">Basic Salary</span>
            <span className="font-normal text-base">
              {basicSalary ? `${basicSalary}.00` : "0.00"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-normal text-base">Gross Earning</span>
            <span className="font-normal text-base">
              {grossEarnings ? `${grossEarnings}.00` : "0.00"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-normal text-base">Gross Deduction</span>
            <span className="font-normal text-base">
              {totalDeductions ? `- ${totalDeductions}.00` : "0.00"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-normal text-base">Employee EPF (8%)</span>
            <span className="font-normal text-base">
              {EmployeeEPF ? `- ${EmployeeEPF}.00` : "0.00"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-normal text-base">APIT</span>
            <span className="font-normal text-base">
              {APIT ? `- ${APIT}.00` : "0.00"}
            </span>
          </div>
          <div className="py-5">
            <div className="flex justify-between rounded-sm ring-2 ring-[#E0E0E0] p-2">
              <span className="font-semibold text-base max-md:flex max-md:flex-col">
                <span>Net Salary</span><span>(Take Home)</span>
              </span>
              <span className="font-semibold text-base">
                {NetSalary ? `${NetSalary}.00` : "0.00"}
              </span>
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-sm text-gray-500 pb-5">
          Contribution from the Employeer
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-normal text-base">Employeer EPF (12%)</span>
            <span className="font-normal text-base">
              {EmployerEPF ? `${EmployerEPF}.00` : "0.00"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-normal text-base">Employeer ETF (3%)</span>
            <span className="font-normal text-base">
              {EmployerETF ? `${EmployerETF}.00` : "0.00"}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="font-normal text-base">CTC (Cost to Company)</span>
            <span className="font-normal text-base">{CTC ? `${CTC}.00` : "0.00"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
