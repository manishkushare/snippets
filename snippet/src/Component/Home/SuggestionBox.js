import { useContext } from "react";
import { SearchContext } from "../context/searchContext";

function SuggestionBox(props) {
  const { setSuggestionBox, suggestions, setSuggestions } = props;
  const {search,handleChange} = useContext(SearchContext);

  return (
    <ul
      onMouseLeave={() => setSuggestionBox(false)}
      className="position-absolute suggestion-box"
    >
      {suggestions &&
        suggestions.length >= 1 &&
        suggestions.map((suggestion) => {
          return (
            <li
              key={suggestion.id}
              onClick={() => {
                handleChange(suggestion.title);
                setSuggestionBox(false);
              }}
            >
              {suggestion.title}
            </li>
          );
        })}
    </ul>
  );
}
export default SuggestionBox;
