
import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  
  Flex,
  Image,
  useDisclosure
} from '@chakra-ui/react';
import AuthModal from '../components/authentification/autontifiction';


const Main = () => {
  const [conect, setConect] = useState(false);
 
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      position="relative"
      minHeight="100vh"
      background="'linear(to-r, purple.600, pink.600)',
    'linear(to-r, purple.400, pink.400)'"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        
        filter: "blur(40px)",
        transform: "translateZ(1)",
        
      }}
    >
      <Container maxW="container.xl" position="relative" zIndex={2}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="100vh"
          textAlign="center"
          color="white"
          px={4}
        >
          <VStack spacing={6} maxW="800px">
            <Heading
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, pink.400, purple.500)"
              bgClip="text"
            >
             Create Amazing Content with
            </Heading>
            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, purple.400, blue.500)"
              bgClip="text"
            >
               Interactive Learning Materials
            </Heading>
            <Text fontSize="2xl" color="gray.500" maxW="600px">
            Upload any content and let our AI transform it into flashcards, quizzes, and mind maps instantly. Learn smarter, not harder.</Text>
            <Button
              size="lg"
              // onClick={handleConect} 
              //type="submit" 
              colorScheme="purple"
              rounded="full"
              px={8}
              mt={4}
              onClick={onOpen}
            >
              Get Started 
            </Button>
            <AuthModal isOpen={isOpen} onClose={onClose} />
             
            
          </VStack>

          {/* Floating Avatars */}
          <Image
            position="absolute"
            left="7%"
            top="25%"
            boxSize="90px"
            borderRadius="base"
            src={require("../assete/krj.png")}
            alt="Marketer"
          />
          <Image
            position="absolute"
            right="9%"
            top="35%"
            boxSize="90px"
            borderRadius="base"
            src={require("../assete/ww.png")}
            alt="Freelancer"
          />
          <Image
            position="absolute"
            left="10%"
            bottom="20%"
            boxSize="100px"
            borderRadius="base"
            src={require("../assete/il.png")}
            alt="Writer"
          />
          <Image
            position="absolute"
            right="20%"
            bottom="20%"
            boxSize="100px"
            borderRadius="base"
            src={require("../assete/ff.png")}
            alt="Blogger"
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Main ;