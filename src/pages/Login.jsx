import { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const Login = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const apiPath = import.meta.env.VITE_API_PATH;

  
  
  const [isAuth, setIsAuth] = useState(false);
  const [account, setAccount] = useState({
    username: 'example@test.com',
    password: 'example',
  });

  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState([]);

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

    axios.post(`${baseURL}/v2/admin/signin`, account)  
    .then((res) => {
      const { token, expired } = res.data;
      // console.log(token, expired);
      document.cookie = `hexToken=${token}; userLanguage=en; userPreference=darkMode; expires=${new Date(expired)}`; // 設定 cookie
      axios.defaults.headers.common['Authorization'] = token;

      axios.get(`${baseURL}/v2/api/${apiPath}/admin/products`)
      .then((res) => {
        // console.log(products, res.data.products);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });

      setIsAuth(true); // 設定登入狀態
    })
    .catch((err) => {
      console.log(err);
      alert('登入失敗');
    });
  };

  // const getProducts = () => {
  //   console.log(import.meta.env.VITE_API_PATH);
  //   axios.get(`${import.meta.env.VITE_BASE_URL}/v2/api/${import.meta.env.VITE_API_PATH}/admin/products`)
  //   .then((res) => {
  //     console.log(products, res.data.products);
  //     setProducts(res.data.products);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // };

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
      <div className="container py-5">
        <div className="row">
          <div className="col-6">
            <h2>產品列表</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">查看細節</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>{product.is_enabled}</td>
                    <td>
                      <button
                        onClick={() => setTempProduct(product)}
                        className="btn btn-primary"
                        type="button"
                      >
                        查看細節
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <h2>單一產品細節</h2>
            {tempProduct.title ? (
              <div className="card">
                <img
                  src={tempProduct.imageUrl}
                  className="card-img-top img-fluid"
                  alt={tempProduct.title}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {tempProduct.title}
                    <span className="badge text-bg-primary">
                      {tempProduct.category}
                    </span>
                  </h5>
                  <p className="card-text">商品描述：{tempProduct.description}</p>
                  <p className="card-text">商品內容：{tempProduct.content}</p>
                  <p className="card-text">
                    <del>{tempProduct.origin_price} 元</del> / {tempProduct.price}{" "}
                    元
                  </p>
                  <h5 className="card-title">更多圖片：</h5>
                  {tempProduct.imagesUrl?.map((image) => (image && (<img key={image} src={image} className="img-fluid" />)))}
                </div>
              </div>
            ) : (
              <p>請選擇一個商品查看</p>
            )}
          </div>
        </div>
      </div> 
      :
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