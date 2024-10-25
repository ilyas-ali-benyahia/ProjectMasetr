
import React, { useState } from 'react';


import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
  
  Icon,
  SimpleGrid,
  Divider,
  useDisclosure,

} from '@chakra-ui/react';
import { Menu, X,  Sparkles, Brain,  MessageCircle, Upload, FileText, Book, Map} from 'lucide-react';

import Register from '../components/authentification/autontifiction';
import Main from './main';
import Footer from './foter';
import AuthModal from '../components/authentification/autontifiction';


const Feature = ({ icon, title, text }) => {
  return (
    <VStack
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack
        align="start"
        p={6}
        bg={useColorModeValue('white', 'gray.800')}
        rounded="xl"
        shadow="md"
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
      >
        <Icon as={icon} w={6} h={6} color="purple.500" />
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text color={useColorModeValue('gray.600', 'gray.300')}>
          {text}
        </Text>
      </VStack>
    </VStack>
  );
 }

const BackgroundElement = ({ top, left, size, rotate }) => (
  <Box
    position="absolute"
    top={top}
    left={left}
    width={size}
    height={size}
    transform={`rotate(${rotate}deg)`}
    opacity={0.1}
    zIndex={-1}
  >
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.1,-0.5C88.2,15.3,83.8,30.6,75.6,43.9C67.4,57.1,55.4,68.3,41.6,76.3C27.9,84.3,13.9,89.1,-0.7,90.3C-15.3,91.5,-30.6,89,-44.5,82.1C-58.3,75.2,-70.7,63.9,-79.8,50.2C-88.9,36.5,-94.7,20.7,-96.4,4.3C-98.1,-12.1,-95.7,-28.9,-87.8,-42.8C-79.9,-56.7,-66.4,-67.7,-51.2,-74.6C-36,-81.5,-18,-84.2,-1.2,-82.3C15.7,-80.4,31.3,-73.9,44.7,-76.4Z"
        transform="translate(100 100)"
      />
    </svg>
  </Box>
);

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bgGradient = useColorModeValue(
    'linear(to-b, purple.50, white)',
    'linear(to-b, gray.900, gray.800)'
  );
  const navBg = useColorModeValue('whiteAlpha.800', 'blackAlpha.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const brandGradient = useColorModeValue(
    'linear(to-r, purple.600, pink.600)',
    'linear(to-r, purple.400, pink.400)'
  );
  const [showCreateCounte, setShowCreateCounte] = useState(false);
  const [conect, setConect] = useState(false);

  const handleCreateProjectClick = () => {
    setShowCreateCounte(true);
  };
  const handleConect = () => {
    setConect(true);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bgGradient={bgGradient} overflow="hidden" position="relative">
      <BackgroundElement top="10%" left="5%" size="300px" rotate={30} />
      <BackgroundElement top="60%" left="80%" size="250px" rotate={-15} />
      <BackgroundElement top="80%" left="10%" size="200px" rotate={60} />

      {/* Navigation */}
      <Box
        as="nav"
        position="fixed"
        w="full"
        bg={navBg}
        backdropFilter="blur(8px)"
        borderBottom="1px solid"
        borderColor="gray.100"
        zIndex={50}
      >
        <Container maxW="7xl" px={4}>
          <Flex h={16} align="center" justify="space-between">
            <Flex align="center" gap={3}>
              <Box
                w={10}
                h={10}
                bg="purple.600"
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={Sparkles} boxSize={6} color="white" />
              </Box>
              <Text
                fontSize="xl"
                fontWeight="bold"
                bgGradient={brandGradient}
                bgClip="text"
              >
               EduSpark
              </Text>
            </Flex>

            {/* Desktop Navigation */}
           
            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              {/* <Button variant="ghost"onClick={handleConect} color={textColor}>Sign in</Button>
              {conect ? <Login onClose={() => setConect(false)} /> : <></>}
              <Button
                bg="purple.600"
                color="white"
                _hover={{ bg: 'purple.700' }}
                borderRadius="xl"
                type="submit"
                onClick={handleCreateProjectClick}
              >
                Get Started
              </Button> */}
               <Button onClick={onOpen}>Sign In</Button>
               <AuthModal isOpen={isOpen} onClose={onClose} />
               <Button onClick={onOpen}>Sign up</Button>
               <AuthModal isOpen={isOpen} onClose={onClose} />
              {showCreateCounte ? (
                  <Register onClose={() => setShowCreateCounte(false)} />
                ) : (
                  <></>
                )}
             
              
               
               
                
            </HStack>

            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              icon={isMenuOpen ? <X /> : <Menu />}
              variant="ghost"
              aria-label="Toggle menu"
            />
          </Flex>
        </Container>
      </Box>

      {/*main  */}
      
     <Main />


      <Divider />
       {/* How It Works */}
      <Box bg={useColorModeValue('linear(to-br, blue.50, pink.100)',
    'linear(to-br, gray.900, purple.900)')} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading textAlign="center" mb={8}>
              How It Works
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Feature
                icon={Upload}
                title="Upload Anything"
                text="PDF, images, audio - we process it all."
              />
              <Feature
                icon={Brain}
                title="AI Processing"
                text="Our AI extracts and understands your content."
              />
              <Feature
                icon={FileText}
                title="Generate Resources"
                text="Get flashcards, quizzes, mind maps, and more."
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Features */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={12}>
          <Heading textAlign="center">Features</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            <Feature
              icon={Book}
              title="Flashcards"
              text="Create interactive flashcards from your content."
            />
            <Feature
              icon={FileText}
              title="Quizzes"
              text="Generate quizzes to test your knowledge."
            />
            <Feature
              icon={Map}
              title="Mind Maps"
              text="Visualize concepts with auto-generated mind maps."
            />
            <Feature
              icon={MessageCircle}
              title="Content Chat"
              text="Chat with an AI about your uploaded content."
            />
          </SimpleGrid>
        </VStack>
      </Container>
     <Footer />
    </Box>
  );
};

