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
import { useState, useEffect } from 'react';
import LogoHeader from '../components/Header';
import { supabase } from '../supabaseClient';

export default function Register() {
  useEffect(() => {
    document.title = "Inventory Sync - Register";
  }, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const validate = () => {
    if (!firstName || !lastName || !email || !gender) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in all required fields.',
        status: 'warning',
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    // Simple email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        status: 'warning',
        duration: 4000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password: Math.random().toString(36) + '!Temp1',
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          sex: gender,
          phone
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
      // Optionally redirect after a delay
      // setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <Box
      minH="100vh"
      w="100vw"
      bgGradient="linear(to-r, #fff 0%, #ffe5d0 50%, #f3e8ff 100%)"
      backgroundImage="url('https://www.transparenttextures.com/patterns/cubes.png')"
      backgroundRepeat="repeat"
      display="flex"
      alignItems="stretch"
      justifyContent="center"
    >
      <Grid
        templateColumns={{ base: "1fr", md: "1.1fr 1.2fr" }}
        w="100vw"
        minH="100vh"
        boxShadow="2xl"
        borderRadius="0"
        overflow="hidden"
        bg="transparent"
      >
        {/* Left column: branding/details/features */}
        <GridItem
          bgGradient="linear(to-b, #fff 0%, #ffe5d0 60%, #f3e8ff 100%)"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          p={{ base: 6, md: 10 }}
        >
          <VStack spacing={6} align="flex-start" maxW="350px">
            <Image src="/Waves.png" alt="InventorySync Logo" maxW="120px" mb={2} />
            <Text fontSize="2xl" fontWeight="bold" color="#a259d9">
              InventorySync
            </Text>
            <Text fontSize="md" color="#ff5a36" fontWeight="semibold">
              Sync Simplified
            </Text>
            <Divider borderColor="#ff5a36" />
            <Text fontSize="lg" color="gray.700" fontWeight="bold">
              Why InventorySync?
            </Text>
            <VStack align="flex-start" spacing={3} fontSize="md" color="gray.700">
              <Text>• <b>One-stop solution</b> to sync inventory across <b>Amazon, eBay, Etsy, Shopify</b> and more.</Text>
              <Text>• <b>Prevents overselling</b> and account suspensions.</Text>
              <Text>• <b>Real-time stock updates</b> across all platforms.</Text>
              <Text>• <b>Boosts customer satisfaction</b> and avoids fines.</Text>
              <Text>• <b>Easy setup</b>, secure, and scalable for any business size.</Text>
            </VStack>
            <Box mt={4}>
              <Text fontSize="sm" color="#a259d9" fontWeight="semibold">
                Simple. Reliable. Peace of mind.
              </Text>
            </Box>
          </VStack>
        </GridItem>
        {/* Right column: registration form */}
        <GridItem>
          <Flex minH="100vh" align="center" justify="center" bg="white">
            <Box
              p={{ base: 6, md: 10 }}
              borderRadius="xl"
              shadow="lg"
              maxW="480px"
              w="100%"
              border="1px solid"
              borderColor="gray.100"
            >
              <LogoHeader />
              <Text fontSize="3xl" mb={2} textAlign="center" fontWeight="bold" color="#a259d9">
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
                        <Radio value="male" colorScheme="orange">Male</Radio>
                        <Radio value="female" colorScheme="purple">Female</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  <Button
                    type="submit"
                    bgGradient="linear(to-r, #ff5a36, #a259d9)"
                    color="white"
                    w="full"
                    size="lg"
                    isLoading={loading}
                    fontWeight="bold"
                    fontSize="lg"
                    _hover={{ bgGradient: "linear(to-r, #a259d9, #ff5a36)" }}
                  >
                    Register
                  </Button>
                  <Divider />
                  <Text fontSize="sm" textAlign="center">
                    Already have an account?{" "}
                    <Button
                      onClick={() => navigate('/')}
                      color="#a259d9"
                      variant="link"
                      size="sm"
                      fontWeight="bold"
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
    </Box>
  );
}