import Commerce from '@chec/commerce.js'

const public_key = import.meta.env.VITE_PUBLIC_KEY

export const commerce = new Commerce(public_key, true)