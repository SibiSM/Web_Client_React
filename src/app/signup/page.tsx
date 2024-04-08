import Header from "../components/Header";
import Signup from "../components/Signup";
import Footer from "../components/Footer";

export default function Page() {
    return ( 
    
      <div className="border border-gray-300 p-4 max-w-3xl mx-auto my-8" >
      <h1 className="text-3xl font-bold">Sign up</h1> 
      
      <Signup /> 

      
      
      </div> 

    
    )
  }