import Head from "next/head"
import { Box, Container } from "@chakra-ui/react"
import { ReactNode } from "react"
import Navbar from "./navbar"
import { NextRouter } from "next/router"

interface MainProps {
  children: ReactNode
  router: NextRouter
}

function Main({ children, router }: MainProps){
  return (
    <Box as="main">
      <Head>
        <meta name="description" content="Ecommerce " />
        <meta name="author" content="Diego Alessandro da Cruz Martins " />
        <meta property="og:site_name" content="Ecommerce" />
        <meta property="og:type" content="website" />
        <title>Ecommerce</title>
      </Head>
      <Navbar path={router} />
      <Container maxW="container.lg" mt="60px">
        {children}
      </Container>
    </Box>
  )
}

export default Main
