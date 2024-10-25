import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  Image,
  Input,
  useToast,
  Icon,
  Flex,
  Progress,
  Grid,
  CloseButton,
  AspectRatio
} from '@chakra-ui/react';
import { Upload, Image as ImageIcon } from 'lucide-react';

const ImageUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const toast = useToast();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const newPreviews = [];

    files.forEach(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: `${file.name} is not an image`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: `${file.name} is larger than 5MB`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      validFiles.push(file);
      const preview = URL.createObjectURL(file);
      newPreviews.push(preview);
    });

    setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setPreviews(prevPreviews => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prevPreviews[index]);
      return prevPreviews.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please select at least one image to upload',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('YOUR_BACKEND_URL/upload-images', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress);
        },
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      toast({
        title: 'Success!',
        description: `Successfully uploaded ${selectedFiles.length} image${selectedFiles.length > 1 ? 's' : ''}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Clear all files and previews
      previews.forEach(preview => URL.revokeObjectURL(preview));
      setSelectedFiles([]);
      setPreviews([]);
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload images. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Box maxW="3xl" mx="auto" p={6}>
      <VStack spacing={6} align="stretch">
        <Flex align="center" mb={2}>
          <Icon as={ImageIcon} color="blue.500" boxSize={6} mr={2} />
          <Text fontSize="lg" fontWeight="medium">
            Upload Images
          </Text>
        </Flex>

        <Box
          border="2px"
          borderStyle="dashed"
          borderColor="gray.300"
          borderRadius="lg"
          p={8}
          textAlign="center"
          _hover={{ borderColor: 'blue.500', bg: 'gray.50' }}
          transition="all 0.2s"
        >
          <Input
            type="file"
            multiple
            accept="image/*"
            display="none"
            onChange={handleFileChange}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <VStack spacing={2} cursor="pointer">
              <Icon as={Upload} boxSize={12} color="gray.400" />
              <Text fontSize="sm" color="gray.600">
                Click to upload or drag and drop
              </Text>
              <Text fontSize="xs" color="gray.500">
                PNG, JPG, GIF up to 5MB
              </Text>
            </VStack>
          </label>
        </Box>

        {uploading && (
          <Progress
            value={uploadProgress}
            size="sm"
            colorScheme="blue"
            hasStripe
            isAnimated
          />
        )}

        {previews.length > 0 && (
          <Grid
            templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
            gap={4}
            mt={4}
          >
            {previews.map((preview, index) => (
              <Box
                key={index}
                position="relative"
                borderRadius="md"
                overflow="hidden"
                border="1px"
                borderColor="gray.200"
              >
                <AspectRatio ratio={1}>
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    objectFit="cover"
                  />
                </AspectRatio>
                <CloseButton
                  position="absolute"
                  top={1}
                  right={1}
                  bg="white"
                  rounded="full"
                  size="sm"
                  onClick={() => removeFile(index)}
                />
              </Box>
            ))}
          </Grid>
        )}

        <Button
          colorScheme="blue"
          onClick={handleUpload}
          isLoading={uploading}
          loadingText="Uploading..."
          size="lg"
          leftIcon={<Icon as={Upload} />}
          isDisabled={selectedFiles.length === 0}
        >
          Upload {selectedFiles.length > 0 ? `(${selectedFiles.length} files)` : ''}
        </Button>
      </VStack>
    </Box>
  );
};

export default ImageUploader;