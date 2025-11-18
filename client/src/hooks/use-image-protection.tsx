import { useEffect } from 'react';

/**
 * Hook to protect images from being saved, copied, or downloaded
 * Applies comprehensive protection without affecting functionality
 */
export function useImageProtection() {
  useEffect(() => {
    // Prevent right-click context menu on images
    const preventContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target instanceof HTMLImageElement ||
        target.closest('[data-testid*="gallery"]') ||
        target.closest('[data-testid="modal-image"]')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent drag and drop on images
    const preventDragDrop = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target instanceof HTMLImageElement) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent copy on images
    const preventCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target instanceof HTMLImageElement) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent keyboard shortcuts for saving
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Ctrl+S or Cmd+S for save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+S or Cmd+Shift+S for save as
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 's') {
        e.preventDefault();
        return false;
      }
      // Ctrl+P or Cmd+P for print
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', preventContextMenu, true);
    document.addEventListener('dragstart', preventDragDrop, true);
    document.addEventListener('copy', preventCopy, true);
    document.addEventListener('keydown', preventKeyboardShortcuts, true);

    // Disable text selection on images
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.style.userSelect = 'none';
      img.style.WebkitUserSelect = 'none';
      img.style.WebkitUserDrag = 'none';
      img.style.pointerEvents = 'none';
      img.addEventListener('dragstart', (e) => e.preventDefault());
      img.addEventListener('contextmenu', (e) => e.preventDefault());
    });

    // Re-apply protection to dynamically loaded images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) {
            node.style.userSelect = 'none';
            node.style.WebkitUserSelect = 'none';
            node.style.WebkitUserDrag = 'none';
            node.style.pointerEvents = 'none';
            node.addEventListener('dragstart', (e) => e.preventDefault());
            node.addEventListener('contextmenu', (e) => e.preventDefault());
          }
          // Also check child elements
          if (node instanceof HTMLElement) {
            const childImages = node.querySelectorAll('img');
            childImages.forEach((img) => {
              img.style.userSelect = 'none';
              img.style.WebkitUserSelect = 'none';
              img.style.WebkitUserDrag = 'none';
              img.style.pointerEvents = 'none';
              img.addEventListener('dragstart', (e) => e.preventDefault());
              img.addEventListener('contextmenu', (e) => e.preventDefault());
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu, true);
      document.removeEventListener('dragstart', preventDragDrop, true);
      document.removeEventListener('copy', preventCopy, true);
      document.removeEventListener('keydown', preventKeyboardShortcuts, true);
      observer.disconnect();
    };
  }, []);
}
