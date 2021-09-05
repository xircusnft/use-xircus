import { useState, useEffect, Fragment } from 'react'
import {
  Box, Heading, Button, HStack, VStack, Container, Textarea, Input,
  Menu, MenuButton, MenuList, MenuItem, Select, Text,
  useColorMode
} from '@chakra-ui/react'
import useGlobal from '../hooks/useGlobal'
import { useWallet } from 'use-wallet'
import { contracts } from 'use-xircus'

export default function Home() {
  const wallet = useWallet()
  const { colorMode, toggleColorMode } = useColorMode()
  const [networks, setNetworks] = useState([])
  const [state, actions] = useGlobal(['user', 'isSigned', 'current'])
  const [market, setMarket] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    if (state.current) {
      loadContracts()
    }
  }, [state.current])

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (wallet.status == 'connected') {
      console.log("account", wallet.account)
      login()
    }
  }, [wallet.status])

  const login = async() => {
    await actions.login(wallet)
  }

  const loadData = async() => {
    setNetworks(await actions.getNetworks())
  }

  const loadContracts = async() => {
    const center = await actions.getMarketCenter(wallet, state.current.center)
    const router = await actions.getExchangeRouter(wallet, state.current.routers[0])
    const pair = await actions.getExchangePair(wallet, state.current.pairs[0])
    const collection = await actions.getCollection(wallet, state.current.collections[0])
    const quote = await actions.getExchangeQuote(
      wallet,
      state.current.routers[0],
      '1',
      state.current.tokens[0],
      state.current.usds[0]
    )
    console.log("CENTER", { center, router, pair, quote, collection })
  }

  const handleFileChange = async({ target: { files } }) => {
    const cid = await actions.uploadIPFS(files[0])
    console.log("CID", cid)
  }

  const handleUploadMeta = async() => {
    const cid = await actions.uploadIPFS(JSON.stringify(state.user))
    console.log("CID", cid)
  }

  const handleGetMarket = async() => {
    const reply = await actions.getMarket(name)
    if (reply.status) {
      actions.setMarketByNetwork(reply.marketplace, state.networkId)
      setMarket(reply.marketplace)
    }
  }

  const handleMetamask = () => wallet.connect()
  const handleWalletConnect = () => wallet.connect('walletconnect')
  const handleDisconnect = () => actions.logout(wallet)

  console.log("CURRENT STATE", state, actions)

  return (
    <Container maxW="container.md" pt={10}>
      <Menu>
        <MenuButton as={Button} mb={6}>
          {state.network.name}
        </MenuButton>
        <MenuList>
          {
            networks.map(network =>
              <MenuItem key={network.networkId} onClick={() => actions.changeNetwork(wallet, network)}>
                {network.name}
              </MenuItem>
            )
          }
        </MenuList>
      </Menu>
      <HStack mb={6}>
        {
          wallet.status == 'connected'
          ? <Button onClick={handleDisconnect}>Disconnect</Button>
          : (
            <Fragment>
              <Button onClick={handleMetamask}>Metamask</Button>
              <Button onClick={handleWalletConnect}>WalletConnect</Button>
            </Fragment>
          )
        }
        <Button onClick={() => actions.sign(wallet)}>Sign</Button>
        <Button onClick={toggleColorMode}>{colorMode == 'light' ? 'DARK' : 'LIGHT'}</Button>
      </HStack>
      <Heading size="sm" mb={6}>Status: {wallet.status}</Heading>
      <Heading mb={6}>{state.isSigned ? 'Signed' : 'Unsigned'}</Heading>
      <Box p={6} borderWidth={1} rounded="md" mb={10}>
        <Text>Market Name:</Text>
        <Input name="name" onChange={e => setName(e.target.value)} mb={2} />
        <Button onClick={handleGetMarket} mb={2}>Get Market</Button>
        <Textarea name="market" value={JSON.stringify(state.market)} />
      </Box>
      <Input name="account" value={wallet.account} mb={6} />
      <Input name="file" type="file" onChange={handleFileChange} />
      <Textarea name="user" value={JSON.stringify(state.user)} mb={6} />
      <Textarea name="network" value={JSON.stringify(state.network)} mb={6} />
      <Button onClick={handleUploadMeta}>Submit Meta</Button>
    </Container>
  )
}