export default LandingPage;
































// import React from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   Flex,
//   Grid,
//   Heading,
//   Icon,
//   Image,
//   List,
//   ListItem,
//   ListIcon,
//   Stack,
//   Text,
//   useColorModeValue,
//   chakra,
//   SimpleGrid,
//   Stat,
//   StatLabel,
//   StatNumber,
//   VStack,
//   HStack,
//   Badge,
// } from '@chakra-ui/react';
// import { 
//   Brain, 
//   Rocket, 
//   Users, 
//   CheckCircle2, 
//   ArrowRight, 
//   Star, 
//   Layout,
//   FileText,
//   MessageSquare,
//   Zap
// } from 'lucide-react';

// const Header = () => {
//   return (
//     <Box bg="white" py={4} borderBottom="1px" borderColor="gray.100">
//       <Container maxW="6xl">
//         <Flex justify="space-between" align="center">
//           <HStack spacing={2}>
//             <Icon as={Brain} color="purple.500" boxSize={8} />
//             <Text fontSize="2xl" fontWeight="bold" color="purple.500">
//               EduSpark
//             </Text>
//           </HStack>
//           <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
//             <Button variant="ghost">Features</Button>
//             <Button variant="ghost">Pricing</Button>
//             <Button variant="ghost">Resources</Button>
//             <Button variant="ghost">About</Button>
//           </HStack>
//           <HStack spacing={4}>
//             <Button variant="ghost">Sign in</Button>
//             <Button colorScheme="purple">Get Started</Button>
//           </HStack>
//         </Flex>
//       </Container>
//     </Box>
//   );
// };

