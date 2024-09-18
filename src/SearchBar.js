import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="flex mb-4">
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder="Search by Contact ID, Order ID, Associate, Status, Issue Code"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full border rounded-l px-3 py-2 text-sm pr-8"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}
    </div>
    <button className="bg-[#FF9900] text-white px-4 py-2 rounded-r">
      <Search size={18} />
    </button>
  </div>
);

export default SearchBar;