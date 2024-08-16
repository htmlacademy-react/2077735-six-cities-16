import { Link } from 'react-router-dom';
import LoginForm from '../../components/login-form/login-form';
import Layout from '../../components/layout/layout';

export default function Login() {
  return (
    <Layout pageClassName="page page--gray page--login" isLoginPage>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={''}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
