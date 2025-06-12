import {
  Box,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import LogoHeader from "../components/Header";

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert(error.message)
    } else {
      // Redirect to dashboard or show success
    }
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.100">
      <Box p={8} bg="white" borderRadius="md" shadow="md" maxW="md" w="full">
         <LogoHeader />
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel fontWeight="bold" fontSize="lg">Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontWeight="bold" fontSize="lg">Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue" w="full">Login</Button>
            <Text fontSize="sm">
              Don’t have an account?{" "}
              <Button
                onClick={() => navigate('/register')}
                colorScheme="blue"
                variant="ghost"
                size="sm"
              >
                Register
              </Button>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  )
}
