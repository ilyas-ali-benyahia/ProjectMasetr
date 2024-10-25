import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Textarea,
  VStack,
  HStack,
  Text,
  useToast,
  Divider,
  Select,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image,
  Heading,
} from 'lucide-react';

const TextEditor = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [linkUrl, setLinkUrl] = useState('');
  const toast = useToast();

  const handleTextChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    // Update word and character counts
    const words = newContent.trim() ? newContent.trim().split(/\s+/) : [];
    setWordCount(words.length);
    setCharCount(newContent.length);
  };

  const handleTextSelect = () => {
    const textarea = document.getElementById('editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setSelectedText(content.substring(start, end));
  };

  const insertFormatting = (tag) => {
    const textarea = document.getElementById('editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText;
    switch(tag) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'underline':
        newText = `_${selectedText}_`;
        break;
      case 'heading':
        newText = `\n# ${selectedText}\n`;
        break;
      case 'list':
        newText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        break;
      default:
        newText = selectedText;
    }
    
    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
  };

  const handleAddLink = () => {
    if (!linkUrl) {
      toast({
        title: 'Error',
        description: 'Please enter a URL',
        status: 'error',
        duration: 3000,
      });
      return;
    }
    
    const textarea = document.getElementById('editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    const linkText = `[${selectedText || 'link text'}](${linkUrl})`;
    const newContent = content.substring(0, start) + linkText + content.substring(end);
    setContent(newContent);
    setLinkUrl('');
    onClose();
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: 'Title Required',
        description: 'Please enter a title for your content',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: 'Content Required',
        description: 'Please enter some content before saving',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('YOUR_BACKEND_URL/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          wordCount,
          charCount,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      toast({
        title: 'Success!',
        description: 'Your content has been saved',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save content. Please try again.',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box maxW="4xl" mx="auto" p={6}>
      <VStack spacing={4} align="stretch">
        {/* Title Input */}
        <Input
          placeholder="Enter title"
          size="lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fontSize="xl"
          fontWeight="bold"
        />

        {/* Formatting Toolbar */}
        <HStack spacing={2} p={2} borderWidth={1} borderRadius="md">
          <ButtonGroup size="sm" isAttached variant="outline">
            <Tooltip label="Bold">
              <IconButton
                icon={<Bold size={18} />}
                onClick={() => insertFormatting('bold')}
              />
            </Tooltip>
            <Tooltip label="Italic">
              <IconButton
                icon={<Italic size={18} />}
                onClick={() => insertFormatting('italic')}
              />
            </Tooltip>
            <Tooltip label="Underline">
              <IconButton
                icon={<Underline size={18} />}
                onClick={() => insertFormatting('underline')}
              />
            </Tooltip>
          </ButtonGroup>

          <Divider orientation="vertical" h="24px" />

          <ButtonGroup size="sm" isAttached variant="outline">
            <Tooltip label="Left Align">
              <IconButton icon={<AlignLeft size={18} />} />
            </Tooltip>
            <Tooltip label="Center Align">
              <IconButton icon={<AlignCenter size={18} />} />
            </Tooltip>
            <Tooltip label="Right Align">
              <IconButton icon={<AlignRight size={18} />} />
            </Tooltip>
          </ButtonGroup>

          <Divider orientation="vertical" h="24px" />

          <ButtonGroup size="sm" isAttached variant="outline">
            <Tooltip label="Add Heading">
              <IconButton
                icon={<Heading size={18} />}
                onClick={() => insertFormatting('heading')}
              />
            </Tooltip>
            <Tooltip label="Add List">
              <IconButton
                icon={<List size={18} />}
                onClick={() => insertFormatting('list')}
              />
            </Tooltip>
            <Tooltip label="Add Link">
              <IconButton
                icon={<LinkIcon size={18} />}
                onClick={onOpen}
              />
            </Tooltip>
          </ButtonGroup>
        </HStack>

        {/* Main Editor */}
        <Textarea
          id="editor"
          value={content}
          onChange={handleTextChange}
          onSelect={handleTextSelect}
          placeholder="Start typing your content here..."
          size="lg"
          minH="400px"
          p={4}
          fontSize="md"
          lineHeight="tall"
        />

        {/* Word Count and Character Count */}
        <HStack justify="space-between" fontSize="sm" color="gray.600">
          <Text>{wordCount} words</Text>
          <Text>{charCount} characters</Text>
        </HStack>

        {/* Save Button */}
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleSave}
          isLoading={saving}
          loadingText="Saving..."
        >
          Save Content
        </Button>
      </VStack>

      {/* Link Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddLink}>
              Add Link
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TextEditor;