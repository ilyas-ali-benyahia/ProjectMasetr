
// // import React from 'react'
// // import {
// //   Box,
// //   Button,
// //   Container,
// //   Flex,
// //   Heading,
// //   Input,
// //   SimpleGrid,
// //   Text,
// //   VStack,
// //   useColorModeValue,
// //   IconButton,
// //   Drawer,
// //   DrawerBody,
// //   DrawerHeader,
// //   DrawerOverlay,
// //   DrawerContent,
// //   DrawerCloseButton,
// //   useDisclosure,
// //   List,
// //   ListItem,
// //   ListIcon,
// // } from '@chakra-ui/react';

// // const FeatureCard = ({ icon, title, subtitle }) => (
// //   <Box
// //     bg={useColorModeValue('white', 'gray.800')}
// //     p={6}
// //     rounded="xl"
// //     shadow="md"
// //     transition="all 0.3s"
// //     _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
// //   >
// //     <Box
// //       bg={useColorModeValue('gray.800', 'gray.200')}
// //       color={useColorModeValue('white', 'gray.800')}
// //       rounded="lg"
// //       p={2}
// //       w="fit-content"
// //       mb={4}
// //     >
// //       {icon}
// //     </Box>
// //     <Heading size="md" mb={2}>
// //       {title}
// //     </Heading>
// //     <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
// //       {subtitle}
// //     </Text>
// //   </Box>
// // )

// // const SidebarContent = () => (
// //   <List spacing={3}>
// //     <ListItem>
// //       <ListIcon  color="gray.500" />
// //       Home
// //     </ListItem>
// //     <ListItem>
// //       <ListIcon  color="gray.500" />
// //       Messages
// //     </ListItem>
// //     <ListItem>
// //       <ListIcon  color="gray.500" />
// //       Settings
// //     </ListItem>
// //     <ListItem>
// //       <ListIcon  color="gray.500" />
// //       Help & Support
// //     </ListItem>
// //   </List>
// // )

// // export default function SayHaloEnhanced() {
// //   const { isOpen, onOpen, onClose } = useDisclosure()
// //   const bgGradient = useColorModeValue(
// //     'linear(to-br, blue.50, pink.100)',
// //     'linear(to-br, gray.900, purple.900)'
// //   )

// //   return (
// //     <Box minH="100vh" bgGradient={bgGradient}>
// //       <Flex>
// //         <Box>
// //           <IconButton
           
// //             onClick={onOpen}
// //             variant="ghost"
// //             size="lg"
// //             aria-label="Open Menu"
// //             m={4}
// //           />
// //           <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
// //             <DrawerOverlay />
// //             <DrawerContent>
// //               <DrawerCloseButton />
// //               <DrawerHeader>Menu</DrawerHeader>
// //               <DrawerBody>
// //                 <SidebarContent />
// //               </DrawerBody>
// //             </DrawerContent>
// //           </Drawer>
// //         </Box>
// //         <Container maxW="container.xl" py={6}>
// //           <Flex justify="space-between" align="center" mb={12}>
// //             <Flex align="center" gap={2}>
// //               <Box bg="gray.800" p={1.5} rounded="lg">
               
// //               </Box>
// //               <Text fontSize="xl" fontWeight="bold" color={useColorModeValue('gray.800', 'white')}>
// //                 SayHalo
// //               </Text>
// //             </Flex>
// //             <Button variant="ghost" rounded="full" size="sm">
              
// //             </Button>
// //           </Flex>

// //           <VStack spacing={6} align="center" mb={16}>
// //             <Box bg="gray.800" p={4} rounded="xl">
             
// //             </Box>
// //             <Heading size="2xl" textAlign="center" color={useColorModeValue('gray.800', 'white')}>
// //               Hi, Asal Design
// //             </Heading>
// //             <Heading size="xl" textAlign="center" color={useColorModeValue('gray.700', 'gray.200')}>
// //               Can I help you with anything?
// //             </Heading>
// //             <Text textAlign="center" maxW="2xl" color={useColorModeValue('gray.600', 'gray.400')}>
// //               Ready to assist you with anything you need, from answering questions to providing recommendations. Let's get
// //               started!
// //             </Text>
// //           </VStack>


