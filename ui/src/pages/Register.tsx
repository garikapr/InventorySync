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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LogoHeader from '../components/Header';
import { supabase } from '../supabaseClient';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password: Math.random().toString(36) + '!Temp1',
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          sex: gender,
          age: phone
        }
      }
    });
    setLoading(false);
    if (error) {
      toast({
        title: 'Registration failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    } else {
      toast({
        title: 'Registration successful',
        description:
          'An email has been sent to your email to verify account and create password.',
        status: 'success',
        duration: 7000,
        isClosable: true
      });
    }
  };

  return (
    <Grid minH="100vh" templateColumns={{ base: '1fr', md: '1fr 1fr' }}>
      {/* Left side */}
      <GridItem
        bgGradient="linear(to-b, orange.50, red.50)"
        bgImage="url('/background-pattern.png')"
        bgSize="cover"
        bgPosition="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={10}
        color="gray.700"
      >
        <Image src="/Waves.png" alt="Logo" boxSize="120px" mb={4} />
        <Text fontSize="3xl" fontWeight="bold" color="purple.600" textAlign="center">
          InventorySync
        </Text>
        <Text fontSize="lg" mt={2} mb={6} textAlign="center">
          Sync Simplified
        </Text>
        <VStack spacing={4} textAlign="left" maxW="md">
          <Text>✅ Sync inventory across eBay, Amazon, Etsy, Shopify</Text>
          <Text>✅ Prevent overselling and avoid account suspensions</Text>
          <Text>✅ Real-time updates with one dashboard</Text>
          <Text>✅ Save time and improve customer satisfaction</Text>
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
            <Text fontSize="3xl" mb={2} textAlign="center" fontWeight="bold" color="purple.600">
              Register
            </Text>
            <Text fontSize="md" mb={6} textAlign="center" color="gray.500">
              Create your account to get started!
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack spacing={5} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </FormControl>
                </SimpleGrid>
                <FormControl isRequired>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup onChange={setGender} value={gender}>
                    <HStack spacing={8}>
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="purple"
                  w="full"
                  size="lg"
                  isLoading={loading}
                >
                  Register
                </Button>
                <Divider />
                <Text fontSize="sm" textAlign="center">
                  Already have an account?{' '}
                  <Button onClick={() => navigate('/')} variant="link" size="sm" colorScheme="purple">
                    Login
                  </Button>
                </Text>
              </VStack>
            </form>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}
