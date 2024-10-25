import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
  Flex,
  Icon,
  useToast
} from '@chakra-ui/react';
import { UploadCloud, X } from 'lucide-react';

const PDFUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: 'Invalid file type',
          description: 'Please select a PDF file',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'File too large',
          description: 'File size must be less than 5MB',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a file first',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('YOUR_BACKEND_URL/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      toast({
        title: 'Success!',
        description: 'File uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setFile(null);
    } catch (err) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload file. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" p={6}>
      <VStack spacing={4} align="stretch">
        <Box
          border="2px"
          borderStyle="dashed"
          borderColor="gray.300"
          borderRadius="lg"
          p={8}
          textAlign="center"
          _hover={{ borderColor: 'gray.400' }}
          transition="all 0.2s"
        >
          <Input
            type="file"
            accept=".pdf"
            display="none"
            onChange={handleFileChange}
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload">
            <VStack spacing={2} cursor="pointer">
              <Icon as={UploadCloud} boxSize={12} color="gray.400" />
              <Text fontSize="sm" color="gray.600">
                {file ? file.name : 'Click to upload or drag and drop'}
              </Text>
              <Text fontSize="xs" color="gray.500">
                PDF (max. 5MB)
              </Text>
            </VStack>
          </label>
        </Box>

        {file && (
          <Flex
            bg="gray.50"
            p={2}
            borderRadius="md"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="sm" noOfLines={1} maxW="200px">
              {file.name}
            </Text>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setFile(null)}
              p={1}
            >
              <Icon as={X} boxSize={4} />
            </Button>
          </Flex>
        )}

        <Button
          colorScheme="blue"
          onClick={handleUpload}
          isLoading={uploading}
          loadingText="Uploading..."
          isDisabled={!file}
          width="full"
        >
          Upload PDF
        </Button>
      </VStack>
    </Box>
  );
};

export default PDFUploader;