const Login  =() =>{
  return(
    <div>
      <h1>登入</h1>
      <form action="">
        <label htmlFor="">
          帳號：
          <input type="text" name="username" />
        </label>
        <br />
        <label htmlFor="">
          密碼：
          <input type="text" name="password" />
        </label>
        <br />
        <button type="submit">登入</button>
      </form>
    </div>
  );
}

export default Login;