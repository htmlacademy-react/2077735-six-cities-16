import { ChangeEvent, FormEvent, useState } from 'react';
import { LoginData } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, selectRequestStatus } from '../../store/slices/auth';
import toast from 'react-hot-toast';
import { RequestStatus } from '../../const';

export default function LoginForm() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const isLoading =
    useAppSelector(selectRequestStatus) === RequestStatus.Loading;

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(login(loginData));
    toast.promise(dispatch(login(loginData)).unwrap(), {
      error: 'Login Failed.',
      loading: 'Logging...',
      success: 'Logged in!',
    });
  };

  return (
    <form className="login__form form" onSubmit={handleSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={loginData.email}
          onChange={handleChange}
          pattern="^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$"
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={loginData.password}
          onChange={handleChange}
          pattern="^(?=.*[a-zA-Z])(?=.*\d).+$"
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={isLoading}
      >
        Sign in
      </button>
    </form>
  );
}
