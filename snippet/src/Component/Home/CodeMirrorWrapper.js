import { useReducer, useEffect, useContext } from "react";

import { SearchContext } from "../context/searchContext";
import { UserContext } from "../context/userContext";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import {
  isTagsIncludesSearchValue,
  isTitleIncludesSearchValue,
  filterData,
} from "../../utils/methods";

import data from "../../data.json";
import { SNIPPET_URL } from "../../utils/api";

const initialState = [];

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "LOAD_DATA":
      if (payload) {
        return filterData(
          data,
          isTagsIncludesSearchValue,
          isTitleIncludesSearchValue,
          payload
        );
      } else {
        return data.reduce((acc, cv, currentIndex) => {
          if (currentIndex < 10) {
            acc.push(cv);
          }
          return acc;
        }, []);
      }
    default:
      return initialState;
  }
};

const handleBookamrk = async (snippetId, token) => {
  return 
  // console.log(snippetId,token);
  // try {
  //   let snippets = await fetch(SNIPPET_URL + `${snippetId}/bookmark`, {
  //     method: "POST",
  //     headers: new Headers({
  //       Authorization: `Token ${token}`,
  //     }),
  //   });
  //   if (snippets.ok) {
  //     snippets = await snippets.json();
  //     console.log(snippets);
  //   } else {
  //     snippets = await snippets.json();
  //     snippets = await Promise.reject(snippets);
  //     return snippets;
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
};

export default function CodeMirrorWrapper() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { search } = useContext(SearchContext);
  const userInfo = useContext(UserContext);

  useEffect(() => {
    dispatch({ type: "LOAD_DATA", payload: search });
  }, [search]);

  if (state && state.length < 1) {
    return <h2>No Data Found</h2>;
  }

  return (
    <div>
      {state &&
        state.length >= 1 &&
        state.map((snippet) => {
          
          return (
            <div key={snippet.id} className="snippet">
              <ul className="snippet-info">
                <li className="snippet-title">Title : {snippet.title}</li>
                {
                  userInfo.state.isLoggedIn ? 
                  <li 
                    className="snippet-bookmark"
                    onClick={() =>
                      handleBookamrk(snippet.id, userInfo.state.user.token)
                    }
                    style={{cursor:"pointer"}}
                  >
                    Add to Bookmark
                  </li>:null
                }
              </ul>
              <CodeMirror
                value={snippet.body}
                min-height="100px"
                extensions={[javascript({ jsx: true })]}
                className=""
              />
              <ul className="tags">
                Tags:
                {snippet.tags.map((tag, index) => {
                  return <li className="tag" key={index}>{tag}</li>;
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
}
