import LoginForm from '../../components/login-form/login-form';
import Layout from '../../components/layout/layout';
import RandomCity from '../../components/random-city/random-city';

export default function Login() {
  return (
    <Layout pageClassName="page page--gray page--login" isLoginPage>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <RandomCity />
        </div>
      </main>
    </Layout>
  );
}
