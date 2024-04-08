import Header from "../components/Header";
import Login from "../components/Login";
import Footer from "../components/Footer";

export default function Page() {
    return ( 
    
      <div className="border border-gray-300 p-4 max-w-3xl mx-auto my-8" >
      <h1 className="text-3xl font-bold">Log in to your account</h1> 
      
      <Login /> 

      
      
      </div> 

    
    )
  }