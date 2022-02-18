import Header from "./Header";
function Error() {
    return (
      <>
        <Header/>
        <section className="no_match">
          <div className="container">
            <h2>Sorry!</h2>
            <p>Something went wrong, Please relaod the Page!</p>
          </div>
        </section>
      </>
    );
  }
  export default Error;