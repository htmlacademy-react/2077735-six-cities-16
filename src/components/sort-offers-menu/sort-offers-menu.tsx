import { useState } from 'react';
import { SORTING_OPTION } from '../../const';
import SortOffersOption from '../sort-offers-option/sort-offers-option';
import { capitalizeFirstChar } from '../../helpers/capitalize-first-char';

import type { SortingOption } from '../../types';

type SortOffersMenuProps = {
  currentSortOption: SortingOption;
  onOptionChange: (option: SortingOption) => void;
};

export default function SortOffersMenu({
  currentSortOption,
  onOptionChange,
}: SortOffersMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (sortOption: SortingOption) => {
    onOptionChange(sortOption);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span
        onClick={handleSortClick}
        className="places__sorting-type"
        tabIndex={0}
      >
        {capitalizeFirstChar(currentSortOption)}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {(
            Object.keys(SORTING_OPTION) as Array<keyof typeof SORTING_OPTION>
          ).map((option) => (
            <SortOffersOption
              key={option}
              sortingOption={SORTING_OPTION[option]}
              onOptionClick={handleOptionClick}
              currentType={currentSortOption}
            />
          ))}
        </ul>
      )}
    </form>
  );
}
