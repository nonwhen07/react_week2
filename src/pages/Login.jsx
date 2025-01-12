import { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const Login = () => {
  //const API_URL = 'https://ec-course-api.hexschool.io/';
  //const API_URL = import.meta.env.VITE_API_URL;

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');



  const [isAuth, setIsAuth] = useState(false);
  const [account, setAccount] = useState({
    username: 'example@test.com',
    password: 'example',
  });

  //const [products, setProducts] = useState([]);

  //const navigate = useNavigate();

  const handleInputChange = (e) => {
    // console.log(e.target.id, e.target.value, e.target.name);

    const { name, value } = e.target;

    setAccount({
      ...account,
      [name]: value
    });

    // console.log(account);
  };

  const handleLogin = (e) =>{
    e.preventDefault();
    // console.log(account);
    // console.log(import.meta.env.VITE_BASE_URL);
    // console.log(import.meta.env.VITE_API_PATH);
    axios.post(`${import.meta.env.VITE_BASE_URL}/v2/admin/signin`, account)  
    .then((res) => {
      const { token, expired } = res.data;
      // console.log(token, expired);
      document.cookie = `hexToken=${token}; userLanguage=en; userPreference=darkMode; expires=${new Date(expired)}`; // 設定 cookie
      setIsAuth(true); // 設定登入狀態
    })
    .catch((err) => {
      console.log(err);
      alert('登入失敗');
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

    
  //   try{
  //     console.log('API_URL:', API_URL);

  //     const response = await fetch(`${API_URL}/v2/admin/signin`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     const data = await response.json();
  //     if(data.token){
        
  //       localStorage.setItem('token', data.token);
  //       document.cookie = `auth_token=${data.token}; path=/`;
  //       navigate('/dashboard');
  //     }else{
  //       alert('登入失敗');
  //     }
  //   }
  //   catch(error){
  //     console.error('登入失敗', error);
  //   }
  // }

  return(
<>
  { isAuth ? 
      <p>已登入</p> :
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">請先登入</h1>
        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          <div className="form-floating mb-3">
            <input name="username" type="email" value={account.username} onChange={handleInputChange} className="form-control" id="username" placeholder="name@example.com" />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input name="password" type="password" value={account.password} onChange={handleInputChange} className="form-control" id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
          </div>
          <button type='sumbit' onClick={handleLogin} className="btn btn-primary">登入</button>
        </form>
        <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
    }
</>);
}

export default Login;