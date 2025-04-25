// src/pages/Home/Home.tsx
import React, { useEffect, useState } from "react";
import { apiService, Document } from "../../services/api";
import { Link } from "react-router-dom";
import {
  User,
  Link as LinkIcon,
  Calendar,
  Search,
  PlusCircle,
  BookOpen,
  Bookmark,
  ChevronRight,
  Filter,
  X,
  Clock,
} from "lucide-react";

// Function to extract tags from content
const extractTags = (content: string): string[] => {
  const words = content.split(/\s+/).filter((word) => word.length > 5);
  return [...new Set(words)].slice(0, 3);
};

export const Home: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterByAuthor, setFilterByAuthor] = useState<string | null>(null);
  const [visibleDocuments, setVisibleDocuments] = useState<string[]>([]);

  // Get unique authors for filtering
  const authors = [...new Set(documents.map((doc) => doc.author_id))];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await apiService.getDocuments();
        setDocuments(docs);
        setFilteredDocuments(docs);

        // Initialize all documents as not bookmarked
        const bookmarkState: Record<string, boolean> = {};
        docs.forEach((doc) => {
          bookmarkState[doc.id] = false;
        });
        setBookmarked(bookmarkState);
      } catch (err) {
        console.error("Error loading documents:", err);
        setError("Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Filter documents based on search term and author filter
  useEffect(() => {
    let filtered = documents;

    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterByAuthor) {
      filtered = filtered.filter((doc) => doc.author_id === filterByAuthor);
    }

    setFilteredDocuments(filtered);
  }, [searchTerm, documents, filterByAuthor]);

  // Intersection Observer for document cards (lazy loading animation)
  useEffect(() => {
    if (!loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleDocuments((prev) => [...prev, entry.target.id]);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      // Observe all document cards
      document.querySelectorAll(".document-card").forEach((card) => {
        observer.observe(card);
      });

      return () => observer.disconnect();
    }
  }, [filteredDocuments, loading]);

  const toggleBookmark = (docId: string) => {
    setBookmarked((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const clearFilters = () => {
    setFilterByAuthor(null);
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-4 border-secondary-600/20 border-t-secondary-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-white/70">Loading knowledge graph...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card-dark p-6 text-center max-w-md mx-auto my-8 text-white">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl mb-4 text-white/90">Error</h2>
        <p className="mb-6 text-white/70">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredDocuments.length === 0 && !searchTerm && !filterByAuthor) {
    return (
      <div className="glass-card-dark p-8 text-center max-w-md mx-auto my-12 flex flex-col items-center">
        <BookOpen size={48} className="text-secondary-500 mb-4" />
        <h2 className="text-xl font-semibold mb-3 text-white">
          No documents yet
        </h2>
        <p className="mb-8 text-white/70">
          Get started by creating your first document
        </p>
        <Link
          to="/create"
          className="btn-primary flex items-center gap-2 group"
        >
          <PlusCircle size={18} />
          <span>Create Document</span>
          <ChevronRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Knowledge Feed
        </h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
              size={18}
            />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full bg-dark-800/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary-600/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                onClick={() => setSearchTerm("")}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            className={`p-2.5 rounded-lg ${
              filterOpen || filterByAuthor
                ? "bg-secondary-700 text-white"
                : "bg-dark-800/50 text-white/70 hover:text-white hover:bg-dark-700/70"
            } transition-colors relative`}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={18} />
            {filterByAuthor && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-secondary-500 rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* Filter dropdown */}
      {filterOpen && (
        <div className="glass-card-dark p-4 mb-6 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white/90 font-medium">Filter Documents</h3>
            <button
              className="text-white/70 hover:text-white"
              onClick={() => setFilterOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-white/70 text-sm mb-2">Author</label>
            <div className="flex flex-wrap gap-2">
              {authors.map((author) => (
                <button
                  key={author}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterByAuthor === author
                      ? "bg-secondary-700 text-white"
                      : "bg-dark-800/70 text-white/70 hover:bg-dark-700/70 hover:text-white"
                  }`}
                  onClick={() =>
                    setFilterByAuthor(author === filterByAuthor ? null : author)
                  }
                >
                  {author}
                </button>
              ))}
            </div>
          </div>

          {filterByAuthor && (
            <button
              className="text-secondary-400 hover:text-secondary-300 text-sm flex items-center gap-1"
              onClick={clearFilters}
            >
              <X size={14} />
              Clear all filters
            </button>
          )}
        </div>
      )}

      {filteredDocuments.length === 0 ? (
        <div className="glass-card-dark p-8 text-center max-w-md mx-auto my-8">
          <Search size={36} className="text-secondary-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-3 text-white">
            No matches found
          </h2>
          <p className="mb-6 text-white/70">
            Try different search terms or filter settings
          </p>
          <button onClick={clearFilters} className="btn-primary">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => {
            const isVisible = visibleDocuments.includes(doc.id);
            const tags = extractTags(doc.content);

            return (
              <div
                id={doc.id}
                key={doc.id}
                className={`document-card glass-card-dark overflow-hidden group transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Link
                      to={`/document/${doc.id}`}
                      className="text-xl font-medium text-white hover:text-secondary-400 transition-colors line-clamp-2"
                    >
                      {doc.title}
                    </Link>

                    <button
                      className="p-1.5 rounded-full hover:bg-dark-800/70 transition-colors"
                      onClick={() => toggleBookmark(doc.id)}
                    >
                      <Bookmark
                        size={18}
                        className={
                          bookmarked[doc.id]
                            ? "text-secondary-500 fill-secondary-500"
                            : "text-white/50"
                        }
                      />
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-dark-800/70 text-white/70"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Content preview */}
                  <p className="text-white/70 text-sm line-clamp-3 mb-5">
                    {doc.content}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{doc.author_id}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <LinkIcon size={14} />
                      <span>{doc.linkedDocuments?.length || 0} links</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>

                {/* Card footer with link to full document */}
                <Link
                  to={`/document/${doc.id}`}
                  className="block p-3 bg-dark-800/50 hover:bg-dark-700/70 transition-colors text-sm text-white/70 text-center group-hover:text-white"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    Read Document
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
