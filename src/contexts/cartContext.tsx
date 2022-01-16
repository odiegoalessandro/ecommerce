import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react"
import Stripe from "stripe"
import Cookie from "js-cookie"
import Cookies from "js-cookie"

interface Item extends Stripe.Price {
  product: Stripe.Product
  quantity: number
}


interface ActionData {
  type: "ADD" | "REMOVE" | "CLEAR"
  item?: Item
  id?: string
}
interface CartContextData {
  addItem: (item: Item) => void
  removeItem: (id: string) => void
  clearCart: () => void
  cart: CartData
}

interface CartData {
  items: Item[]
  totalPrice: number
  totalItems: number
}

interface CardContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CardContextProviderProps){  
  const initialValue: CartData | any = { items: [], totalItems: 0, totalPrice: 0 }
  const [localStorage, setLocalStorage] = useState({})

  function cartReducer(state: CartData, action: ActionData){
    switch(action.type){
      case "ADD":
        Cookie.set("cart", JSON.stringify({
          items: [...state.items, action.item],
          totalPrice: state.totalPrice + action.item.unit_amount,
          totalItems: state.totalItems + action.item.quantity
        }))

        return {
          items: [...state.items, action.item],
          totalPrice: state.totalPrice + action.item.unit_amount,
          totalItems: state.totalItems + action.item.quantity
        }
      case "REMOVE":
        const selectedItem = state.items.filter(({ id }) => id === action.id)    
        
        Cookie.set("cart", JSON.stringify({
          items: state.items.filter(({ id }) => id !== action.id),
          totalPrice: state.totalPrice - selectedItem.reduce((a, b) => a + b.unit_amount, 0),
          totalItems: state.totalItems - selectedItem.reduce((a ,b) => a + b.quantity, 0)
        }))

        return {
          items: state.items.filter(({ id }) => id !== action.id),
          totalPrice: state.totalPrice - selectedItem.reduce((a, b) => a + b.unit_amount, 0),
          totalItems: state.totalItems - selectedItem.reduce((a ,b) => a + b.quantity, 0)
        }
      case "CLEAR":
        Cookie.set("cart", JSON.stringify(initialValue))

        return initialValue
    }
  }

  const [cart, dispatch] = useReducer(cartReducer, initialValue)
  
  const addItem = (item: Item) => dispatch({ type: "ADD", item })
  const removeItem = (id: string) => dispatch({ type: "REMOVE", id })
  const clearCart = () => dispatch({ type: "CLEAR" })
  const addItems = (items: Item[]) => {
    items.map(item => {
      dispatch({ type: "ADD", item })
    })
  }

  useEffect(() => {
    const setInitialValue = async () => {
      const { cart } = Cookies.get()
  
      if(cart){
        const result = await JSON.parse(cart)
        addItems(result.items)
      }
    }

    setInitialValue()
  }, [])

  return ( 
    <CartContext.Provider value={{ addItem, removeItem, clearCart, cart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  return useContext(CartContext)

}