// const Hero = () => {
//   return (
//     <Box bg="purple.50" py={20}>
//       <Container maxW="6xl">
//         <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="center">
//           <Box>
//             <Badge colorScheme="purple" mb={4}>NEW FEATURE</Badge>
//             <Heading size="2xl" mb={6} lineHeight="shorter">
//               Transform Learning with 
//               <chakra.span color="purple.500"> AI-Powered</chakra.span> Education
//             </Heading>
//             <Text fontSize="xl" color="gray.600" mb={8}>
//               Upload any content and watch it transform into interactive learning materials. 
//               Master concepts faster with personalized AI assistance.
//             </Text>
//             <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
//               <Button 
//                 size="lg" 
//                 colorScheme="purple" 
//                 rightIcon={<ArrowRight />}
//               >
//                 Start Learning Free
//               </Button>
//               <Button size="lg" variant="outline">
//                 Watch Demo
//               </Button>
//             </Stack>
//           </Box>
//           <Box>
//             <Image 
//               src={require("../assete/ww.png")}
//               alt="Learning Dashboard" 
//               rounded="lg" 
//               shadow="2xl"
//             />
//           </Box>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// const Features = () => {
//   const features = [
//     {
//       icon: FileText,
//       title: "Smart Content Analysis",
//       description: "Upload PDFs, images, or audio files and let our AI extract key concepts automatically."
//     },
//     {
//       icon: Layout,
//       title: "Interactive Flashcards",
//       description: "Transform notes into dynamic flashcards that adapt to your learning style."
//     },
//     {
//       icon: Brain,
//       title: "AI-Generated Quizzes",
//       description: "Get instant practice questions that test your understanding of the material."
//     },
//     {
//       icon: MessageSquare,
//       title: "Content Chat",
//       description: "Ask questions about your materials and get instant, contextual answers."
//     }
//   ];

//   return (
//     <Box py={20}>
//       <Container maxW="6xl">
//         <VStack spacing={12}>
//           <Box textAlign="center">
//             <Text color="purple.500" fontWeight="semibold" mb={3}>
//               FEATURES
//             </Text>
//             <Heading mb={4}>Everything You Need to Excel</Heading>
//             <Text color="gray.600" fontSize="lg" maxW="2xl">
//               Our AI-powered platform provides all the tools you need to transform any content
//               into an effective learning experience.
//             </Text>
//           </Box>
          
//           <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
//             {features.map((feature, index) => (
//               <VStack
//                 key={index}
//                 align="start"
//                 p={6}
//                 bg="white"
//                 rounded="lg"
//                 shadow="md"
//                 borderWidth="1px"
//                 borderColor="gray.100"
//                 _hover={{
//                   transform: 'translateY(-4px)',
//                   shadow: 'lg',
//                   transition: 'all 0.2s',
//                 }}
//               >
//                 <Flex
//                   w={12}
//                   h={12}
//                   align="center"
//                   justify="center"
//                   rounded="lg"
//                   bg="purple.50"
//                   color="purple.500"
//                   mb={4}
//                 >
//                   <Icon as={feature.icon} size={24} />
//                 </Flex>
//                 <Text fontWeight="bold" fontSize="lg">
//                   {feature.title}
//                 </Text>
//                 <Text color="gray.600">
//                   {feature.description}
//                 </Text>
//               </VStack>
//             ))}
//           </SimpleGrid>
//         </VStack>
//       </Container>
//     </Box>
//   );
// };

// const Stats = () => {
//   const stats = [
//     { label: 'Active Users', number: '50K+' },
//     { label: 'Content Processed', number: '1M+' },
//     { label: 'Study Hours', number: '500K+' },
//     { label: 'Success Rate', number: '94%' }
//   ];

//   return (
//     <Box bg="purple.500" py={20} color="white">
//       <Container maxW="6xl">
//         <SimpleGrid columns={{ base: 1, md: 4 }} gap={8}>
//           {stats.map((stat, index) => (
//             <Stat key={index} textAlign="center">
//               <StatNumber fontSize="4xl" fontWeight="bold" mb={2}>
//                 {stat.number}
//               </StatNumber>
//               <StatLabel fontSize="lg">{stat.label}</StatLabel>
//             </Stat>
//           ))}
//         </SimpleGrid>
//       </Container>
//     </Box>
//   );
// };

