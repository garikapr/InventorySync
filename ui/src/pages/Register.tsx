import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  HStack,
  RadioGroup,
  Radio,
  SimpleGrid,
  useToast,
  Grid,
  GridItem,
  Image,
  Flex,
  Divider
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LogoHeader from "../components/Header"
import { supabase } from '../supabaseClient'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password: Math.random().toString(36) + "!Temp1", // temporary strong password
      options: {
        data: { first_name: firstName, last_name: lastName, sex: gender, age: phone }
      }
    })
    setLoading(false)
    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } else {
      toast({
        title: "Registration successful",
        description: "An email has been sent to your email to verify account and create password.",
        status: "success",
        duration: 7000,
        isClosable: true,
      })
      // Optionally redirect to login after a delay
      // setTimeout(() => navigate('/'), 2000)
    }
  }

  return (
    <Grid minH="100vh" templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
      {/* Left side: illustration and accent */}
      <GridItem
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-b, teal.100, blue.100)"
      >
        <VStack spacing={8}>
          <Image src="/Waves.png" alt="Brand" maxW="300px" />
          <Text fontSize="2xl" fontWeight="bold" color="teal.700">
            Welcome to InventorySync!
          </Text>
          <Text fontSize="lg" color="gray.600" textAlign="center">
            Sync your inventory across all platforms with ease.
          </Text>
        </VStack>
      </GridItem>
      {/* Right side: form */}
      <GridItem>
        <Flex minH="100vh" align="center" justify="center" bg="white">
          <Box
            p={10}
            borderRadius="xl"
            shadow="2xl"
            maxW="480px"
            w="100%"
            border="1px solid"
            borderColor="gray.100"
          >
            <LogoHeader />
            <Text fontSize="3xl" mb={2} textAlign="center" fontWeight="bold" color="teal.700">
              Register
            </Text>
            <Text fontSize="md" mb={6} textAlign="center" color="gray.500">
              Create your account to get started!
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack spacing={5} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold" fontSize="md">First Name</FormLabel>
                    <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold" fontSize="md">Last Name</FormLabel>
                    <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold" fontSize="md">Email</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold" fontSize="md">Phone</FormLabel>
                    <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </FormControl>
                </SimpleGrid>
                <FormControl isRequired>
                  <FormLabel fontWeight="bold" fontSize="md">Gender</FormLabel>
                  <RadioGroup onChange={setGender} value={gender}>
                    <HStack spacing={8}>
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="teal"
                  w="full"
                  size="lg"
                  isLoading={loading}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  Register
                </Button>
                <Divider />
                <Text fontSize="sm" textAlign="center">
                  Already have an account?{" "}
                  <Button
                    onClick={() => navigate('/')}
                    colorScheme="teal"
                    variant="link"
                    size="sm"
                  >
                    Login
                  </Button>
                </Text>
              </VStack>
            </form>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  )
}