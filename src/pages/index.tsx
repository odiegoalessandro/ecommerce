import { Box, Divider, Flex, Heading, Text, LinkBox, LinkOverlay } from "@chakra-ui/react"
import { GetStaticProps } from "next"
import NextImage from "next/image"
import Stripe from "stripe"

interface Price extends Stripe.Price{
  product: Stripe.Product
}

interface HomeProps {
  prices: Price[]
}

export default function Home({ prices }: HomeProps) {


  return (
    <Flex minH="calc(100vh - 60px)" pt={10} flexWrap="wrap" justify="center">
      {
        prices.map(price => (
          <LinkBox
            flexShrink={0}
            mx={1}
            mt={3}
            h="500px"
            w="300px"
            flexDir="column"
            borderRadius="md"
            bgColor="#ffffff"
            border="1px solid #eaeaea"
            transition=".2s"
            overflow="hidden"
            _hover={{
              boxShadow: "0px 10px 10px 0px #b0b0b0"
            }}
            as="div"
            key={price.id}
          >
            <NextImage
              width={300}
              height={280}
              objectFit="cover"
              src={price.product.images[0]}
            />
            <Divider />
            <Box
              m={2}
              px={4}
              flex={1}
              display="flex"
              flexDir="column"
              justifyContent="space-between"
            >
              <Heading as="h2" fontSize="26px" fontWeight="normal">
                <LinkOverlay href={`products/${price.id}`}>
                  R$ {(price.unit_amount / 100).toFixed(2)}
                </LinkOverlay>
              </Heading>
              <div>
                <Text fontSize="sm" color="#00A650">
                  Frete gratis
                </Text>
                <Text fontSize="sm" textTransform="capitalize">
                  {price.product.description}
                </Text>
              </div>
            </Box>
          </LinkBox>
        ))
      }
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: "2020-08-27"})
  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ["data.product"]
  })

  return {
    props: {
      prices: prices.data
    }
  }
}