import React, {createContext, useContext, useState} from "react";

const StateContext = createContext({} as {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
})


export const StateProvider: React.FC = ({children}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <StateContext.Provider value={{toggle, setToggle}}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)