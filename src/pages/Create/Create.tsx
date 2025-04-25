// src/pages/Create/Create.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiService } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import {
  AiOutlinePlusCircle,
  AiOutlineLink,
  AiOutlineClose,
} from "react-icons/ai";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(106, 61, 232, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
`;

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #4a2b9e;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(106, 61, 232, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  min-height: 200px;
  transition: all 0.3s ease;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(106, 61, 232, 0.2);
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #6a3de8 0%, #9c6dff 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(106, 61, 232, 0.2);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const DocumentSelector = styled.div`
  margin-top: 1rem;
`;

const DocumentList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(106, 61, 232, 0.1);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #4a2b9e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 0.25rem;

  &:hover {
    color: #6a3de8;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(106, 61, 232, 0.2);
  }
`;

export const Create: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [linkedDocuments, setLinkedDocuments] = useState<string[]>([]);
  const [availableDocuments, setAvailableDocuments] = useState<
    Array<{ id: string; title: string }>
  >([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await apiService.getDocuments();
        setAvailableDocuments(docs);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const author_id = currentUser?.id || "user1"; // Fallback to "user1" for demo
      await apiService.createDocument({
        title,
        content,
        author_id,
        linkedDocuments,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error creating document:", error);
      alert("Failed to create document");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addLinkedDocument = () => {
    if (selectedDocument && !linkedDocuments.includes(selectedDocument)) {
      setLinkedDocuments([...linkedDocuments, selectedDocument]);
      setSelectedDocument("");
    }
  };

  const removeLinkedDocument = (docId: string) => {
    setLinkedDocuments(linkedDocuments.filter((id) => id !== docId));
  };

  // Get document title by ID
  const getDocumentTitle = (docId: string) => {
    const doc = availableDocuments.find((doc) => doc.id === docId);
    return doc ? doc.title : docId;
  };

  return (
    <PageContainer>
      <FormCard>
        <PageTitle>Create New Document</PageTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter a title for your document"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="content">Document Content</Label>
            <TextArea
              id="content"
              placeholder="Enter the content of your document"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Link to Existing Documents</Label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Select
                value={selectedDocument}
                onChange={(e) => setSelectedDocument(e.target.value)}
              >
                <option value="">Select a document</option>
                {availableDocuments
                  .filter((doc) => !linkedDocuments.includes(doc.id))
                  .map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.title}
                    </option>
                  ))}
              </Select>
              <Button
                type="button"
                onClick={addLinkedDocument}
                disabled={!selectedDocument}
                style={{ padding: "0.5rem 1rem" }}
              >
                <AiOutlineLink /> Link
              </Button>
            </div>

            {linkedDocuments.length > 0 && (
              <DocumentList>
                {linkedDocuments.map((docId) => (
                  <DocumentItem key={docId}>
                    {getDocumentTitle(docId)}
                    <RemoveButton
                      type="button"
                      onClick={() => removeLinkedDocument(docId)}
                    >
                      <AiOutlineClose />
                    </RemoveButton>
                  </DocumentItem>
                ))}
              </DocumentList>
            )}
          </FormGroup>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              "Creating..."
            ) : (
              <>
                <AiOutlinePlusCircle /> Create Document
              </>
            )}
          </Button>
        </Form>
      </FormCard>
    </PageContainer>
  );
};
