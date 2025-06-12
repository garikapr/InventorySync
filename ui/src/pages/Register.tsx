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
  useToast
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
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.100">
      <Box
        p={10}
        bg="white"
        borderRadius="lg"
        shadow="lg"
        maxW="800px"
        w="100%"
      >
        <LogoHeader />
        <Text fontSize="2xl" mb={6} textAlign="center" fontWeight="bold">
          Register
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired>
                <FormLabel fontWeight="bold" fontSize="lg">First Name</FormLabel>
                <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight="bold" fontSize="lg">Last Name</FormLabel>
                <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight="bold" fontSize="lg">Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold" fontSize="lg">Phone</FormLabel>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </FormControl>
            </SimpleGrid>
            <FormControl isRequired>
              <FormLabel fontWeight="bold" fontSize="lg">Gender</FormLabel>
              <RadioGroup onChange={setGender} value={gender}>
                <HStack spacing={8}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              colorScheme="green"
              w="full"
              size="lg"
              isLoading={loading}
            >
              Register
            </Button>
            <Text fontSize="sm" textAlign="center">
              Already have an account?{" "}
              <Button
                onClick={() => navigate('/')}
                colorScheme="green"
                variant="link"
                size="sm"
              >
                Login
              </Button>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  )
}