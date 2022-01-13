import NextLink from "next/link"
import { Box, Flex, Heading, HStack, Link } from "@chakra-ui/react"
import { NextRouter } from "next/router"
import {  ReactNode } from "react"

interface NavbarProps {
  path: NextRouter
}

interface LinkItemProps {
  href: string
  path: NextRouter
  children: ReactNode
  props?: any
}

const LinkItem = ({ href, path, children, ...props }: LinkItemProps) => {
  // const isActive = path.asPath === href
  const activeColor = ""
  const inativeColor = ""

  return(
    <NextLink href={href} passHref>
      <Link {...props}>
        {children}
      </Link>
    </NextLink>
  )
}

export default function Navbar({ path }: NavbarProps){
  return (
    <Flex align="center" px={10} h="60px" bgColor="#252525" pos="fixed" inset={0} zIndex={10}>
      <NextLink href="/">
        <Heading marginBottom="7px" cursor="pointer" size="lg" lineHeight={6} color="white">
          e-commerce
        </Heading>
      </NextLink>
      <HStack pl={5} flex="1" color="#ffffff70">
        <LinkItem href="/release" path={path}>
          Lançamentos
        </LinkItem>
        <LinkItem href="/products" path={path}>
          Produtos
        </LinkItem>
      </HStack>
    </Flex>
  )
}