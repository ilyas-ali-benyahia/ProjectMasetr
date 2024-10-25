import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Box,
  Heading,
  FormErrorMessage,
  useToast,
  Toast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
// API configuration
const axiosInstance = axios.create({
  
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});


// Add a request interceptor to add the JWT token to requests

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const authService = {
  async register(userData) {
    try {
      const response = await axios.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  },

  async login(credentials) {
    
      if (!(email && password)) {
        Toast({
          title: 'Please Provide All Informations ',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        return;
      }
      try {
        const config = { headers: { 'content-type': 'application/json' } };
        const { data } = await axios.post(
          '/user/login',
          { email, password },
          config,
        );
        localStorage.setItem('userInfo', JSON.stringify(data));
  
        // Display loading toast while waiting for the login response
        const loginPromise = new Promise((resolve, reject) => {
          resolve(data);
        });
  
        toast.promise(loginPromise, {
          loading: 'Logging in...',
          success: {
            title: 'Login Successful',
            description: `Welcome, ${data.username}!`,
          },
          error: {
            title: 'Login Failed',
            description: 'Invalid Credentials',
          },
          duration: 5000,
          position: 'bottom',
          isClosable: true,
        });
  
        if (data.isAdmin) {
          navigate('/admin/dashboards');
        } else {
          navigate('/user/dashboards');
        }
      } catch (error) {
        toast({
          title: 'Connection Failed.',
          description: 'Invalid Credentials.',
          status: 'error',
          duration: 9000,
          position: 'bottom',
          isClosable: true,
        });
      }
    
  },

  logout() {
    localStorage.removeItem('authToken');
  }
};


const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
    
  });
  
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const[username, setUsername] = useState();
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.900', 'white');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!isLogin && !formData.username) {
      newErrors.username = 'Name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        ...((!isLogin && { username: formData.username }))
      };

      const result = isLogin 
        ? await authService.login(userData)
        : await authService.register(userData);


      // Store token
      localStorage.setItem('authToken', result.token);

      toast({
        title: isLogin ? 'Login Successful' : 'Account Created Successfully',
        description: `Welcome${!isLogin ? ' to our platform' : ''}, ${result.user.name}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
      
      if (onAuthSuccess) {
        onAuthSuccess(result.user);
      }
      // Reset form
      
      
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>
          <VStack spacing={2}>
            <Heading size="lg" color={textColor}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {isLogin
                ? 'Sign in to access your account'
                : 'Create a new account to get started'}
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {!isLogin && (
                <FormControl isInvalid={errors.username}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
              )}

              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                size="lg"
                fontSize="md"
                isLoading={isLoading}
                width="full"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>

              <Box textAlign="center">
                <Text color="gray.600" fontSize="sm">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <Button
                    variant="link"
                    colorScheme="purple"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </Button>
                </Text>
              </Box>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;