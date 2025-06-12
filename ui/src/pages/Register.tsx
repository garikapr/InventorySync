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
  Divider,
  useBreakpointValue
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
    }
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box minH="100vh" overflow="hidden" bgGradient="linear(to-r, #ffe5d0, #f3e8ff)">
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        w="100%"
        h="100vh"
      >
        {/* Left Side - Brand and Benefits */}
        <GridItem
          bgGradient="linear(to-b, #ffe5d0, #f3e8ff)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          px={10}
          py={8}
        >
          <VStack spacing={6} align="start" maxW="400px">
            <Image src="/Waves.png" alt="InventorySync Logo" maxW="120px" />
            <Text fontSize="2xl" fontWeight="bold" color="#a259d9">
              InventorySync
            </Text>
            <Text fontSize="md" color="#ff5a36" fontWeight="semibold">
              Sync Simplified
            </Text>
            <Divider borderColor="#ff5a36" w="100%" />
            <Text fontSize="lg" fontWeight="bold" color="gray.700">
              Why InventorySync?
            </Text>
            <VStack align="start" spacing={3} fontSize="md" color="gray.700">
              <Text>• One-stop solution for Amazon, eBay, Etsy, Shopify.</Text>
              <Text>• Prevents overselling and suspensions.</Text>
              <Text>• Real-time inventory updates.</Text>
              <Text>• Protects seller reputation.</Text>
              <Text>• Secure and easy to use.</Text>
            </VStack>
            <Text fontSize="sm" mt={4} color="#a259d9" fontWeight="semibold">
              Simple. Reliable. Peace of mind.
            </Text>
          </VStack>
        </GridItem>

        {/* Right Side - Form */}
        <GridItem
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="white"
          px={6}
        >
          <Box
            w="100%"
            maxW="480px"
            p={8}
            borderRadius="xl"
            boxShadow="lg"
            bg="white"
          >
            <LogoHeader />
            <Text fontSize="3xl" textAlign="center" fontWeight="bold" color="#a259d9">
              Register
            </Text>
            <Text fontSize="md" mb={6} textAlign="center" color="gray.500">
              Create your account to get started!
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
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
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </FormControl>
                </SimpleGrid>
                <FormControl isRequired>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup onChange={setGender} value={gender}>
                    <HStack spacing={6}>
                      <Radio value="male" colorScheme="orange">Male</Radio>
                      <Radio value="female" colorScheme="purple">Female</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
                <Button
                  type="submit"
                  bgGradient="linear(to-r, #ff5a36, #a259d9)"
                  color="white"
                  size="lg"
                  isLoading={loading}
                  fontWeight="bold"
                  _hover={{ bgGradient: "linear(to-r, #a259d9, #ff5a36)" }}
                >
                  Register
                </Button>
                <Divider />
                <Text fontSize="sm" textAlign="center">
                  Already have an account?{' '}
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
        </GridItem>
      </Grid>
    </Box>
  );
}
