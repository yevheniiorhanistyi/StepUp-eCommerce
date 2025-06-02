'use client';

import { useState } from 'react';

export function ProductSizeSelector({
  variants,
  currentKey
}: {
  variants: Array<{
    key: string;
    size: string;
  }>;
  currentKey: string;
}) {
  const [selectedKey, setSelectedKey] = useState(currentKey);

  return (
    <div className="flex flex-wrap gap-2">
      {variants.map(({ key, size }) => (
        <button
          key={key}
          type="button"
          onClick={() => setSelectedKey(key)}
          className={`px-3 py-2 rounded-md text-sm border transition ${
            selectedKey === key
              ? 'bg-black text-white border-black'
              : 'bg-white text-black border-gray-300 hover:border-black'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
