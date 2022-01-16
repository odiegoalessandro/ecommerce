import { Button, Flex, Heading, IconButton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useCart } from "../contexts/cartContext"
import getStripe from "../lib/stripe"

export default function Cart(){
  const { cart, removeItem, clearCart } = useCart()

  async function handleClick(){
    const stripe = await getStripe()
    const lineItems = cart.items.map(item => { 
      return { price: item.id, quantity: item.quantity }
    })
    try {
      const { data: { id } } = await axios.post("/api/checkout_session", {
        items: lineItems
      })
      
      clearCart()

      await stripe.redirectToCheckout({ sessionId: id })
    } catch (err){
      console.error(err)
    }
    
  }
  return (
    <Flex pt={10} w="full">
      <Table textTransform="capitalize">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Quantidade</Th>
            <Th>Preço(R$)</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            cart.items.map((item, index) => (
              <Tr key={index}>
                <Td>{item.product.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>{(item.unit_amount / 100).toFixed(2)}</Td>
                <Td>
                  <IconButton
                    icon={<FontAwesomeIcon icon={faTrashAlt} />}
                    aria-label="excluir item"
                    variant="outline"
                    colorScheme="red"
                    onClick={() => removeItem(item.id)}
                    _hover={{
                      bgColor: "red",
                      color: "white"
                    }}
                  />
                </Td>
              </Tr>
            ))
          }          
        </Tbody>
      </Table>
      <Flex
        pos="fixed"
        bgColor="#252525"
        w="full"
        h="55px"
        color="white"
        bottom="0"
        left="0" 
        right="0"
        px={10}
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading
          as="h2"
          textTransform="uppercase"
          size="sm"
        >
          total: R$ {(cart.totalPrice / 100).toFixed(2)}
        </Heading>
        <Button
          leftIcon={<FontAwesomeIcon icon={faCheck} />}
          colorScheme="green"
          onClick={handleClick}
        >
          Finalizar compra
        </Button>
      </Flex>
    </Flex>
  )
}