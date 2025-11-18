import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Camera, Filter, X, ZoomIn, ZoomOut, RotateCcw, ChevronDown } from "lucide-react";
import type { GalleryItem } from "@shared/schema";

// Import the images with proper paths
import projectsImage from "@assets/image_1756967533758.png";
import teamImage from "@assets/WhatsApp Image 2024-08-07 at 21.11.15_3b95bb5b_1756967707430.jpg";
import araplImage from "@assets/ARAPL_1756967719523.jpg";
import techblueImage from "@assets/image_1756967840745.png";
import digitalForensicsImage from "@assets/Digital_forensics_essentials_1756967862712.png";
import bloggersconImage from "@assets/Prathamesh_Pendkar_1756967941797.png";
import awsCertificateImage from "@assets/Screenshot 2025-09-13 192405_1757777883128.png";
import awsArchitectBadge from "@assets/aws-certified-solutions-architect-associate.png";
import web3HackathonImage from "@assets/unstop_web3.jpeg";
import tenetCTFImage from "@assets/Aissms.png";

// Map the image paths to imported modules
const imageMap = {
  "@assets/image_1756967533758.png": projectsImage,
  "@assets/WhatsApp Image 2024-08-07 at 21.11.15_3b95bb5b_1756967707430.jpg": teamImage,
  "@assets/ARAPL_1756967719523.jpg": araplImage,
  "@assets/image_1756967840745.png": techblueImage,
  "@assets/Digital_forensics_essentials_1756967862712.png": digitalForensicsImage,
  "@assets/Prathamesh_Pendkar_1756967941797.png": bloggersconImage,
  "@assets/Screenshot 2025-09-13 192405_1757777883128.png": awsCertificateImage,
  "@assets/aws-certified-solutions-architect-associate.png": awsArchitectBadge,
  "@assets/unstop_web3.jpeg": web3HackathonImage,
  "@assets/Aissms.png": tenetCTFImage,
};

const categoryLabels = {
  project: "Projects",
  certificate: "Certificates", 
  team: "Team",
  achievement: "Achievements"
};