// // <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={16}>
// //             <FeatureCard
             
// //               title="Wanderlust Destinations 2024"
// //               subtitle="Must-Visit Places"
// //             />
// //             <FeatureCard
              
// //               title="SayHalo AI: What Sets Us Apart"
// //               subtitle="Key Differentiators"
// //             />
// //             <FeatureCard
             
// //               title="Design Trends on TikTok 2024"
// //               subtitle="Trending Now"
// //             />
// //           </SimpleGrid>

// //           <Flex maxW="3xl" mx="auto" bg="white" rounded="full" shadow="md" p={1}>
// //             <IconButton
             
// //               aria-label="Upload image"
// //               rounded="full"
// //               variant="ghost"
// //               mr={1}
// //             />
// //             <IconButton
             
// //               aria-label="Attach link"
// //               rounded="full"
// //               variant="ghost"
// //               mr={2}
// //             />
// //             <Input
// //               placeholder="Ask SayHalo anything..."
// //               border="none"
// //               _focus={{ boxShadow: "none" }}
// //               flex={1}
// //             />
// //             <Button
              
// //               bg="pink.200"
// //               color="gray.800"
// //               _hover={{ bg: "pink.300" }}
// //               rounded="full"
// //             >
// //               Send
// //             </Button>
// //           </Flex>
// //         </Container>
// //       </Flex>
// //     </Box>
// //   )
// // }

// import React, { useState } from 'react'
// import {
//   Box,
//   Button,
//   Container,
//   Flex,
//   Heading,
//   Icon,
//   Input,
//   Text,
//   VStack,
//   useColorModeValue,
//   ChakraProvider,
//   extendTheme,
// } from '@chakra-ui/react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { FiUpload, FiType, FiYoutube, FiFileText, FiImage, FiFilm } from 'react-icons/fi'

// const theme = extendTheme({
//   styles: {
//     global: {
//       body: {
//         bg: "gray.900",
//         color: "white",
//       },
//     },
//   },
// })

// const MotionBox = motion(Box)

// const TabButton = ({ icon, label, description, isActive, onClick }) => (
//   <Button
//     onClick={onClick}
//     variant="ghost"
//     height="auto"
//     p={4}
//     borderRadius="xl"
//     bg={isActive ? "purple.500" : "transparent"}
//     _hover={{ bg: isActive ? "purple.600" : "whiteAlpha.200" }}
//     color={isActive ? "white" : "gray.400"}
//   >
//     <VStack spacing={1}>
//       <Icon as={icon} boxSize={6} />
//       <Text fontWeight="medium">{label}</Text>
//       <Text fontSize="xs" opacity={0.7}>{description}</Text>
//     </VStack>
//   </Button>
// )

// const FileTypeBox = ({ icon, label, format }) => (
//   <VStack
//     p={4}
//     bg="whiteAlpha.100"
//     borderRadius="lg"
//     transition="all 0.3s"
//     _hover={{ bg: "whiteAlpha.200", transform: "scale(1.05)" }}
//   >
//     <Icon as={icon} boxSize={6} color="gray.400" />
//     <Text fontWeight="medium" fontSize="sm">{label}</Text>
//     <Text fontSize="xs" color="gray.500">{format}</Text>
//   </VStack>
// )

// export default function Component() {
//   const [activeTab, setActiveTab] = useState('files')

//   const tabs = [
//     { id: 'text', label: 'Text Input', icon: FiType, description: 'Create from text or documents' },
//     { id: 'files', label: 'File Upload', icon: FiUpload, description: 'Upload multiple file types' },
//     { id: 'youtube', label: 'YouTube Import', icon: FiYoutube, description: 'Import from video content' },
//   ]

//   const fileTypes = [
//     { icon: FiFileText, label: 'Documents', format: 'doc, pdf' },
//     { icon: FiImage, label: 'Images', format: 'jpg, png' },
//     { icon: FiFilm, label: 'Videos', format: 'mp4, mov' },
//   ]

