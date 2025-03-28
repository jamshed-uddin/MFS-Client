"use client";
import { requestClient } from "@/utils/requestClient";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { NameNumberCard } from "./NameNumber";
import toast from "react-hot-toast";

const ReceiverNumber = () => {
  const [numberQuery, setNumberQuery] = useState("");
  const [userResult, setUserResult] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState("");
  const value = useDebounce(numberQuery, 600);

  const inputStyle =
    "input  border-b bg-inherit border-b-gray-400 rounded-none outline-none focus:outline-none focus:border-0 focus:border-b focus:border-b-gray-400 w-full px-1";

  const handleChange = (e) => {
    setSelectedNumber("");
    setNumberQuery(e.target.value);
  };

  useEffect(() => {
    if (!value) return;

    const getResult = async () => {
      try {
        const result = await requestClient(`/users/search?q=${value}`);

        setUserResult(result?.data);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    getResult();
  }, [value]);

  return (
    <div className="">
      <label className={"text-sm font-medium"} htmlFor="receiverNumber">
        Receiver number
      </label>
      <input
        id="receiverNumber"
        name="receiverMobile"
        type="text"
        className={inputStyle}
        placeholder="Receiver number"
        required
        onChange={handleChange}
        value={numberQuery}
      />
      <div className="bg-white  space-y-2 ">
        {value && !!userResult.length && !selectedNumber
          ? userResult?.map((user) => (
              <div
                key={user._id}
                className=" border-b border-gray-400  pb-2 cursor-pointer"
                onClick={() => {
                  setNumberQuery(user?.mobileNumber);
                  setSelectedNumber(user?.mobileNumber);
                  setUserResult([]);
                }}
              >
                <NameNumberCard name={user.name} number={user?.mobileNumber} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ReceiverNumber;