// const Testimonials = () => {
//   const testimonials = [
//     {
//       name: "Alex Chen",
//       role: "Medical Student",
//       content: "EduSpark transformed how I study. The AI-generated flashcards saved me countless hours of preparation time."
//     },
//     {
//       name: "Sarah Johnson",
//       role: "Language Teacher",
//       content: "I use EduSpark to create interactive materials for my students. The results have been incredible!"
//     },
//     {
//       name: "Michael Brown",
//       role: "Software Engineer",
//       content: "The content chat feature is like having a personal tutor available 24/7. Absolutely game-changing."
//     }
//   ];

//   return (
//     <Box py={20} bg="gray.50">
//       <Container maxW="6xl">
//         <VStack spacing={12}>
//           <Box textAlign="center">
//             <Text color="purple.500" fontWeight="semibold" mb={3}>
//               TESTIMONIALS
//             </Text>
//             <Heading mb={4}>Loved by Students and Teachers</Heading>
//             <Text color="gray.600" fontSize="lg" maxW="2xl">
//               Join thousands of learners who have transformed their education with EduSpark.
//             </Text>
//           </Box>

//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
//             {testimonials.map((testimonial, index) => (
//               <Box
//                 key={index}
//                 bg="white"
//                 p={8}
//                 rounded="lg"
//                 shadow="md"
//                 position="relative"
//               >
//                 <Icon 
//                   as={Star} 
//                   color="purple.500" 
//                   position="absolute"
//                   top={4}
//                   right={4}
//                 />
//                 <Text color="gray.600" mb={4}>
//                   "{testimonial.content}"
//                 </Text>
//                 <Text fontWeight="bold">{testimonial.name}</Text>
//                 <Text color="gray.500" fontSize="sm">
//                   {testimonial.role}
//                 </Text>
//               </Box>
//             ))}
//           </SimpleGrid>
//         </VStack>
//       </Container>
//     </Box>
//   );
// };

// const Pricing = () => {
//   const plans = [
//     {
//       name: "Basic",
//       price: "Free",
//       features: [
//         "5 uploads per month",
//         "Basic AI analysis",
//         "Standard flashcards",
//         "Community support"
//       ]
//     },
//     {
//       name: "Pro",
//       price: "$12",
//       features: [
//         "Unlimited uploads",
//         "Advanced AI features",
//         "Custom flashcard templates",
//         "Priority support",
//         "Advanced analytics"
//       ]
//     },
//     {
//       name: "Enterprise",
//       price: "Custom",
//       features: [
//         "Custom solutions",
//         "API access",
//         "Dedicated support",
//         "Team management",
//         "Advanced security"
//       ]
//     }
//   ];

//   return (
//     <Box py={20}>
//       <Container maxW="6xl">
//         <VStack spacing={12}>
//           <Box textAlign="center">
//             <Text color="purple.500" fontWeight="semibold" mb={3}>
//               PRICING
//             </Text>
//             <Heading mb={4}>Simple, Transparent Pricing</Heading>
//             <Text color="gray.600" fontSize="lg" maxW="2xl">
//               Choose the plan that best fits your learning needs.
//             </Text>
//           </Box>

