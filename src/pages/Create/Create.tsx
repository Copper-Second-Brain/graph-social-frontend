// src/pages/Create/Create.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, TextArea, Button } from "./Create.styles";
import { apiService } from "../../services/api";

export const Create: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [linkedDocuments, setLinkedDocuments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Hardcoded author_id for demo - in real app, get from auth context
      const author_id = "user1";
      await apiService.createDocument({
        title,
        content,
        author_id,
        linkedDocuments,
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating document:", error);
      alert("Failed to create document");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create New Document</h1>
      <Input
        type="text"
        placeholder="Document Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextArea
        placeholder="Document Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Document"}
      </Button>
    </Form>
  );
};
