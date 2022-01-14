import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" })

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const base_url = req.headers.origin || "http://localhost:3000"
  
  if(req.method === "POST"){
    try{
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [req?.body?.items] ?? [],
        success_url: base_url,
        cancel_url: `${base_url}/cart`
      })

      res.status(200).json(session)
    } catch(error){
      res.status(500).json({ statusCode: 500, error: error.message })
    }
  }
  else{
    res.setHeader("Allow", "POST")
    res.status(405).end("Method not allowed")
  }
}