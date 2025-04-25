// src/pages/Create/Create.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import {
  PlusCircle,
  Link as LinkIcon,
  X,
  ArrowLeft,
  ChevronRight,
  FileText,
  Leaf,
  Save,
  Network,
  AlertCircle,
} from "lucide-react";

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
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await apiService.getDocuments();
        setAvailableDocuments(docs);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setError("Failed to fetch existing documents.");
      }
    };

    fetchDocuments();
  }, []);

  // Update word and character count when content changes
  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/) : [];
    setWordCount(words.length);
    setCharCount(content.length);
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a title for your document");
      return;
    }

    if (!content.trim()) {
      setError("Please enter content for your document");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const author_id = currentUser?.id || "user1"; // Fallback to "user1" for demo
      await apiService.createDocument({
        title,
        content,
        author_id,
        linkedDocuments,
      });

      // Success animation before navigating away
      setTimeout(() => {
        navigate("/home");
      }, 800);
    } catch (error) {
      console.error("Error creating document:", error);
      setError("Failed to create document. Please try again.");
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

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Get document title by ID
  const getDocumentTitle = (docId: string) => {
    const doc = availableDocuments.find((doc) => doc.id === docId);
    return doc ? doc.title : docId;
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-white/70 hover:text-white flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back
        </button>

        <h1 className="text-2xl font-bold gradient-text">
          Create New Document
        </h1>
      </div>

      {error && (
        <div className="glass-card-dark border border-red-500/20 bg-red-500/10 p-4 rounded-xl mb-6 text-red-200 flex items-start gap-3 animate-fade-in">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card-dark p-6 rounded-xl border border-white/10">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-white/80 text-sm font-medium mb-2"
            >
              Document Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter a descriptive title..."
              className="w-full bg-dark-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-600/30 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-white/80 text-sm font-medium mb-2"
            >
              Document Content
            </label>
            <div className="relative">
              <textarea
                id="content"
                placeholder="Write your document content here..."
                className="w-full min-h-[300px] bg-dark-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-600/30 transition-all"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <div className="absolute bottom-3 right-3 text-white/40 text-xs">
                {wordCount} words | {charCount} characters
              </div>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="glass-card-dark p-6 rounded-xl border border-white/10">
          <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-2">
            <Leaf size={18} className="text-secondary-500" />
            Tags
          </h3>

          <div className="mb-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Add tags to help organize your document..."
                  className="w-full bg-dark-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-secondary-600/30 transition-all"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                />
              </div>
              <button
                type="button"
                onClick={addTag}
                disabled={!tagInput.trim()}
                className="px-4 py-2.5 bg-dark-800/70 text-white/80 hover:bg-dark-700/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
              >
                <PlusCircle size={16} />
                Add
              </button>
            </div>
            <p className="text-white/40 text-xs mt-1">
              Press Enter to add a tag
            </p>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 animate-fade-in">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-secondary-900/50 text-secondary-300 group"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-secondary-300/70 hover:text-secondary-300 p-0.5 rounded-full hover:bg-secondary-800/50 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Connections Section */}
        <div className="glass-card-dark p-6 rounded-xl border border-white/10">
          <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-2">
            <Network size={18} className="text-secondary-500" />
            Connect to Existing Documents
          </h3>

          <div className="mb-4">
            <div className="flex gap-2">
              <select
                value={selectedDocument}
                onChange={(e) => setSelectedDocument(e.target.value)}
                className="flex-1 bg-dark-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-secondary-600/30 transition-all appearance-none"
              >
                <option value="">Select a document</option>
                {availableDocuments
                  .filter((doc) => !linkedDocuments.includes(doc.id))
                  .map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.title}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={addLinkedDocument}
                disabled={!selectedDocument}
                className="px-4 py-2.5 bg-dark-800/70 text-white/80 hover:bg-dark-700/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
              >
                <LinkIcon size={16} />
                Link
              </button>
            </div>
          </div>

          {linkedDocuments.length > 0 && (
            <div className="space-y-2 animate-fade-in">
              {linkedDocuments.map((docId) => (
                <div
                  key={docId}
                  className="flex items-center justify-between gap-2 p-3 rounded-lg bg-dark-800/50 border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-secondary-500" />
                    <span className="text-white/80">
                      {getDocumentTitle(docId)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLinkedDocument(docId)}
                    className="text-white/50 hover:text-white/80 p-1 rounded-full hover:bg-dark-700/70 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {linkedDocuments.length === 0 && (
            <div className="text-center py-6 text-white/50">
              <Network size={24} className="mx-auto mb-2 opacity-50" />
              <p>No documents linked yet</p>
              <p className="text-sm mt-1">
                Connect your document to the knowledge graph
              </p>
            </div>
          )}
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-secondary-600 to-primary-700 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg hover:translate-y-[-2px] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-300 flex items-center gap-2 group"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Create Document</span>
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
