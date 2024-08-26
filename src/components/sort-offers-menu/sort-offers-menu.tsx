import cn from 'classnames';
import { useState } from 'react';
import { SortingOption } from '../../const';
import SortOffersOption from '../sort-offers-option/sort-offers-option';
import { capitalizeFirstChar } from '../../helpers/capitalize-first-char';

import type { TSortingOption } from '../../types';

type SortOffersMenuProps = {
  currentSortOption: TSortingOption;
  onOptionChange: (option: TSortingOption) => void;
};

export default function SortOffersMenu({
  currentSortOption,
  onOptionChange,
}: SortOffersMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (sortOption: TSortingOption) => {
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
      <ul
        className={cn('places__options', 'places__options--custom', {
          'places__options--opened': isOpen,
        })}
      >
        {(
          Object.keys(SortingOption) as Array<keyof typeof SortingOption>
        ).map((option) => (
          <SortOffersOption
            key={option}
            sortingOption={SortingOption[option]}
            onOptionClick={handleOptionClick}
            currentType={currentSortOption}
          />
        ))}
      </ul>
    </form>
  );
}
