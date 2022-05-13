// Criando a integração do Stripe com o frontend

import { loadStripe } from '@stripe/stripe-js'

export const getStripeJs = async () => {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

  return stripeJs
} 