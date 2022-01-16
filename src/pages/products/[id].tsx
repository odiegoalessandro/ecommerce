import { Box, Button, Flex, Heading, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper  } from "@chakra-ui/react"
import { GetStaticPaths, GetStaticProps } from "next"
import Stripe from "stripe"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { useCart } from "../../contexts/cartContext"

interface Product extends Stripe.Price {
  quantity: number
  product: Stripe.Product
}

interface IdProps {
  product: Product
}

export default function Id({ product }: IdProps){
  const [quantity, setQuantity] = useState(1)
  const { addItem, cart, removeItem } = useCart()

  console.log(cart)
  return (
    <Flex pt={10} minH="calc(100vh - 60px)">
      <Flex
        p={5}
        w="100%"
        bgColor="white"
        minH="calc(100vh - 100px)"
        borderRadius="md"
        border="1px solid #dddddd"
      >
        <Image w="600px" h="600px" src={product.product.images[0]} />
        <Box 
          border="1px solid #eaeaea"
          h="30rem"
          w="20rem"
          px={5}
          py={6}
          display="flex"
          flexDir="column"
          justifyContent="space-around"
        >
          <div>
            <Heading
              size="md"
              textTransform="capitalize"
            >
              {product.product.name}
            </Heading>
            <Heading fontWeight="thin" mt={2}>
              R$ {(product.unit_amount * quantity / 100).toFixed(2)}
            </Heading>
          </div>
          <div>
            <NumberInput 
              value={quantity}
              min={1}
              max={255}
              allowMouseWheel
              isReadOnly
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper 
                  onClick={() => setQuantity(prev => prev < 255 ? prev + 1 : prev)}
                  children={<FontAwesomeIcon icon={faAngleUp} />}
                  border="none"
                />
                <NumberDecrementStepper 
                  onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : prev)}
                  children={<FontAwesomeIcon icon={faAngleDown} />}
                  border="none"
                />
              </NumberInputStepper>
            </NumberInput>
            <Button 
              bgColor="#252525"
              mt={5}
              w="full"
              h="3rem"
              color="#eaeaea"
              _hover={{
                bgColor: "#444444"
              }}
              onClick={() => addItem({
                ...product,
                quantity,
                unit_amount: product.unit_amount * quantity
              })}
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </Box>
      </Flex>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: "2020-08-27"})
  const product = await stripe.prices.retrieve(params.id.toString(), {
    expand: ["product"]
  })

  return {
    props: {
      product
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: "2020-08-27"})
  const prices = await stripe.prices.list({
    active: true
  })
  const paths = prices.data.map(price => {
    return `/products/${price.id}`
  })  

  return {
    paths,
    fallback: false
  }
}