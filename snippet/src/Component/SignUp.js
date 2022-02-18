function SignUp() {
    return (
      <section className="form-wrapper">
        <form action="">
          <label htmlFor="">Email</label>
          <input 
              type="email" 
              placeholder="Please enter a email" 
              name="email"
          />
          <label htmlFor="">Password</label>
          <input 
              type="password"
              name="password"
              placeholder="Please enter a Password"
          />
        </form>
      </section>
    );
  }
  export default SignUp;
  