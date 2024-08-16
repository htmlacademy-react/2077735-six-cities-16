import { Link } from 'react-router-dom';
import './not-found-page.css';
import Layout from '../../components/layout/layout';
import { APP_ROUTE } from '../../const';

export default function NotFound() {
  return (
    <Layout pageClassName="page">
      <section className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Page Not Found</p>
        <Link className="not-found__button" to={APP_ROUTE.ROOT}>
          Go to Main page
        </Link>
      </section>
    </Layout>
  );
}
