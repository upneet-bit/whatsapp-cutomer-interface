import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

const Pagination = () => (
  <div className="mt-4 flex justify-center">
    <button className="text-gray-600 mx-1"><ChevronLeft size={20} /></button>
    <button className="text-gray-600 mx-1">1</button>
    <button className="text-gray-600 mx-1"><ChevronRight size={20} /></button>
    <button className="text-gray-600 mx-1"><ChevronsRight size={20} /></button>
  </div>
);

export default Pagination;
