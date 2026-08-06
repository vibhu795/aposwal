# Workspace Rules

## Carousel Banner Image Guidelines

1. **Circular Hero Carousel Images**:
   - For carousel images or product images that need to be clipped inside the dashed moving/rotating circle (e.g., in `src/pages/Home.jsx` and `src/pages/Home.css`), the image size must match the inner dimensions of the dashed circle exactly (e.g., `192px` width/height for a `200px` circle with a `4px` border).
   - Apply `border-radius: 50%` and `object-fit: cover` to ensure it clips cleanly to a circle without borders or gaps inside.

2. **Image Masking and Oversizing for Animations**:
   - Wrap the circular image inside a container (`.graphic-image-mask`) with `overflow: hidden` and `border-radius: 50%`.
   - Make the image inside the mask slightly larger than the mask itself (e.g., `212px` image inside a `192px` mask, or about 10% larger) so that when it wiggles or bounces, it does not reveal the background behind the mask.
