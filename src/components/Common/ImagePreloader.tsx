export {
  GalleryImagePreloader as ImagePreloader,
  GalleryImagePreloader,
  useGalleryImagePreloader,
  useGalleryImagePreloader as useImagePreloader,
} from '../ProductGallery/GalleryImagePreloader';
export type { GalleryImagePreloaderProps as ImagePreloaderProps } from '../ProductGallery/GalleryImagePreloader';
export {
  isImageCached,
  getCachedImages,
  getGalleryImageUrls,
  preloadSingleImage,
  startGalleryImagePreload,
  subscribePreloadProgress,
} from '../../utils/imagePreloader';
export type { PreloadStats } from '../../utils/imagePreloader';
