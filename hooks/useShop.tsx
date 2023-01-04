import { createContext, useContext, useMemo, useReducer } from "react";

const initialState = {};
const shopContext = createContext(initialState);

function reducer(state: any, action: any) {
  switch (action.type) {
    case "GET_SHOP": {
      return {
        ...state,
      };
    }

    case "UPDATE_SHOP": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return null;
  }
}

export const ShopProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // METHODS
  const getShop = () => {
    dispatch({ type: "GET_SHOP" });
  };

  const updateShop = (payload: any) => {
    dispatch({ type: "UPDATE_SHOP", payload });
  };

  const value = useMemo(
    () => ({
      state,
      getShop,
      updateShop,
    }),
    [state]
  );

  return <shopContext.Provider value={value} {...props} />;
};

export const useShop = () => {
  const context = useContext(shopContext);

  if (context === undefined) {
    throw new Error(`useShop must be used within ShopProvider`);
  }

  return context;
};

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

export const ShopContextProvider = ({ children }: Props) => (
  <ShopProvider>{children}</ShopProvider>
);
