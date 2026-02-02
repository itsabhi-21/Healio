import React from 'react';

export default function DashboardPreview() {
  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
        <div className="bg-blue-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Health Dashboard</h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 rounded-lg p-3">
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm opacity-90">Health Score</div>
            </div>
            <div className="bg-blue-500 rounded-lg p-3">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-90">Symptoms</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 bg-gray-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex-1 bg-gray-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            </div>
            <div className="flex-1 bg-gray-100 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}