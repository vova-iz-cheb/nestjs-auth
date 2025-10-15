import './App.css';

function App() {
  return (
    <>
      <h1>Vite + React + SWC</h1>
      <div className='card'>
        <button
          onClick={() => {
            fetch('http://localhost:3000/')
              .then((x) => x.text())
              .then((x) => {
                console.log('request', x);
                return x;
              })
              .catch((e) => console.error('e', e));
          }}
        >
          request from backend
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
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((x) => x.json())
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
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((x) => x.json())
              .then((x) => {
                console.log('Login response', x);
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