const categoryColors = {
  project: "text-neon",
  certificate: "text-accent",
  team: "text-blue-400",
  achievement: "text-purple-400"
};

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const { data: galleryItems, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery'],
  });

  // Zoom functionality
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 5)); // Max zoom 5x
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.25)); // Min zoom 0.25x
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setZoomLevel(1); // Reset zoom when closing
  };

  // Prevent right-click and image downloading
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || (target.closest && target.closest('[data-testid*="gallery-item"]'))) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || (target.closest && target.closest('[data-testid*="gallery-item"]'))) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  if (isLoading) {
    return (
      <section id="gallery" className="min-h-screen py-20 px-4" data-testid="gallery-section">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-neon font-mono">Loading gallery...</div>
        </div>
      </section>
    );
  }

  const filteredItems = selectedCategory 
    ? galleryItems?.filter(item => item.category === selectedCategory)
    : galleryItems;

  const categories = Array.from(new Set(galleryItems?.map(item => item.category) || []));

  return (
    <section id="gallery" className="min-h-screen py-20 px-4 relative" data-testid="gallery-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Camera size={36} />
            Achievements Gallery
          </h2>
          <p className="text-muted">Professional milestones and certifications</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <TerminalWindow title="filter.sh">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded font-mono text-sm transition-colors ${
                  !selectedCategory 
                    ? 'bg-neon text-background' 
                    : 'bg-terminal text-muted hover:text-neon'
                }`}
                data-testid="filter-all"
              >
                <Filter size={16} className="inline mr-2" />
                All ({galleryItems?.length || 0})
              </button>
              {categories.map(category => {
                const count = galleryItems?.filter(item => item.category === category).length || 0;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded font-mono text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-accent text-background'
                        : 'bg-terminal text-muted hover:text-accent'
                    }`}
                    data-testid={`filter-${category}`}
                  >
                    {categoryLabels[category as keyof typeof categoryLabels]} ({count})
                  </button>
                );
              })}
            </div>
          </TerminalWindow>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems?.map((item, index) => {
            const imageSrc = imageMap[item.imagePath as keyof typeof imageMap];
            return (
              <div
                key={item.id}
                className="group cursor-pointer hover-lift hover-glow"
                onClick={() => setSelectedImage(item)}
                data-testid={`gallery-item-${item.id}`}
                style={{
                  animation: `fadeInUp ${0.6 + index * 0.1}s ease-out forwards`,
                  opacity: 0,
                }}
              >
                <TerminalWindow 
                  title={`${item.category}.${item.id}`}
                  hover
                  className="h-full transition-all duration-300"
                >
                  <div>
                    <div className="aspect-video mb-4 rounded overflow-hidden bg-terminal">
                      <img 
                        src={imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono px-2 py-1 rounded bg-terminal ${categoryColors[item.category as keyof typeof categoryColors]} transition-colors duration-300`}>
                          {categoryLabels[item.category as keyof typeof categoryLabels]}
                        </span>
                        {item.date && (
                          <span className="text-xs text-muted font-mono transition-colors duration-300">{item.date}</span>
                        )}
                      </div>
                      
                      <h3 className="font-mono font-bold text-foreground group-hover:text-neon transition-colors duration-300">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-muted font-mono line-clamp-2 group-hover:text-accent transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            );
          })}
        </div>

        {(!filteredItems || filteredItems.length === 0) && (
          <div className="text-center py-12">
            <TerminalWindow title="empty.log">
              <p className="text-muted font-mono">No items found for the selected category.</p>
            </TerminalWindow>
          </div>
        )}
      </div>

      {/* Fully Responsive Modal with Auto-fit Display */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50"
          onClick={handleCloseModal}
          data-testid="image-modal"
        >
          {/* Modal Container - Full screen responsive */}
          <div 
            className="absolute inset-0 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Controls Bar - Fixed at top */}
            <div className="flex-shrink-0 p-2 sm:p-4">
              <div className="bg-terminal rounded-lg p-2 flex items-center justify-between flex-wrap gap-2 border border-muted/20">
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  {/* Zoom Controls */}
                  <button
                    onClick={handleZoomOut}
                    className="bg-accent text-background p-1.5 sm:p-2 rounded hover:bg-neon transition-colors"
                    data-testid="zoom-out-btn"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                  </button>
                  
                  <span className="text-xs sm:text-sm font-mono text-foreground px-1 sm:px-2 whitespace-nowrap bg-background rounded px-2 py-1">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  
                  <button
                    onClick={handleZoomIn}
                    className="bg-accent text-background p-1.5 sm:p-2 rounded hover:bg-neon transition-colors"
                    data-testid="zoom-in-btn"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                  </button>
                  
                  <button
                    onClick={handleResetZoom}
                    className="bg-muted text-background p-1.5 sm:p-2 rounded hover:bg-accent transition-colors"
                    data-testid="reset-zoom-btn"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={14} />
                  </button>
                  
                  <span className="text-xs font-mono text-neon ml-2">
                    {selectedImage.category}.{selectedImage.id} - Full View
                  </span>
                </div>
                
                <button
                  onClick={handleCloseModal}
                  className="bg-neon text-background p-1.5 sm:p-2 rounded hover:bg-accent transition-colors"
                  data-testid="close-modal"
                  title="Close Modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Main Content Area - Flexible and scrollable */}
            <div className="flex-1 overflow-hidden px-2 sm:px-4">
              <div className="h-full overflow-auto bg-terminal rounded-lg border border-muted/20">
                <div className="p-2 sm:p-4">
                  {/* Check if it's a PDF */}
                  {selectedImage.imagePath.endsWith('.pdf') ? (
                    <div className="flex justify-center mb-4">
                      <div className="w-full max-w-4xl">
                        <iframe 
                          src={imageMap[selectedImage.imagePath as keyof typeof imageMap] as any}
                          className="w-full rounded shadow-lg border border-muted/30"
                          style={{ height: '600px' }}
                          data-testid="modal-pdf"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center mb-4">
                      <div 
                        className="transition-all duration-200 ease-in-out"
                        style={{
                          transform: `scale(${zoomLevel})`,
                          transformOrigin: 'center top'
                        }}
                      >
                        <img 
                          src={imageMap[selectedImage.imagePath as keyof typeof imageMap] as any}
                          alt={selectedImage.title}
                          className="rounded shadow-lg border border-muted/30"
                          style={{
                            maxWidth: zoomLevel <= 1 ? '100%' : 'none',
                            width: zoomLevel <= 1 ? 'auto' : '120%',
                            height: 'auto',
                            // Auto-fit to container while maintaining aspect ratio
                            objectFit: 'contain'
                          }}
                          data-testid="modal-image"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Certificate Details */}
                  <div className="space-y-3 border-t border-muted/20 pt-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className={`text-xs sm:text-sm font-mono px-2 sm:px-3 py-1 rounded ${categoryColors[selectedImage.category as keyof typeof categoryColors]}`}>
                        {categoryLabels[selectedImage.category as keyof typeof categoryLabels]}
                      </span>
                      {selectedImage.date && (
                        <span className="text-xs sm:text-sm text-muted font-mono">{selectedImage.date}</span>
                      )}
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-mono font-bold text-neon leading-tight">
                      {selectedImage.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-muted font-mono leading-relaxed">
                      {selectedImage.description}
                    </p>
                    
                    {/* Navigation Help */}
                    <div className="text-xs text-muted font-mono mt-4 p-2 sm:p-3 bg-background rounded border">
                      <p className="font-bold text-neon mb-1">📖 Navigation Help:</p>
                      <div className="space-y-1">
                        <p>• Zoom in/out with + - buttons to read text clearly</p>
                        <p>• Scroll within this area to view full certificate</p>
                        <p>• Reset button returns to original size</p>
                        <p>• Modal auto-adjusts to your screen size</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom padding */}
            <div className="flex-shrink-0 h-2 sm:h-4"></div>
          </div>
        </div>
      )}

      {/* Scroll Down Indicator */}
      <div className="flex justify-center mt-20 pb-8">
        <a href="#contact" className="flex flex-col items-center gap-2 text-neon hover:text-accent transition-colors">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll Down</span>
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}