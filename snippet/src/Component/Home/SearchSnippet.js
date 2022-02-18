import { useState, useContext } from "react";
import { SearchContext } from "../context/searchContext";
import SuggestionBox from "./SuggestionBox";

import {
  isTagsIncludesSearchValue,
  isTitleIncludesSearchValue,
  filterData
} from "../../utils/methods";
import data from "../../data.json";

function SearchSnippet() {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionBox, setSuggestionBox] = useState(false);
  const { handleChange, search } = useContext(SearchContext);

  const suggestionResult = (codes, currentvalue) => {
    return filterData(codes,isTagsIncludesSearchValue,isTitleIncludesSearchValue,currentvalue);
  };

  const handleInput = ({target}) => {
    handleChange(target.value);
    setSuggestionBox(true);
    const suggestionArray = suggestionResult(data, target.value);
    console.log(suggestionArray);
    setSuggestions(suggestionArray);
  };

  return (
    <div className="position-relative flex search-snippet">
      <input
        onChange={(event) => handleInput(event)}
        type="text"
        placeholder="Search a for JavaScript Code Snippet"
        value={search}
        className="input-search"
      />
      {suggestionBox ? (
          <SuggestionBox  
            setSuggestionBox={setSuggestionBox} 
            suggestions={suggestions} 
            setSuggestions={setSuggestions}
          />
      ) : null}
    </div>
  );
}
export default SearchSnippet;
