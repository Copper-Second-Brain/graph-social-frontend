import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Network,
  Share2,
  Lightbulb,
  Link as LinkIcon,
  Search,
  PlusCircle,
  UserCircle,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  BarChart2,
  Users,
  BookOpen,
  Award,
} from "lucide-react";

export const Landing: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const offset = window.scrollY;
        heroRef.current.style.transform = `translateY(${offset * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Gradient background */}
      <div className="gradient-bg"></div>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-300px] right-[-300px] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-secondary-600/10 to-primary-700/10 blur-3xl"></div>
        <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary-700/10 to-secondary-600/10 blur-3xl"></div>
        <div className="absolute top-[20%] left-[30%] w-[200px] h-[200px] rounded-full bg-secondary-700/5 blur-2xl"></div>
        <div className="absolute bottom-[30%] right-[20%] w-[150px] h-[150px] rounded-full bg-primary-700/5 blur-2xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Network className="text-secondary-500" size={28} />
          <span className="text-xl font-bold gradient-text">
            KnowledgeGraph
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-white/70 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-white/70 hover:text-white transition-colors"
          >
            Methodology
          </a>
          <a
            href="#performance"
            className="text-white/70 hover:text-white transition-colors"
          >
            Performance
          </a>
          <a
            href="#team"
            className="text-white/70 hover:text-white transition-colors"
          >
            Team
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-white/80 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link to="/login" className="btn-primary py-2">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text leading-tight">
              Advanced Knowledge Representation
              <br />
              with GNNs & GATs
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              A research project exploring novel approaches to knowledge
              representation using Graph Neural Networks and Graph Attention
              Networks for complex graph-structured data.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="btn-primary group py-3 px-6 text-lg flex items-center justify-center gap-2"
              >
                <span>Explore Demo</span>
                <ChevronRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </Link>
              <a
                href="#how-it-works"
                className="bg-dark-800/50 hover:bg-dark-800/80 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Research Paper</span>
                <BookOpen size={18} />
              </a>
            </div>
          </div>

          {/* Hero Image/Mockup */}
          <div
            ref={heroRef}
            className="relative mx-auto max-w-5xl glass-card-dark p-1 rounded-2xl shadow-xl border border-white/10 overflow-hidden"
          >
            <div className="rounded-xl overflow-hidden">
              <img
                src="/api/placeholder/1080/600"
                alt="Knowledge Graph Visualization"
                className="w-full h-auto object-cover"
              />

              {/* Overlay with glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent"></div>

              {/* Floating UI elements for visual interest */}
              <div className="absolute top-[15%] right-[10%] glass-card-dark p-3 rounded-lg animate-pulse">
                <Network size={24} className="text-secondary-500" />
              </div>
              <div className="absolute bottom-[20%] left-[15%] glass-card-dark p-3 rounded-lg animate-pulse delay-300">
                <Brain size={24} className="text-primary-500" />
              </div>
            </div>
          </div>

          {/* Trusted by section */}
          <div className="mt-20 text-center">
            <p className="text-white/50 uppercase tracking-wider text-sm mb-6">
              Research Partners
            </p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {[
                "D.Y. Patil Institute of Engineering",
                "SPPU Research",
                "Kaggle Datasets",
                "PyTorch Geometric",
              ].map((company, index) => (
                <div key={index} className="text-white/30 font-bold text-xl">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Research Features
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our research explores novel approaches to knowledge representation
              using advanced graph neural network architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center mb-6">
                <Network size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Meta-Graph Attention
              </h3>
              <p className="text-white/70">
                Novel attention mechanism for scalable, dynamic graph and
                multi-relational data processing.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500 delay-100">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center mb-6">
                <Brain size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Hybrid Architecture
              </h3>
              <p className="text-white/70">
                Combines GCN layers with multi-head attention to produce richer
                context-specific representations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500 delay-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center mb-6">
                <Search size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Multi-Relational Support
              </h3>
              <p className="text-white/70">
                Enhanced capability to handle complex multi-relational graphs
                with dynamic edge types.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center mb-6">
                <Share2 size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Knowledge Graph Completion
              </h3>
              <p className="text-white/70">
                Advanced techniques for link prediction and entity alignment in
                knowledge graphs.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500 delay-100">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center mb-6">
                <LinkIcon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Semantic Analysis
              </h3>
              <p className="text-white/70">
                Improved semantic understanding through dynamic attention
                mechanisms.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500 delay-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center mb-6">
                <Lightbulb size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Disease Prediction
              </h3>
              <p className="text-white/70">
                Application in healthcare for disease prediction using
                graph-based patient data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Research Methodology
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our approach combines Graph Neural Networks with attention
              mechanisms to create meaningful representations of
              graph-structured knowledge.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="glass-card-dark p-6 md:p-8 rounded-xl border border-white/10 mb-8 flex flex-col md:flex-row gap-6 animate-on-scroll opacity-0 transition-all duration-500">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center text-xl font-bold text-white">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Dataset Preparation
                </h3>
                <p className="text-white/70 mb-4">
                  Created and curated two synthetic datasets: SynDisNet for
                  disease prediction and Relational for social network analysis.
                  These datasets were designed specifically for graph-based
                  tasks and published on Kaggle.
                </p>
                <img
                  src="/api/placeholder/600/300"
                  alt="Dataset Preparation"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-card-dark p-6 md:p-8 rounded-xl border border-white/10 mb-8 flex flex-col md:flex-row gap-6 animate-on-scroll opacity-0 transition-all duration-500 delay-100">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center text-xl font-bold text-white">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Model Architecture
                </h3>
                <p className="text-white/70 mb-4">
                  Developed a hybrid architecture combining Graph Convolutional
                  Networks with multi-head attention mechanisms. The model
                  leverages PyTorch Geometric for efficient graph operations and
                  GPU acceleration.
                </p>
                <img
                  src="/api/placeholder/600/300"
                  alt="Model Architecture"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass-card-dark p-6 md:p-8 rounded-xl border border-white/10 mb-8 flex flex-col md:flex-row gap-6 animate-on-scroll opacity-0 transition-all duration-500 delay-200">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center text-xl font-bold text-white">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Training Process
                </h3>
                <p className="text-white/70 mb-4">
                  Implemented custom loss functions and optimization strategies
                  specifically designed for graph-based tasks. The training
                  process includes techniques to handle the bottleneck problem
                  in GNNs and improve long-range dependency capture.
                </p>
                <img
                  src="/api/placeholder/600/300"
                  alt="Training Process"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Step 4 */}
            <div className="glass-card-dark p-6 md:p-8 rounded-xl border border-white/10 flex flex-col md:flex-row gap-6 animate-on-scroll opacity-0 transition-all duration-500 delay-300">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center text-xl font-bold text-white">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Evaluation & Analysis
                </h3>
                <p className="text-white/70 mb-4">
                  Conducted comprehensive evaluation using standard metrics
                  (accuracy, F1-score, AUC-ROC) across multiple datasets.
                  Compared performance against baseline models and analyzed the
                  model's ability to handle complex graph structures.
                </p>
                <img
                  src="/api/placeholder/600/300"
                  alt="Evaluation"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Connection lines between steps */}
            <div className="absolute left-6 top-16 bottom-16 w-0.5 bg-gradient-to-b from-secondary-600 via-primary-600 to-secondary-600 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Research Performance
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our model demonstrates significant improvements over baseline
              approaches in key knowledge representation tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Performance Metric 1 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center">
                  <BarChart2 size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Node Classification
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>Enhanced MetaGAT</span>
                    <span>86.7%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-secondary-500 to-primary-600 h-2 rounded-full"
                      style={{ width: "86.7%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>GATv2</span>
                    <span>80.2%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-secondary-500 to-primary-600 h-2 rounded-full"
                      style={{ width: "80.2%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>GCN</span>
                    <span>78.5%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-secondary-500 to-primary-600 h-2 rounded-full"
                      style={{ width: "78.5%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metric 2 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500 delay-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center">
                  <Award size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Link Prediction
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>Enhanced MetaGAT</span>
                    <span>89.5%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-secondary-500 to-primary-600 h-2 rounded-full"
                      style={{ width: "89.5%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>GATv2</span>
                    <span>83.9%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-secondary-500 to-primary-600 h-2 rounded-full"
                      style={{ width: "83.9%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>GCN</span>
                    <span>81.2%</span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-secondary-500 to-primary-600 h-2 rounded-full"
                      style={{ width: "81.2%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Table */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500 md:col-span-2">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Comparative Performance Analysis
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/70">
                        Dataset
                      </th>
                      <th className="text-right py-3 px-4 text-white/70">
                        Accuracy
                      </th>
                      <th className="text-right py-3 px-4 text-white/70">
                        F1-Score
                      </th>
                      <th className="text-right py-3 px-4 text-white/70">
                        Improvement
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 text-white">Cora</td>
                      <td className="text-right py-3 px-4 text-white">87.5%</td>
                      <td className="text-right py-3 px-4 text-white">85.3%</td>
                      <td className="text-right py-3 px-4 text-secondary-500">
                        +7.3%
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 text-white">Citeseer</td>
                      <td className="text-right py-3 px-4 text-white">84.2%</td>
                      <td className="text-right py-3 px-4 text-white">82.1%</td>
                      <td className="text-right py-3 px-4 text-secondary-500">
                        +6.4%
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 text-white">PubMed</td>
                      <td className="text-right py-3 px-4 text-white">91.0%</td>
                      <td className="text-right py-3 px-4 text-white">89.5%</td>
                      <td className="text-right py-3 px-4 text-secondary-500">
                        +8.1%
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-white">DBLP</td>
                      <td className="text-right py-3 px-4 text-white">85.0%</td>
                      <td className="text-right py-3 px-4 text-white">83.0%</td>
                      <td className="text-right py-3 px-4 text-secondary-500">
                        +6.8%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Research Team
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our team of researchers and developers working on advancing
              knowledge representation through graph neural networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Team Member 1 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center mx-auto mb-6">
                <UserCircle size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-1">
                Aayush Chaudhary
              </h3>
              <p className="text-white/50 text-center mb-4">
                Model Design & Backend
              </p>
              <p className="text-white/70 text-center">
                Designed the model architecture and developed the backend
                system. Responsible for dataset preparation and benchmarking.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500 delay-100">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center mx-auto mb-6">
                <UserCircle size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-1">
                Atharv Vyas
              </h3>
              <p className="text-white/50 text-center mb-4">
                Frontend & Training
              </p>
              <p className="text-white/70 text-center">
                Developed the frontend interface and implemented model training
                pipelines. Contributed to dataset preparation and feature
                engineering.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500 delay-200">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center mx-auto mb-6">
                <UserCircle size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-1">
                Om Umrania
              </h3>
              <p className="text-white/50 text-center mb-4">
                Research & Presentation
              </p>
              <p className="text-white/70 text-center">
                Prepared research papers and presentations. Conducted literature
                review and comparative analysis of existing approaches.
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center mx-auto mb-6">
                <UserCircle size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-1">
                Yashada Nalawade
              </h3>
              <p className="text-white/50 text-center mb-4">
                Frontend & Documentation
              </p>
              <p className="text-white/70 text-center">
                Developed frontend components and maintained comprehensive
                project documentation. Ensured research reproducibility.
              </p>
            </div>

            {/* Faculty Advisors */}
            <div className="glass-card-dark p-6 rounded-xl border border-white/10 animate-on-scroll opacity-0 transition-all duration-500 delay-100 md:col-span-2 lg:col-span-1">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary-600 to-primary-700 flex items-center justify-center mx-auto mb-6">
                <Users size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-1">
                Faculty Advisors
              </h3>
              <p className="text-white/50 text-center mb-4">
                Research Guidance
              </p>
              <p className="text-white/70 text-center">
                Special thanks to our professors at D.Y. Patil College of
                Engineering for their invaluable guidance and support throughout
                this research project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card-dark p-10 md:p-16 rounded-2xl border border-white/10 text-center relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/30 to-primary-900/30 blur-xl"></div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Interested in Our Research?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Explore our demo, read the research paper, or get in touch to
                learn more about our work on advanced knowledge representation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="btn-primary group py-3 px-8 text-lg flex items-center justify-center gap-2"
                >
                  <span>Try Demo</span>
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Link>
                <a
                  href="#paper"
                  className="bg-dark-800/50 hover:bg-dark-800/80 text-white py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Read Paper</span>
                  <BookOpen size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4">Research</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Methodology
                  </a>
                </li>
                <li>
                  <a
                    href="#performance"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Performance
                  </a>
                </li>
                <li>
                  <a
                    href="#team"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Team
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#paper"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Research Paper
                  </a>
                </li>
                <li>
                  <a
                    href="#datasets"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Datasets
                  </a>
                </li>
                <li>
                  <a
                    href="#code"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Source Code
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#institution"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Institution
                  </a>
                </li>
                <li>
                  <a
                    href="#publications"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Publications
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#github"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#linkedin"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#kaggle"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Kaggle
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Network className="text-secondary-500" size={24} />
              <span className="text-lg font-bold gradient-text">
                KnowledgeGraph Research
              </span>
            </div>

            <div className="text-white/50 text-sm">
              © {new Date().getFullYear()} Advanced Knowledge Representation
              Research. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
