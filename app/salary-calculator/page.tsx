"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { SlReload } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getBasicSalary } from "@/redux/basicSalary/BasicSalary";
import { RootState } from "@/redux/store";

interface Earning {
  id: number;
  value: string;
  epfEtf: boolean;
  amount: number;
}

const Page = () => {
  const dispatch = useDispatch();

  /*=============== Earnings ===============*/
  const [earnings, setEarnings] = useState<Earning[]>([
    { id: 1, value: "", epfEtf: false, amount: 0 },
  ]);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  useEffect(() => {
    const total = earnings.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalEarnings(total);
  }, [earnings]);
  console.log(totalEarnings)

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

 /*=============== Deductions ===============*/
 const [deductions, setDeductions] = useState([{ id: 1, value: "" }]);

  const addDeduction = () => {
    setDeductions([...deductions, { id: deductions.length + 1, value: "" }]);
  };

  const removeDeduction = (id: number) => {
    setDeductions(deductions.filter((deduction) => deduction.id !== id));
  };

  /*=============== dispatch data ===============*/
  const handleBasicSalaryChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    dispatch(getBasicSalary(value));
  };

  /*=============== Get data ===============*/
  const StoredBasicSalary = useSelector(
    (state: RootState) => state.basicSalary.basicSalary
  );
  const [basicSalary, setBasicSalary] = useState("0");
  useEffect(() => {
    setBasicSalary(StoredBasicSalary);
  }, [StoredBasicSalary]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Calculate Your Salary</h1>
          <Button color="primary" variant="light">
            <SlReload className="w-5 h-5 text-blue-500" />
            <span className="ml-2 text-blue-500">Reset</span>
          </Button>
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-1"
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
            className="w-1/2"
            onChange={handleBasicSalaryChange}
            value={basicSalary}
          />
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Earnings</h2>
          <p className="text-sm text-gray-500 mb-4">
            Allowance, Fixed Allowance, Bonus and etc.
          </p>
          {earnings.map((earning) => (
            <div key={earning.id} className="flex mb-2">
              <div className="flex items-center justify-between w-1/2 gap-2">
                <Input
                  id={`Earnings${earning.id}`}
                  variant="bordered"
                  radius="sm"
                  className="w-3/5"
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
                  className="w-2/5"
                  value={earning.amount.toString()}
                  onChange={(e) =>
                    handleEarningChange(earning.id, "amount", +e.target.value)
                  }
                />
              </div>
              <div className="flex items-center justify-start gap-5 pl-5 w-1/2">
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
          <h2 className="text-lg font-medium mb-2">Deductions</h2>
          <p className="text-sm text-gray-500 mb-4">
            Salary Advances, Loan Deductions and all
          </p>
          {deductions.map((deduction) => (
            <div key={deduction.id} className="flex mb-2">
              <div className="flex items-center justify-between w-1/2 gap-2">
                <Input
                  id={`Deductions${deduction.id}`}
                  variant="bordered"
                  radius="sm"
                  className="w-3/5"
                  placeholder="Pay Details (Title)"
                  value={deduction.value}
                  onChange={(e) =>
                    setDeductions(
                      deductions.map((item) =>
                        item.id === deduction.id
                          ? { ...item, value: e.target.value }
                          : item
                      )
                    )
                  }
                />
                <Input
                  type="number"
                  id={`DeductionsPrice${deduction.id}`}
                  placeholder="Amount"
                  variant="bordered"
                  radius="sm"
                  className="w-2/5"
                />
              </div>
              <div className="flex items-center justify-start gap-5 pl-5 w-1/2">
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
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your salary</h2>
        <div className="space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Items</span>
            <span className="font-medium">Amount</span>
          </div>
          <div className="flex justify-between">
            <span>Basic Salary</span>
            <span>{basicSalary ? `${basicSalary}.00` : "0.00"}</span>
          </div>
          <div className="flex justify-between">
            <span>Gross Earning</span>
            <span>{totalEarnings ? `${totalEarnings}.00` : "0.00"}</span>
          </div>
          <div className="flex justify-between">
            <span>Gross Deduction</span>
            <span>- 8,000.00</span>
          </div>
          <div className="flex justify-between">
            <span>Employee EPF (8%)</span>
            <span>- 12,160.00</span>
          </div>
          <div className="flex justify-between">
            <span>APIT</span>
            <span>- 3,740.00</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="font-semibold">Net Salary (Take Home)</span>
            <span className="font-semibold">136,100.00</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mt-4">
          Contribution from the Employer
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Employee EPF (12%)</span>
            <span>18,240.00</span>
          </div>
          <div className="flex justify-between">
            <span>Employee ETF (3%)</span>
            <span>4,560.00</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="font-semibold">CTC (Cost to Company)</span>
            <span className="font-semibold">174,800.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
