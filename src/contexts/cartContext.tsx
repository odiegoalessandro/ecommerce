import { createContext, ReactNode, useContext, useState } from "react"
import Stripe from "stripe"

interface Item extends Stripe.Price {
  product: Stripe.Product
  quantity: number
}

interface StateData {
  items: Item[]
  totalPrice: number
  totalItems: number
}

interface CartContextData {
  addItem: (item: Item) => void
  clearCart: () => void
  cart: StateData 
}

interface CardContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CardContextProviderProps){
  const [cart, setCart] = useState<StateData>({
    items: [],
    totalItems: 0,
    totalPrice: 0
  })

  function addItem(item: Item){
    setCart(prev => {
      return {
        items: [...prev.items, item],
        totalItems: prev.totalItems + 1,
        totalPrice: prev.totalPrice + item.unit_amount
      }
    })
  }

  function clearCart(){
    setCart({
      items: [],
      totalItems: 0,
      totalPrice: 0
    })
  }

  return ( 
    <CartContext.Provider value={{ addItem, clearCart, cart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  return useContext(CartContext)
}