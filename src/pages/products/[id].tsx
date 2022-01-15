import { GetStaticPaths, GetStaticProps } from "next"
import Stripe from "stripe"

export default function Id({ product }){
  console.log(product)

  return (
    <></>
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