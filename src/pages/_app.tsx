import { AppProps } from "next/app"
import { AnimatePresence } from "framer-motion"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../lib/chakra-theme"
import GlobalStyles from "../styles/GlobalStyles"
import Main from "../components/main"
import Fonts from "../components/fonts"
import { CartContextProvider } from "../contexts/cartContext"


function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <AnimatePresence exitBeforeEnter initial={true}>
        <Main router={router}>
          <CartContextProvider>
            <GlobalStyles />
            <Component {...pageProps} key={router.route} />

          </CartContextProvider>
        </Main>
      </AnimatePresence>
    </ChakraProvider>
  )
}

export default MyApp
