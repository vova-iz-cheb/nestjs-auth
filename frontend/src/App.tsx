import { useState } from 'react';
import './App.css';

const headers = {
  'Content-Type': 'application/json',
};

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>Vite + React + SWC</h1>
      <div className='card'>
        <button
          onClick={() => {
            fetch('http://localhost:3000/', {
              headers,
            })
              .then((x) => x.json())
              .then((x) => {
                console.log('request', x);
                return x;
              })
              .catch((e) => console.error('e', e));
          }}
        >
          request to backend public
        </button>
        <button
          onClick={() => {
            fetch('http://localhost:3000/auth/protected_resource', {
              headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
              },
            })
              .then((x) => x.json())
              .then((x) => {
                console.log('request', x);
                return x;
              })
              .catch((e) => console.error('e', e));
          }}
        >
          request to backend PROTECTED
        </button>

        <h2>Регистрация</h2>
        <label htmlFor='login'>Логин</label>
        <input id='login' type='text' />

        <label htmlFor='email'>Почта</label>
        <input id='email' type='email' />

        <label htmlFor='password'>Пароль</label>
        <input id='password' type='password' />

        <label htmlFor='password2'>Повторите пароль</label>
        <input id='password2' type='password' />

        <button
          onClick={() => {
            fetch('http://localhost:3000/auth/register', {
              body: JSON.stringify({
                login: (document.getElementById('login') as HTMLInputElement)
                  .value,
                email: (document.getElementById('email') as HTMLInputElement)
                  .value,
                password: (
                  document.getElementById('password') as HTMLInputElement
                ).value,
              }),
              method: 'POST',
              headers,
            })
              .then((x) => x.text())
              .then((x) => {
                console.log('Registration response', x);
                return x;
              })
              .catch((e) => console.error('Registration error', e));
          }}
        >
          Зарегистрироваться
        </button>

        <h2>Вход</h2>
        <label htmlFor='login2'>Логин</label>
        <input id='login2' type='text' />
        <label htmlFor='password3'>Пароль</label>
        <input id='password3' type='password' />
        <button
          onClick={() => {
            fetch('http://localhost:3000/auth/login', {
              body: JSON.stringify({
                login: (document.getElementById('login2') as HTMLInputElement)
                  .value,
                password: (
                  document.getElementById('password3') as HTMLInputElement
                ).value,
              }),
              method: 'POST',
              headers,
            })
              .then((x) => x.json())
              .then((x) => {
                console.log('Login response', x);

                setToken(x.accessToken);
                return x;
              })
              .catch((e) => console.error('Login error', e));
          }}
        >
          Войти
        </button>
      </div>
    </>
  );
}

export default App;
