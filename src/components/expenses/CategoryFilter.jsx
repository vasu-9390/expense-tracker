import React from 'react';
import { CATEGORIES } from '../../utils/constants';
import { useTheme } from '../../context/ThemeContext';

const CategoryFilter = ({ filterCat, setFilterCat }) => {
  const { colors } = useTheme();
  const categories = ['All', ...CATEGORIES.map(x => x.name)];

  return (
    <div className="flex gap-1.5 flex-wrap mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setFilterCat(cat)}
          className="px-3 py-1 text-xs rounded-lg transition-all"
          style={{
            background: filterCat === cat ? colors.accent : colors.card,
            color: filterCat === cat ? '#fff' : colors.text,
            border: `1px solid ${colors.border}`
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;