import CodeMirrorWrapper from "./CodeMirrorWrapper";
import SearchSnippet from "./SearchSnippet";
import { SearchContext } from "../context/searchContext";
import {useState} from "react"


function Home(){
  const [search, setSearch] = useState("");

  const handleChange = (value) => {
    setSearch(value);
  };


  return (
    <div className="hero">
      <div className="container">
      <SearchContext.Provider value={{ search, handleChange }}>
        <SearchSnippet/>
        <CodeMirrorWrapper />
      </SearchContext.Provider>
      </div>
    </div>
  )
}
export default Home;