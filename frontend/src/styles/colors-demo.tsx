// Color Palette Demo - How to use the new colors
import React from 'react';

export const ColorPaletteDemo = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Color Palette Demo</h1>

      {/* Background colors */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Background Colors</h2>
        <div className="flex space-x-4">
          <div className="w-32 h-32 bg-background flex items-center justify-center text-white rounded-lg">
            <span className="text-sm font-medium">bg-background</span>
          </div>
          <div className="w-32 h-32 bg-primary-background flex items-center justify-center text-white rounded-lg">
            <span className="text-sm font-medium">bg-primary-background</span>
          </div>
        </div>
      </div>

      {/* Secondary colors */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Secondary Colors</h2>
        <div className="flex space-x-4">
          <div className="w-32 h-32 bg-secondary flex items-center justify-center text-gray-800 rounded-lg">
            <span className="text-sm font-medium">bg-secondary</span>
          </div>
          <div className="w-32 h-32 bg-primary-secondary flex items-center justify-center text-gray-800 rounded-lg">
            <span className="text-sm font-medium">bg-primary-secondary</span>
          </div>
        </div>
      </div>

      {/* Disable colors */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Disable Colors</h2>
        <div className="flex space-x-4">
          <div className="w-32 h-32 bg-disable flex items-center justify-center text-white rounded-lg">
            <span className="text-sm font-medium">bg-disable</span>
          </div>
          <div className="w-32 h-32 bg-primary-disable flex items-center justify-center text-white rounded-lg">
            <span className="text-sm font-medium">bg-primary-disable</span>
          </div>
        </div>
      </div>

      {/* Usage examples */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Usage Examples</h2>
        <div className="space-y-4">
          <button className="px-4 py-2 bg-background text-secondary rounded-lg hover:bg-opacity-80">
            Button with background color
          </button>

          <div className="p-4 bg-secondary border border-disable rounded-lg">
            <p className="text-background">Card with secondary background</p>
            <p className="text-disable text-sm">Disabled text color</p>
          </div>

          <input
            type="text"
            placeholder="Disabled input"
            className="w-full px-3 py-2 border border-disable bg-secondary text-background rounded-lg opacity-60 cursor-not-allowed"
            disabled
          />
        </div>
      </div>
    </div>
  );
};
