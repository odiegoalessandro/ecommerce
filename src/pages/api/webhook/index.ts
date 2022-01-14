import Stripe from "stripe"
import { buffer } from "micro"
import { NextApiRequest, NextApiResponse } from "next"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-08-27" })

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method === 'POST') {
    let event

    try {
      const rawBody = await buffer(req)
      const signature = req.headers['stripe-signature']

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    console.log('✅ Success:', event.id)

    if (event.type === 'checkout.session.completed') {
      console.log(`💰  Payment received!`)
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}