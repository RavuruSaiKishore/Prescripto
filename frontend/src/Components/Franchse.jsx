import { useState } from "react";

export default function FranchiseDropdown() {
  const [selectedFranchises, setSelectedFranchises] = useState([]);

  const franchises = [
    "McDonald's",
    "Starbucks",
    "KFC",
    "Subway",
    "Burger King",
    "Domino's Pizza",
    "Pizza Hut",
    "Dunkin' Donuts",
    "Taco Bell",
    "7-Eleven",
  ];

  const handleSelection = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && !selectedFranchises.includes(selectedValue)) {
      setSelectedFranchises([...selectedFranchises, selectedValue]);
    }
  };

  const handleDelete = (franchise) => {
    setSelectedFranchises(
      selectedFranchises.filter((item) => item !== franchise)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-19 p-4">
      <div>
        <label
          htmlFor="franchise"
          className="text-lg font-medium text-gray-700"
        >
          Select a Franchise:
        </label>
        <select
          id="franchise"
          className="block w-64 px-4 py-2 mt-2 bg-white border border-gray-300 cursor-pointer focus:outline-none focus:ring rounded-md"
          onChange={handleSelection}
        >
          <option value="">Select a Franchise</option>
          {franchises.map((franchise, index) => (
            <option key={index} value={franchise}>
              {franchise}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Franchises */}
      <div className="mt-4 flex flex-col items-start w-64">
        {selectedFranchises.map((franchise, index) => (
          <div
            key={index}
            className="flex items-center justify-start gap-3 w-full text-black-700 cursor-pointer border-gray-300 rounded-lg"
            onClick={() => handleDelete(franchise)}
          >
            <span className="text-xl font-medium">{franchise}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-6 h-6 cursor-pointer"
            >
              <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
