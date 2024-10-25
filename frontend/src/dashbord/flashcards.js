import React, { useState } from 'react'
import {
  ChakraProvider,
  Box,
  VStack,
  Text,
  
  IconButton,
  HStack,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight, FaRandom, FaStar, FaVolumeUp } from 'react-icons/fa'

const flashcards = [
  { front: "A sample user who is a good proxy for the needs of a larger group of users)", back: "Persona" },
  { front: "What is the capital of France?", back: "Paris" },
  { front: "What is the largest planet in our solar system?", back: "Jupiter" },
  // Add more flashcards here
]

export default function Flashcards() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')
  const buttonBgColor = useColorModeValue('blue.600', 'blue.200')
  const buttonTextColor = useColorModeValue('white', 'gray.800')

  const handleFlip = () => setIsFlipped(!isFlipped)
  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length)
    setIsFlipped(false)
  }
  const handlePrev = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setIsFlipped(false)
  }
  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length)
    setCurrentCard(randomIndex)
    setIsFlipped(false)
  }
const  bgGradient = useColorModeValue(
  'linear(to-br, blue.50, pink.100)',
  'linear(to-br, gray.900, purple.900)');
  return (
    <ChakraProvider>
      <Box bgGradient={bgGradient} minHeight="100vh" display="flex" alignItems="center" justifyContent="center" >
        <VStack spacing={4} width="full" maxWidth="600px">
          <Box
            bg={bgColor}
            borderRadius="lg"
            boxShadow="xl"
            p={8}
            width="800px"
            height="450px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            transition="transform 0.8s"
            cursor="pointer"
            transform={isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"}
            onClick={handleFlip}
          >
            <Text fontSize="2xl" textAlign="center" color={textColor}transform={isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"}>
              {isFlipped ? flashcards[currentCard].back : flashcards[currentCard].front}
            </Text>
            <Flex position="absolute" top={2} right={2}transform={isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"}>
              <IconButton
                icon={<FaVolumeUp />}
                aria-label="Read aloud"
                variant="ghost"
                mr={2}
              />
              <IconButton
                icon={<FaStar />}
                aria-label="Favorite"
                variant="ghost"
                color={isFavorite ? "yellow.400" : "gray.300"}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFavorite(!isFavorite)
                }}
              />
            </Flex>
          </Box>
          <Box
            bg={buttonBgColor}
            color={buttonTextColor}
            p={4}
            borderRadius="md"
            width="full"
            textAlign="center"
          >
            Click the card to flip 👆
          </Box>
          <HStack spacing={4}>
            <IconButton
              icon={<FaChevronLeft />}
              aria-label="Previous card"
              onClick={handlePrev}
            />
            <IconButton
              icon={<FaRandom />}
              aria-label="Shuffle cards"
              onClick={handleShuffle}
            />
            <Text>
              {currentCard + 1} / {flashcards.length}
            </Text>
            <IconButton
              icon={<FaChevronRight />}
              aria-label="Next card"
              onClick={handleNext}
            />
          </HStack>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}