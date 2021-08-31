import { useState, useEffect, Fragment } from 'react'
import {
  Box, Heading, Button, HStack, VStack, Container, Textarea, Input,
  Menu, MenuButton, MenuList, MenuItem, Select,
  useColorMode
} from '@chakra-ui/react'
import useGlobal from '../hooks/useGlobal'
import { useWallet } from 'use-wallet'
import * as xircus from 'use-xircus'


export default function Home() {
  const wallet = useWallet()
  const { colorMode, toggleColorMode } = useColorMode()
  const [networks, setNetworks] = useState([])
  const [state, actions] = useGlobal(['user', 'isSigned'])

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

  const handleFileChange = async({ target: { files } }) => {
    const cid = await actions.uploadIPFS(files[0])
    console.log("CID", cid)
  }

  const handleUploadMeta = async() => {
    const cid = await actions.uploadIPFS(JSON.stringify(state.user))
    console.log("CID", cid)
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
              <MenuItem key={network.networkId} onClick={() => actions.setNetwork(network.networkId)}>
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
        <Button onClick={toggleColorMode}>{colorMode == 'light' ? 'DARK' : 'LIGHT'}</Button>
      </HStack>
      <Heading size="sm" mb={6}>Status: {wallet.status}</Heading>
      <Heading mb={6}>{state.isSigned ? 'Signed' : 'Unsigned'}</Heading>
      <Input value={wallet.account} mb={6} />
      <Input type="file" onChange={handleFileChange} />
      <Textarea value={JSON.stringify(state.user)} mb={6} />
      <Textarea value={JSON.stringify(state.network)} mb={6} />      
      <Button onClick={handleUploadMeta}>Submit Meta</Button>
    </Container>
  )
}
