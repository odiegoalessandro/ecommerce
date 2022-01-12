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
        <meta name="description" content="Coloque uma descrição" />
        <meta name="author" content="Coloque seu nome" />
        <meta property="og:site_name" content="Coloque o nome do site" />
        <meta property="og:type" content="Coloque o tipo do site" />
        <title>Example</title>
      </Head>
      <Container maxW="container.md">
        {children}
      </Container>
    </Box>
  )
}

export default Main
