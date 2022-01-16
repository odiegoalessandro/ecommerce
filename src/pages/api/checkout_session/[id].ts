import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" })

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const id = req.query.id.toString()

  try{
    if(!id.startsWith("cs_")){
      throw Error("Incorrect CheckoutSessionID.")
    } 
    
    const checkout_session = await stripe.checkout.sessions.retrieve(id)
    
    res.status(200).json(checkout_session)
  } catch(error){
    res.status(500).json({ statusCode: 500, message: error.message })
  }
}