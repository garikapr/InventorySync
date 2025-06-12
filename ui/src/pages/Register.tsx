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
  SimpleGrid
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
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName, sex: gender, age: phone }
    }
  })
  if (error) {
    alert(error.message)
  } else {
    alert("An email has been sent to your email to verify account and create password.")
    // Optionally redirect to login
  }
}

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.100">
    <Box p={8} bg="white" borderRadius="md" shadow="md" maxW="lg" w="full">
        <LogoHeader />
        <Text fontSize="2xl" mb={6} textAlign="center">Register</Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
              <FormControl>
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
                <HStack spacing={6}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold" fontSize="lg">Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="green" w="full">Register</Button>
            <Text fontSize="sm">
              Already have an account?{" "}
              <Button
                onClick={() => navigate('/')}
                colorScheme="green"
                variant="ghost"
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