import React from 'react';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Divider,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';

const Footer = () => {
  const footerBg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={footerBg} color={textColor}>
      <Container maxW="6xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8} mb={8}>
          {/* Company Info */}
          <Stack spacing={4} align="flex-start">
            <Text fontSize="xl" fontWeight="bold" color="purple.500">EduSpark</Text>
            <Text>
              Transform your learning experience with AI-powered educational tools.
            </Text>
            <Stack direction="row" spacing={4}>
              <Link href="#" color="purple.500">Twitter</Link>
              <Link href="#" color="purple.500">LinkedIn</Link>
              <Link href="#" color="purple.500">Facebook</Link>
            </Stack>
          </Stack>

          {/* Product Links */}
          <Stack spacing={4} align="flex-start">
            <Text fontWeight="bold" fontSize="lg">Product</Text>
            <Link href="#">Features</Link>
            <Link href="#">Pricing</Link>
            <Link href="#">Tutorials</Link>
            <Link href="#">Updates</Link>
          </Stack>

          {/* Company Links */}
          <Stack spacing={4} align="flex-start">
            <Text fontWeight="bold" fontSize="lg">Company</Text>
            <Link href="#">About Us</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Blog</Link>
          </Stack>

          {/* Newsletter */}
          <Stack spacing={4} align="flex-start">
            <Text fontWeight="bold" fontSize="lg">Stay Updated</Text>
            <Text>Subscribe to our newsletter</Text>
            <InputGroup size="md">
              <Input
                placeholder="Enter your email"
                borderRadius="md"
                borderColor={borderColor}
              />
              <InputRightElement width="4.5rem">
                <Button 
                  h="1.75rem" 
                  size="sm" 
                  bg="purple.500" 
                  color="white" 
                  _hover={{ bg: 'purple.600' }}
                >
                  Send
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
        </SimpleGrid>

        <Divider borderColor={borderColor} my={8} />

        {/* Bottom Footer */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} EduSpark. All rights reserved.
          </Text>
          <Stack direction="row" spacing={6}>
            <Link href="#" fontSize="sm">Privacy Policy</Link>
            <Link href="#" fontSize="sm">Terms of Service</Link>
            <Link href="#" fontSize="sm">Cookie Policy</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;