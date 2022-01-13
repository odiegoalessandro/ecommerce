import { Box, Flex, Heading, Text, Divider } from "@chakra-ui/react"
import { GetStaticProps } from "next"
import Image from "next/image"
import stripe from "../lib/stripe"

export default function Home({ products, price }) {
  console.log(products)
  console.log(price)

  return (
    <Flex>
      <Flex
        mt="50px"
        borderRadius={5}
        border="1px solid #252525"
        p="5px"
        width="270px"
        flexDir="column"
        justify="center"
      >
        <Image width="250px" height="150px" src={products.data[0].images[0]} />
        <Divider />
        <Heading size="md">
          {`R$${(price.data[0].unit_amount/ 100).toFixed(2)}`}
        </Heading>
        <Text fontSize="sm">
          {products.data[0].description}
        </Text>
      </Flex>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await stripe.products.list()
  const price = await stripe.prices.list()

  return {
    props: {
      products,
      price
    }
  }
}