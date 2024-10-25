import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  useToast,
  InputGroup,
  InputLeftElement,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { Youtube, Link as LinkIcon } from 'lucide-react';

const YouTubeURLInput = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Function to validate YouTube URL
  const isValidYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };

  // Extract video ID from URL
  const getYouTubeVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleSubmit = async () => {
    if (!url.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a YouTube URL',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid YouTube video URL',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const videoId = getYouTubeVideoId(url);
      const formData = new FormData();
      formData.append('videoId', videoId);
      formData.append('url', url);

      const response = await fetch('YOUR_BACKEND_URL/save-video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save video URL');
      }

      toast({
        title: 'Success!',
        description: 'YouTube video URL saved successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setUrl('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save video URL. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Preview component for valid YouTube URLs
  const VideoPreview = ({ videoId }) => {
    if (!videoId) return null;
    
    return (
      <Box
        borderRadius="md"
        overflow="hidden"
        border="1px"
        borderColor="gray.200"
        mt={4}
      >
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video preview"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    );
  };

  const videoId = getYouTubeVideoId(url);

  return (
    <Box maxW="md" mx="auto" p={6}>
      <VStack spacing={4} align="stretch">
        <Flex align="center" mb={2}>
          <Icon as={Youtube} color="red.500" boxSize={6} mr={2} />
          <Text fontSize="lg" fontWeight="medium">
            Add YouTube Video
          </Text>
        </Flex>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={LinkIcon} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Paste YouTube URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            size="lg"
            pr="4.5rem"
          />
        </InputGroup>

        {url && !isValidYouTubeUrl(url) && (
          <Text color="red.500" fontSize="sm">
            Please enter a valid YouTube URL
          </Text>
        )}

        {videoId && <VideoPreview videoId={videoId} />}

        <Button
          colorScheme="red"
          onClick={handleSubmit}
          isLoading={loading}
          loadingText="Saving..."
          size="lg"
          leftIcon={<Icon as={Youtube} />}
        >
          Save Video URL
        </Button>
      </VStack>
    </Box>
  );
};

export default YouTubeURLInput;