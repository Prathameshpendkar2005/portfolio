import { useState, useEffect } from "react";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Camera, Filter, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import type { GalleryItem } from "@shared/schema";

// Import the images with proper paths
import projectsImage from "@assets/image_1756967533758.png";
import teamImage from "@assets/WhatsApp Image 2024-08-07 at 21.11.15_3b95bb5b_1756967707430.jpg";
import araplImage from "@assets/ARAPL_1756967719523.jpg";
import techblueImage from "@assets/image_1756967840745.png";
import digitalForensicsImage from "@assets/Digital_forensics_essentials_1756967862712.png";
import bloggersconImage from "@assets/Prathamesh_Pendkar_1756967941797.png";
import awsCertificateImage from "@assets/Screenshot 2025-09-13 192405_1757777883128.png";

// Map the image paths to imported modules
const imageMap = {
  "@assets/image_1756967533758.png": projectsImage,
  "@assets/WhatsApp Image 2024-08-07 at 21.11.15_3b95bb5b_1756967707430.jpg": teamImage,
  "@assets/ARAPL_1756967719523.jpg": araplImage,
  "@assets/image_1756967840745.png": techblueImage,
  "@assets/Digital_forensics_essentials_1756967862712.png": digitalForensicsImage,
  "@assets/Prathamesh_Pendkar_1756967941797.png": bloggersconImage,
  "@assets/Screenshot 2025-09-13 192405_1757777883128.png": awsCertificateImage,
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

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await fetch('/data/gallery.json');
        const data = await response.json();
        setGalleryItems(data);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadGallery();
  }, []);

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
    <section id="gallery" className="min-h-screen py-20 px-4" data-testid="gallery-section">
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
          {filteredItems?.map((item) => {
            const imageSrc = imageMap[item.imagePath as keyof typeof imageMap];
            return (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(item)}
                data-testid={`gallery-item-${item.id}`}
              >
                <TerminalWindow 
                  title={`${item.category}.${item.id}`}
                  hover
                  className="h-full"
                >
                  <div>
                    <div className="aspect-video mb-4 rounded overflow-hidden bg-terminal">
                      <img 
                        src={imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-mono px-2 py-1 rounded bg-terminal ${categoryColors[item.category as keyof typeof categoryColors]}`}>
                          {categoryLabels[item.category as keyof typeof categoryLabels]}
                        </span>
                        {item.date && (
                          <span className="text-xs text-muted font-mono">{item.date}</span>
                        )}
                      </div>
                      
                      <h3 className="font-mono font-bold text-foreground group-hover:text-neon transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-muted font-mono line-clamp-2 group-hover:text-accent transition-colors">
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

      {/* Enhanced Image Modal with Zoom and Scroll */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
          data-testid="image-modal"
        >
          <div
            className="w-full max-w-6xl h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <TerminalWindow title={`${selectedImage.category}.${selectedImage.id} - Full View`}>
              <div className="h-full flex flex-col">
                {/* Header with Close Button and Zoom Controls */}
                <div className="flex items-center justify-between mb-4 p-2 bg-terminal rounded sticky top-0 z-20">
                  <div className="flex items-center gap-2">
                    {/* Zoom Controls */}
                    <button
                      onClick={handleZoomOut}
                      className="bg-accent text-background p-2 rounded hover:bg-neon transition-colors"
                      data-testid="zoom-out-btn"
                      title="Zoom Out"
                    >
                      <ZoomOut size={16} />
                    </button>
                    
                    <span className="text-sm font-mono text-muted px-2">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    
                    <button
                      onClick={handleZoomIn}
                      className="bg-accent text-background p-2 rounded hover:bg-neon transition-colors"
                      data-testid="zoom-in-btn"
                      title="Zoom In"
                    >
                      <ZoomIn size={16} />
                    </button>
                    
                    <button
                      onClick={handleResetZoom}
                      className="bg-muted text-background p-2 rounded hover:bg-accent transition-colors"
                      data-testid="reset-zoom-btn"
                      title="Reset Zoom"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleCloseModal}
                    className="bg-neon text-background p-2 rounded hover:bg-accent transition-colors"
                    data-testid="close-modal"
                    title="Close Modal"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-auto">
                  {/* Image Container with Zoom */}
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="transition-transform duration-200 ease-in-out cursor-move"
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'center'
                      }}
                    >
                      <img 
                        src={imageMap[selectedImage.imagePath as keyof typeof imageMap]}
                        alt={selectedImage.title}
                        className="max-w-none rounded shadow-lg"
                        style={{
                          maxHeight: zoomLevel <= 1 ? '60vh' : 'none',
                          width: zoomLevel <= 1 ? 'auto' : '100%'
                        }}
                        data-testid="modal-image"
                      />
                    </div>
                  </div>
                  
                  {/* Image Details */}
                  <div className="space-y-4 px-2 pb-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className={`text-sm font-mono px-3 py-1 rounded bg-terminal ${categoryColors[selectedImage.category as keyof typeof categoryColors]}`}>
                        {categoryLabels[selectedImage.category as keyof typeof categoryLabels]}
                      </span>
                      {selectedImage.date && (
                        <span className="text-sm text-muted font-mono">{selectedImage.date}</span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-mono font-bold text-neon">
                      {selectedImage.title}
                    </h3>
                    
                    <p className="text-muted font-mono leading-relaxed">
                      {selectedImage.description}
                    </p>
                    
                    {/* Additional Controls Info */}
                    <div className="text-xs text-muted font-mono mt-4 p-3 bg-terminal rounded">
                      <p>💡 <strong>Navigation Tips:</strong></p>
                      <p>• Use zoom controls to zoom in/out (25% - 500%)</p>
                      <p>• Scroll to navigate when zoomed in</p>
                      <p>• Click reset button to return to original size</p>
                      <p>• Click outside modal or X button to close</p>
                    </div>
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      )}
    </section>
  );
}