import {
  Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Input,
  Radio, RadioGroup, SimpleGrid, Stack, Text, useToast, VStack, Image, Divider
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
        description: 'An email has been sent to verify your account and create password.',
        status: 'success',
        duration: 7000,
        isClosable: true
      });
    }
  };

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      minH="100vh"
      w="100vw"
      maxW="100%"
      overflowX="hidden"
    >
      {/* Brand Panel */}
      <GridItem
        bgGradient="linear(to-b, #f8f0ff 0%, #fff1eb 100%)"
        display={{ base: "none", lg: "flex" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        px={12}
        py={10}
      >
        <VStack spacing={6} align="flex-start" maxW="500px">
          <Image src="/Waves.png" alt="Logo" w="120px" mb={4} />
          <Heading fontSize="3xl" fontWeight="bold" color="#a259d9">
            InventorySync
          </Heading>
          <Text fontSize="xl" fontWeight="semibold" color="#ff5a36">
            Sync Simplified
          </Text>
          
          <Divider borderColor="orange.300" borderWidth={1} my={4} />
          
          <Heading fontSize="xl" color="gray.700" fontWeight="bold">
            Why InventorySync?
          </Heading>
          
          <VStack align="flex-start" spacing={3} fontSize="md" color="gray.700">
            <Flex align="center">
              <Box w="8px" h="8px" bg="#a259d9" borderRadius="full" mr={2} />
              <Text>One-stop solution for Amazon, eBay, Etsy, Shopify</Text>
            </Flex>
            <Flex align="center">
              <Box w="8px" h="8px" bg="#a259d9" borderRadius="full" mr={2} />
              <Text>Prevents overselling and suspensions</Text>
            </Flex>
            <Flex align="center">
              <Box w="8px" h="8px" bg="#a259d9" borderRadius="full" mr={2} />
              <Text>Real-time inventory updates</Text>
            </Flex>
            <Flex align="center">
              <Box w="8px" h="8px" bg="#a259d9" borderRadius="full" mr={2} />
              <Text>Protects seller reputation</Text>
            </Flex>
            <Flex align="center">
              <Box w="8px" h="8px" bg="#a259d9" borderRadius="full" mr={2} />
              <Text>Secure and easy to use</Text>
            </Flex>
          </VStack>
          
          <Text fontSize="lg" mt={8} color="#a259d9" fontWeight="bold">
            Simple. Reliable. Peace of mind.
          </Text>
        </VStack>
      </GridItem>

      {/* Registration Form */}
      <GridItem
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="white"
        px={{ base: 4, md: 8 }}
        py={{ base: 8, md: 12 }}
      >
        <Box 
          w="100%"
          maxW="500px"
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          boxShadow={{ base: "none", md: "xl" }}
          bg="white"
        >
          <VStack spacing={2} mb={8} textAlign="center">
            <Heading fontSize="3xl" fontWeight="bold" color="#a259d9">
              Register
            </Heading>
            <Text fontSize="lg" color="gray.500">
              Create your account to get started!
            </Text>
          </VStack>
          
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">First Name</FormLabel>
                  <Input 
                    size="lg"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    focusBorderColor="#a259d9"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">Last Name</FormLabel>
                  <Input 
                    size="lg"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    focusBorderColor="#a259d9"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">Email</FormLabel>
                  <Input 
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    focusBorderColor="#a259d9"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontWeight="semibold">Phone</FormLabel>
                  <Input 
                    size="lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    focusBorderColor="#a259d9"
                  />
                </FormControl>
              </SimpleGrid>
              
              <FormControl isRequired>
                <FormLabel fontWeight="semibold">Gender</FormLabel>
                <RadioGroup onChange={setGender} value={gender}>
                  <Stack direction="row" spacing={8}>
                    <Radio value="male" colorScheme="purple" size="lg">
                      <Text fontSize="md">Male</Text>
                    </Radio>
                    <Radio value="female" colorScheme="purple" size="lg">
                      <Text fontSize="md">Female</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              
              <Button
                type="submit"
                bgGradient="linear(to-r, #ff5a36, #a259d9)"
                color="white"
                size="lg"
                w="100%"
                py={6}
                isLoading={loading}
                fontWeight="bold"
                _hover={{ 
                  bgGradient: "linear(to-r, #e04a28, #8c4cbc)",
                  transform: "translateY(-2px)",
                  boxShadow: "lg"
                }}
                _active={{ transform: "translateY(0)" }}
                transition="all 0.2s"
              >
                Create Account
              </Button>
              
              <Flex justify="center" w="100%" pt={4}>
                <Text fontSize="md">
                  Already have an account?{' '}
                  <Button
                    onClick={() => navigate('/')}
                    color="#a259d9"
                    variant="link"
                    fontWeight="bold"
                    size="md"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Sign In
                  </Button>
                </Text>
              </Flex>
            </VStack>
          </form>
        </Box>
      </GridItem>
    </Grid>
  );
}