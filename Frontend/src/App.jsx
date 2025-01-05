import axios from "axios"
import { useState } from "react"

function App() {
  const [long_url, setLink] = useState();
  const [user_id, setUserID] = useState();
  const [ShortUrl, setShortUrl] = useState();

  const HandleSubmit = (e) =>{
    const Data = {
      long_url,
      user_id
    }
    axios.post("http://localhost:8080/createshorturl", Data)
    .then((response)=>{
      setShortUrl(response.data.short_url)

    })
    .catch((error)=>console.log(error))
  }

  return (
    <>
    <div className="h-screen w-full bg-black flex flex-col items-center">
      <h1 className="text-white text-2xl font-semibold mt-8">WELCOME TO CRAXXY URL SHORTENER</h1>
      <h3 className="text-gray-300 font-semibold">To get started enter the url and your name</h3>
     <div className="h-[50%] flex justify-center items-center gap-4">
        <input placeholder={"URL"}className="h-10 w-80 px-4"
        onChange={(e)=>setLink(e.target.value)}
        ></input>
        <input placeholder={"NAME"}className="h-10 w-80 px-4"
        onChange={(e)=>setUserID(e.target.value)}
        ></input>
        <button className="bg-white h-10 w-20 "
        onClick={HandleSubmit}
        >Submit</button>
     </div>
     {
      ShortUrl && <div className="text-white h-20 w-[50%] text-xl">Good News your short url has been created. It is: 
       <p><a href={ShortUrl}>{ShortUrl}</a> </p></div>
     }
     </div>
    </>
  )
}

export default App
