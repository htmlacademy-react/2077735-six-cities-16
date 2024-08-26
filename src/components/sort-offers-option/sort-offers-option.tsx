import { capitalizeFirstChar } from '../../helpers/capitalize-first-char';
import cn from 'classnames';

import type { TSortingOption } from '../../types';

type SortOffersOptionProps = {
  sortingOption: TSortingOption;
  currentType: TSortingOption;
  onOptionClick: (sortingOption: TSortingOption) => void;
};

export default function SortOffersOption({
  sortingOption,
  currentType,
  onOptionClick,
}: SortOffersOptionProps) {
  return (
    <li
      className={cn('places__option', {
        'places__option--active': currentType === sortingOption,
      })}
      tabIndex={0}
      onClick={() => onOptionClick(sortingOption)}
    >
      {capitalizeFirstChar(sortingOption)}
    </li>
  );
}
