import React, { createContext, useState } from "react";

export let GlobalState = createContext();

// export const Store = ({ Children }) => {
//   const [locationValue, setLocationValue] = useState("abc");

//   return (
//     <GlobalState.Provider value={{ locationValue, setLocationValue }}>
//       {Children}
//     </GlobalState.Provider>
//   );
// };

// export default Store;