//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
//             {plans.map((plan, index) => (
//               <VStack
//                 key={index}
//                 bg="white"
//                 p={8}
//                 rounded="lg"
//                 shadow="md"
//                 borderWidth="1px"
//                 borderColor="gray.100"
//                 spacing={6}
//                 align="stretch"
//               >
//                 <Text fontSize="xl" fontWeight="bold">
//                   {plan.name}
//                 </Text>
//                 <Box>
//                   <Text fontSize="4xl" fontWeight="bold">
//                     {plan.price}
//                   </Text>
//                   {plan.price !== "Custom" && (
//                     <Text color="gray.500">/month</Text>
//                   )}
//                 </Box>
//                 <List spacing={3}>
//                   {plan.features.map((feature, featureIndex) => (
//                     <ListItem key={featureIndex}>
//                       <ListIcon as={CheckCircle2} color="green.500" />
//                       {feature}
//                     </ListItem>
//                   ))}
//                 </List>
//                 <Button 
//                   colorScheme={index === 1 ? "purple" : "gray"} 
//                   size="lg"
//                   mt="auto"
//                 >
//                   Get Started
//                 </Button>
//               </VStack>
//             ))}
//           </SimpleGrid>
//         </VStack>
//       </Container>
//     </Box>
//   );
// };

// const CTA = () => {
//   return (
//     <Box bg="purple.50" py={20}>
//       <Container maxW="6xl">
//         <Stack
//           direction={{ base: 'column', md: 'row' }}
//           spacing={8}
//           align="center"
//           justify="space-between"
//         >
//           <Box maxW="2xl">
//             <Heading mb={4}>Ready to Transform Your Learning?</Heading>
//             <Text fontSize="lg" color="gray.600">
//               Join thousands of students and educators who are already using EduSpark
//               to revolutionize their learning experience.
//             </Text>
//           </Box>
//           <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
//             <Button size="lg" colorScheme="purple">
//               Get Started Free
//             </Button>
//             <Button size="lg" variant="outline" colorScheme="purple">
//               Contact Sales
//             </Button>
//           </Stack>
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// const Footer = () => {
//   return (
//     <Box bg="white" py={16}>
//       <Container maxW="6xl">
//         <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8} mb={8}>
//           <Stack spacing={4}>
//             <HStack spacing={2}>
//               <Icon as={Brain} color="purple.500" boxSize={8} />
//               <Text fontSize="2xl" fontWeight="bold" color="purple.500">
//                 EduSpark
//               </Text>
//             </HStack>
//             <Text color="gray.600">
//               Transforming education through AI-powered learning tools.
//             </Text>
//           </Stack>
          
//           <Stack spacing={4}>
//             <Text fontWeight="bold">Product</Text>
//             <Button variant="link" color="gray.600">Features</Button>
//             <Button variant="link" color="gray.600">Pricing</Button>
//             <Button variant="link" color="gray.600">Resources</Button>
//           </Stack>
          
//           <Stack spacing={4}>
//             <Text fontWeight="bold">Company</Text>
//             <Button variant="link" color="gray.600">About</Button>
//             <Button variant="link" color="gray.600">Blog</Button>
//             <Button variant="link" color="gray.600">Careers</Button>
//           </Stack>
          
//           <Stack spacing={4}>
//             <Text fontWeight="bold">Legal</Text>
//             <Button variant="link" color="gray.600">Privacy</Button>
//             <Button variant="link" color="gray.600">Terms</Button>
//             <Button variant="link" color="gray.600">Security</Button>
//           </Stack>
//         </SimpleGrid>
        
//         <Flex
//           direction={{ base: 'column', md: 'row' }}
//           justify="space-between"
//           align="center"
//           borderTopWidth={1}
//           borderColor="gray.200"
//           pt={8}
//         >
//           <Text color="gray.600">
//             © {new Date().getFullYear()} EduSpark. All rights reserved.
//           </Text>
//           <HStack spacing={4} mt={{ base: 4, md: 0 }}>
//             <Button variant="ghost" size="sm">Twitter</Button>
//             <Button variant="ghost" size="sm">LinkedIn</Button>
//             <Button variant="ghost" size="sm">Facebook</Button>
//           </HStack>
//         </Flex>
//       </Container>
//     </Box>
//   );
// };

// const LandingPage = () => {
//   return (
//     <Box>
//       <Header />
//       <Hero />
//       <Features />
//       <Stats />
//       <Testimonials />
//       <Pricing />
//       <CTA />
//       <Footer />
//     </Box>
//   );
// };

// export default LandingPage;