//   return (
//     <ChakraProvider theme={theme}>
//       <Box minH="100vh" p={8}>
//         <Container maxW="4xl">
//           <VStack spacing={8} align="stretch">
//             {/* Header */}
//             <VStack spacing={2} textAlign="center">
//               <Heading
//                 as="h1"
//                 size="2xl"
//                 bgGradient="linear(to-r, white, gray.300)"
//                 bgClip="text"
//               >
//                 Smart Content Upload
//               </Heading>
//               <Text color="gray.400" fontSize="lg">
//                 Transform your content into interactive flashcards with AI
//               </Text>
//             </VStack>

//             {/* Tab Navigation */}
//             <Flex
//               bg="whiteAlpha.100"
//               borderRadius="2xl"
//               p={2}
//               justify="space-between"
//             >
//               {tabs.map((tab) => (
//                 <TabButton
//                   key={tab.id}
//                   icon={tab.icon}
//                   label={tab.label}
//                   description={tab.description}
//                   isActive={activeTab === tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                 />
//               ))}
//             </Flex>

//             {/* Content Area */}
//             <AnimatePresence mode="wait">
//               <MotionBox
//                 key={activeTab}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 bg="whiteAlpha.100"
//                 borderRadius="2xl"
//                 p={8}
//                 borderWidth={2}
//                 borderStyle="dashed"
//                 borderColor="whiteAlpha.300"
//               >
//                 {activeTab === 'files' && (
//                   <VStack spacing={6} align="center">
//                     <Icon as={FiUpload} boxSize={16} color="purple.400" />
//                     <Heading size="lg">Drop files here</Heading>
//                     <Text color="gray.400">or click to browse</Text>
//                     <Flex gap={6} mt={4}>
//                       {fileTypes.map((type, index) => (
//                         <FileTypeBox key={index} {...type} />
//                       ))}
//                     </Flex>
//                   </VStack>
//                 )}
//                 {/* Placeholder for other tabs */}
//                 {activeTab !== 'files' && (
//                   <Text color="gray.400" textAlign="center">Content for {activeTab} tab</Text>
//                 )}
//               </MotionBox>
//             </AnimatePresence>

//             {/* Quick Actions */}
//             <Flex justify="center" gap={4}>
//               {['Recent Uploads', 'Templates', 'Settings'].map((action) => (
//                 <Button
//                   key={action}
//                   variant="ghost"
//                   size="sm"
//                   color="gray.400"
//                   _hover={{ color: "white" }}
//                 >
//                   {action}
//                 </Button>
//               ))}
//             </Flex>
//           </VStack>
//         </Container>
//       </Box>
//     </ChakraProvider>
//   )
// }
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
 
  Icon,

  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Card,
  CardBody,
  Center,
  
} from '@chakra-ui/react';

import {
  FaFileAlt,

  FaVideo,
  FaUpload,
  FaPlayCircle,
  
} from 'react-icons/fa';
import PDFUploader from './ulpodpdf';
import TextEditor from './inputtext';
import YouTubeURLInput from './uplodUral';
import ImageUploader from './uplodimag';

const SmartContentUpload = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  return (
    
    <Card align='center' maxW='50%' bg={bgColor} color={textColor}>
      <CardBody>
      <Tabs isFitted variant='enclosed'>
    <TabList mb='1em'>
      <Tab>pdf</Tab>
      <Tab>imag</Tab>
      <Tab>youtub</Tab>
      <Tab>content</Tab>
      
    </TabList>
    <TabPanels>
      <TabPanel>
         <PDFUploader/>
      </TabPanel>
      <TabPanel>
        <ImageUploader/>
      </TabPanel>
      <TabPanel>
       <YouTubeURLInput/>
      </TabPanel>
      <TabPanel>
        <TextEditor/>
      </TabPanel>
      
    </TabPanels>
  </Tabs>
  </CardBody>
     
  </Card>
  )
};

export default SmartContentUpload;