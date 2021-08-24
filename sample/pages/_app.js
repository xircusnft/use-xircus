import { ChakraProvider } from '@chakra-ui/react'
import { UseWalletProvider, ConnectionRejectedError, useWallet } from 'use-wallet'
import useGlobal from '../hooks/useGlobal'

export default function MyApp({ Component, pageProps }) {
  const [state, actions] = useGlobal(['network'])

  return (
    <UseWalletProvider {...actions.getWalletConfig()}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UseWalletProvider>
  )
}
