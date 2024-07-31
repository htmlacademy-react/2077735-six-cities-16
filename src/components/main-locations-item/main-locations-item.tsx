type MainLocationsItemProps = {
  city: string;
};

export default function MainLocationsItem({ city }: MainLocationsItemProps) {
  const activeTab = city === 'Amsterdam';
  return (
    <li className="locations__item">
      <a
        className={`${
          activeTab && 'tabs__item--active'
        } locations__item-link tabs__item`}
        href="#"
      >
        <span>{city}</span>
      </a>
    </li>
  );
}

// import { NavLink } from "react-router-dom";

// export default function MainLocationsItem({ city }: MainLocationsItemProps) {
//     const [isActiveTab, setIsActiveTab] = useState('')
//   return (
//     <li className="locations__item">
//       <NavLink to={`/${city}`} className="locations__item-link tabs__item">
//         <span>{city}</span>
//       </NavLink>
//     </li>
//   );
// }
