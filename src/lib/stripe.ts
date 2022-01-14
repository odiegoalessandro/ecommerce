import { loadStripe } from "@stripe/stripe-js"

let stripePromise = null

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51KHFELHzWbFCl3lj0vaQqYbfnH1yd7b9w0vu4QtMlguiXCzLcrNg52sjnaUPVWw0Hr6ssczab7SoX0J1F63Kz9wo00XBiCiTG4")
  }
  return stripePromise
}

export default getStripe