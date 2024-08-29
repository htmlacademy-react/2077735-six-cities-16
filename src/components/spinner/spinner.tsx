import './spinner.css';

export default function Spinner() {
  return (
    <div className="preloader" data-testid="spinner">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
}
