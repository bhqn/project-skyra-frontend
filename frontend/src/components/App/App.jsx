import Header from "../Header/Header";
import "../../index.css"
function App() {
  const userData = {
    username: "Bernardo",
  };



  return (
    <>
      <Header userData={userData} />
      
    </>
  );
}

export default App;
