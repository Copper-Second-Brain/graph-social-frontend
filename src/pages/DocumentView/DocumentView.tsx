// src/pages/DocumentView/DocumentView.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiService } from "../../services/api";
import { Document as DocumentType } from "../../services/api";
import {
  ArrowLeft,
  Share2,
  Clock,
  User,
  Tag,
  Link as LinkIcon,
  Bookmark,
  BookmarkPlus,
} from "lucide-react";

// Function to format date string
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Extract tags from content
const extractTags = (content: string): string[] => {
  const words = content.split(/\s+/).filter((word) => word.length > 5);
  return [...new Set(words)].slice(0, 5);
};

const DocumentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<DocumentType | null>(null);
  const [relatedDocuments, setRelatedDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      if (!id) return;

      try {
        setLoading(true);
        // In a real app, you would fetch this specific document
        const docs = await apiService.getDocuments();
        const doc = docs.find((d) => d.id === id);

        if (!doc) {
          setError("Document not found");
          return;
        }

        setDocument(doc);

        // Find related documents (this is just a mock implementation)
        const related = docs.filter((d) => d.id !== id).slice(0, 3);
        setRelatedDocuments(related);
      } catch (err) {
        console.error("Error loading document:", err);
        setError("Failed to load document");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();

    // Scroll to top when document changes
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-dark-800/50 rounded mb-4"></div>
          <div className="h-5 w-32 bg-dark-800/30 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="glass-card-dark p-6 text-white text-center max-w-2xl mx-auto my-8">
        <h2 className="text-xl mb-4">Error</h2>
        <p>{error || "Document not found"}</p>
        <Link
          to="/home"
          className="btn-primary inline-flex items-center gap-2 mt-4"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  const tags = extractTags(document.content);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      {/* Back button */}
      <Link
        to="/home"
        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:animate-micro-bounce" />
        Back to Home
      </Link>

      {/* Document container */}
      <div className="glass-card-dark p-8 mb-8 relative overflow-hidden">
        {/* Color accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-600 to-primary-500"></div>

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-white">{document.title}</h1>

          <div className="flex gap-2">
            <button
              className="p-2 rounded-full bg-dark-800/50 hover:bg-dark-700/70 transition-colors"
              aria-label="Share document"
            >
              <Share2 size={18} className="text-white/80" />
            </button>
            <button
              className="p-2 rounded-full bg-dark-800/50 hover:bg-dark-700/70 transition-colors"
              aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
              onClick={() => setBookmarked(!bookmarked)}
            >
              {bookmarked ? (
                <Bookmark size={18} className="text-secondary-500" />
              ) : (
                <BookmarkPlus size={18} className="text-white/80" />
              )}
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-white/70">
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>{document.author_id}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{formatDate(new Date().toISOString())}</span>
          </div>
          <div className="flex items-center gap-1">
            <LinkIcon size={16} />
            <span>{document.linkedDocuments?.length || 0} connections</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium bg-secondary-900/50 text-secondary-300"
            >
              <Tag size={12} className="inline mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
          {/* Convert content to paragraphs */}
          {document.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-white/90 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Related documents */}
      {relatedDocuments.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white/90 mb-6">
            Related Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedDocuments.map((doc) => (
              <Link
                key={doc.id}
                to={`/document/${doc.id}`}
                className="glass-card-dark p-6 hover:translate-y-[-4px] transition-all duration-300 group"
              >
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-secondary-400 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2 mb-4">
                  {doc.content.substring(0, 120)}...
                </p>
                <div className="flex items-center text-xs text-white/60">
                  <User size={14} className="mr-1" />
                  {doc.author_id}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentView;
