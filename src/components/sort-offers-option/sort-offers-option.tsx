import { capitalizeFirstChar } from '../../helpers/capitalize-first-char';
import cn from 'classnames';

import type { SortingOption } from '../../types';

type SortOffersOptionProps = {
  sortingOption: SortingOption;
  currentType: SortingOption;
  onOptionClick: (sortingOption: SortingOption) => void;
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
