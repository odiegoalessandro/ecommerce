import Head from "next/head"
import { Box, Container } from "@chakra-ui/react"
import { ReactNode } from "react"

interface MainProps {
  children: ReactNode
}

function Main({ children }: MainProps){
  return (
    <Box as="main">
      <Head>
        <meta name="description" content="Ecommerce " />
        <meta name="author" content="Diego Alessandro da Cruz Martins " />
        <meta property="og:site_name" content="Ecommerce" />
        <meta property="og:type" content="website" />
        <title>Ecommerce</title>
      </Head>
      <Container maxW="container.md">
        {children}
      </Container>
    </Box>
  )
}

export default Main
