import Header from "../Header/Header";
import Main from "../Main/Main"
import "../../index.css"
function App() {
  const userData = {
    username: "Bernardo",
  };



  return (
    <>
      <Header userData={userData} />
      <Main/>
      
    </>
  );
}

export default App;
