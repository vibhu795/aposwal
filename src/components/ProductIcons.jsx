import React from 'react';

export const ProductIcon = ({ type, color = '#FF6B35', className = '' }) => {
  // Return tailored SVG drawings based on the product type
  switch (type) {
    case 'romper':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Romper Baby suit body */}
          <path d="M30 25 C30 20, 70 20, 70 25 L72 55 C72 65, 60 70, 60 75 L62 82 C62 84, 58 86, 56 83 L50 76 L44 83 C42 86, 38 84, 38 82 L40 75 C40 70, 28 65, 28 55 Z" fill={color} opacity="0.85" stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Hanger neck cutout */}
          <path d="M50 25 C45 25, 45 15, 50 15 C55 15, 55 25, 50 25 Z" fill="#FFF9F2" stroke="#2E2A26" strokeWidth="2"/>
          {/* Collar details */}
          <path d="M40 25 C45 32, 50 30, 50 30 C50 30, 55 32, 60 25" stroke="#2E2A26" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Short sleeves */}
          <path d="M30 30 L18 38 C16 39, 18 43, 20 42 L28 38" fill={color} stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M70 30 L82 38 C84 39, 82 43, 80 42 L72 38" fill={color} stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Snaps & Pocket */}
          <circle cx="50" cy="65" r="2.5" fill="#2E2A26"/>
          <circle cx="50" cy="71" r="2.5" fill="#2E2A26"/>
          {/* Cute pocket or patch */}
          <path d="M52 42 H62 V50 C62 53, 52 53, 52 50 Z" fill="#FFC857" stroke="#2E2A26" strokeWidth="1.5"/>
          {/* Bear embroidery on pocket */}
          <circle cx="57" cy="46" r="2" fill="#2E2A26"/>
        </svg>
      );

    case 'carrier':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Waist belt */}
          <rect x="18" y="70" width="64" height="12" rx="4" fill="#8D99AE" stroke="#2E2A26" strokeWidth="2.5"/>
          {/* Main seating pouch */}
          <path d="M30 40 C30 40, 32 70, 50 70 C68 70, 70 40, 70 40 C70 40, 62 38, 50 38 C38 38, 30 40, 30 40 Z" fill={color} opacity="0.9" stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Harness straps */}
          <path d="M30 40 L22 20 C20 18, 28 15, 30 18 L38 38" stroke="#2E2A26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} opacity="0.5"/>
          <path d="M70 40 L78 20 C80 18, 72 15, 70 18 L62 38" stroke="#2E2A26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} opacity="0.5"/>
          {/* Safe Buckles */}
          <rect x="44" y="44" width="12" height="8" rx="2" fill="#2E2A26"/>
          <line x1="38" y1="48" x2="44" y2="48" stroke="#2E2A26" strokeWidth="2.5"/>
          <line x1="56" y1="48" x2="62" y2="48" stroke="#2E2A26" strokeWidth="2.5"/>
          {/* Hip seat block */}
          <path d="M32 70 L38 60 H62 L68 70 Z" fill="#FFC857" stroke="#2E2A26" strokeWidth="2"/>
        </svg>
      );

    case 'lotion':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Lotion tube body */}
          <path d="M35 25 L40 75 H60 L65 25 Z" fill="#FFFFFF" stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Sealed top */}
          <rect x="33" y="20" width="34" height="6" rx="1" fill="#FFC857" stroke="#2E2A26" strokeWidth="2.5"/>
          {/* Bottom Flip Cap */}
          <path d="M42 75 L44 83 H56 L58 75 Z" fill={color} stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Chamomile Leaf/Flower on label */}
          <rect x="42" y="38" width="16" height="24" rx="2" fill="#E8F5E9" stroke="#8BC34A" strokeWidth="1.5"/>
          <circle cx="50" cy="50" r="3" fill="#FFC857"/>
          <circle cx="50" cy="45" r="2.5" fill="#FFFFFF"/>
          <circle cx="50" cy="55" r="2.5" fill="#FFFFFF"/>
          <circle cx="45" cy="50" r="2.5" fill="#FFFFFF"/>
          <circle cx="55" cy="50" r="2.5" fill="#FFFFFF"/>
        </svg>
      );

    case 'wooden-toy':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cube Main Frame */}
          <rect x="25" y="40" width="50" height="45" rx="6" fill="#F4D35E" stroke="#2E2A26" strokeWidth="2.5"/>
          <path d="M25 40 L45 25 H80 L75 40 Z" fill="#EE964B" stroke="#2E2A26" strokeWidth="2.5"/>
          <path d="M75 40 L80 25 V65 L75 85 Z" fill="#F95738" stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Wire Bead Maze on top */}
          <path d="M35 25 C35 10, 65 10, 65 25" stroke="#4FB0C6" strokeWidth="3" strokeLinecap="round" fill="none"/>
          {/* Beads */}
          <circle cx="42" cy="18" r="5" fill="#FF6B35" stroke="#2E2A26" strokeWidth="1.5"/>
          <circle cx="58" cy="14" r="5" fill="#8BC34A" stroke="#2E2A26" strokeWidth="1.5"/>
          {/* Shape Cutouts on front */}
          <path d="M35 55 L42 47 L49 55 Z" fill="#4FB0C6" stroke="#2E2A26" strokeWidth="2"/>
          <circle cx="62" cy="52" r="5" fill="#FF6B35" stroke="#2E2A26" strokeWidth="2"/>
          <rect x="46" y="66" width="10" height="10" rx="1" fill="#8BC34A" stroke="#2E2A26" strokeWidth="2"/>
        </svg>
      );

    case 'shoes':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left Shoe */}
          <path d="M15 62 C15 50, 25 46, 38 46 C45 46, 50 52, 52 58 L52 70 C52 75, 42 75, 35 75 C20 75, 15 70, 15 62 Z" fill={color} opacity="0.9" stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M18 73 C25 75, 45 75, 50 73" stroke="#2E2A26" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Foot entry opening */}
          <ellipse cx="40" cy="52" rx="7" ry="4" fill="#FFFFFF" stroke="#2E2A26" strokeWidth="2"/>
          {/* Bow on shoe */}
          <circle cx="40" cy="47" r="2" fill="#FFC857"/>
          <path d="M35 45 C38 47, 39 46, 40 47 C41 46, 42 47, 45 45" stroke="#2E2A26" strokeWidth="1.5" fill="none"/>

          {/* Right Shoe */}
          <path d="M48 62 C48 50, 58 46, 71 46 C78 46, 83 52, 85 58 L85 70 C85 75, 75 75, 68 75 C53 75, 48 70, 48 62 Z" fill={color} opacity="0.95" stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M51 73 C58 75, 78 75, 83 73" stroke="#2E2A26" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Foot entry opening */}
          <ellipse cx="73" cy="52" rx="7" ry="4" fill="#FFFFFF" stroke="#2E2A26" strokeWidth="2"/>
          {/* Bow on shoe */}
          <circle cx="73" cy="47" r="2" fill="#FFC857"/>
          <path d="M68 45 C71 47, 72 46, 73 47 C74 46, 75 47, 78 45" stroke="#2E2A26" strokeWidth="1.5" fill="none"/>
        </svg>
      );

    case 'swaddle':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Swaddle background blanket */}
          <rect x="20" y="20" width="60" height="60" rx="10" fill="#E8F0FE" stroke="#2E2A26" strokeWidth="2.5"/>
          {/* Star pattern details */}
          <path d="M32 30 L34 35 L39 36 L35 39 L36 44 L32 41 L28 44 L29 39 L25 36 L30 35 Z" fill="#FFC857"/>
          <path d="M68 56 L69 60 L73 61 L70 63 L71 67 L68 65 L65 67 L66 63 L63 61 L67 60 Z" fill="#FFC857"/>
          <path d="M42 62 L43 65 L46 66 L44 68 L45 71 L42 69 L39 71 L40 68 L38 66 L41 65 Z" fill="#4FB0C6"/>
          {/* Folded blanket lines */}
          <path d="M20 50 Q50 35 80 50" stroke="#2E2A26" strokeWidth="2.5" fill="none"/>
          <path d="M20 70 Q50 55 80 70" stroke="#2E2A26" strokeWidth="2" fill="none"/>
          {/* Tied ribbon bow */}
          <rect x="42" y="47" width="16" height="8" rx="2" fill={color} stroke="#2E2A26" strokeWidth="2"/>
          <circle cx="50" cy="51" r="3" fill="#FFF9F2" stroke="#2E2A26" strokeWidth="1.5"/>
        </svg>
      );

    case 'pillow':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Crescent pillow shape */}
          <path d="M20 65 C10 50, 15 25, 50 25 C85 25, 90 50, 80 65 C72 72, 60 55, 50 55 C40 55, 28 72, 20 65 Z" fill={color} opacity="0.9" stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Pillow striping */}
          <path d="M40 27 C42 35, 38 45, 40 53" stroke="#2E2A26" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
          <path d="M50 25 C51 35, 49 45, 50 55" stroke="#2E2A26" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
          <path d="M60 27 C58 35, 62 45, 60 53" stroke="#2E2A26" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
          {/* Safety strap buckle */}
          <rect x="43" y="60" width="14" height="6" rx="1.5" fill="#2E2A26"/>
          <path d="M23 62 C23 62, 38 63, 43 63" stroke="#2E2A26" strokeWidth="2" fill="none"/>
          <path d="M77 62 C77 62, 62 63, 57 63" stroke="#2E2A26" strokeWidth="2" fill="none"/>
        </svg>
      );

    case 'plush-toy':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Elephant Plush body */}
          <circle cx="50" cy="52" r="22" fill={color} opacity="0.85" stroke="#2E2A26" strokeWidth="2.5"/>
          {/* Ears */}
          <path d="M28 50 C18 50, 15 30, 28 35 C32 37, 34 45, 32 50 Z" fill="#FFE5D9" stroke="#2E2A26" strokeWidth="2"/>
          <path d="M72 50 C82 50, 85 30, 72 35 C68 37, 66 45, 68 50 Z" fill="#FFE5D9" stroke="#2E2A26" strokeWidth="2"/>
          {/* Eyes */}
          <circle cx="43" cy="46" r="2.5" fill="#2E2A26"/>
          <circle cx="57" cy="46" r="2.5" fill="#2E2A26"/>
          {/* Cheeks */}
          <circle cx="39" cy="52" r="3" fill="#E4572E" opacity="0.5"/>
          <circle cx="61" cy="52" r="3" fill="#E4572E" opacity="0.5"/>
          {/* Trunk */}
          <path d="M50 48 Q50 64 60 62 C62 61, 62 58, 59 58 Q53 58, 53 48" fill={color} stroke="#2E2A26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Legs */}
          <circle cx="40" cy="74" r="7" fill={color} stroke="#2E2A26" strokeWidth="2"/>
          <circle cx="60" cy="74" r="7" fill={color} stroke="#2E2A26" strokeWidth="2"/>
        </svg>
      );

    case 'dress':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Girl's Summer Dress shape */}
          <path d="M38 25 L34 40 L20 75 H80 L66 40 L62 25 Z" fill={color} opacity="0.9" stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Collar cut */}
          <path d="M44 25 C46 29, 54 29, 56 25" stroke="#2E2A26" strokeWidth="2.5"/>
          {/* Ruffle Flutter Sleeves */}
          <path d="M38 25 C33 28, 30 35, 34 40" stroke="#2E2A26" strokeWidth="2.5" fill="none"/>
          <path d="M62 25 C67 28, 70 35, 66 40" stroke="#2E2A26" strokeWidth="2.5" fill="none"/>
          {/* Ribbon Bow at waist */}
          <path d="M33 42 H67" stroke="#2E2A26" strokeWidth="2.5"/>
          <rect x="45" y="38" width="10" height="8" rx="2" fill="#FFC857" stroke="#2E2A26" strokeWidth="2"/>
          {/* Floral patterns on skirt */}
          <circle cx="35" cy="55" r="3" fill="#FFF9F2"/>
          <circle cx="50" cy="62" r="3" fill="#FFF9F2"/>
          <circle cx="65" cy="55" r="3" fill="#FFF9F2"/>
          <circle cx="42" cy="70" r="3" fill="#FFF9F2"/>
          <circle cx="58" cy="70" r="3" fill="#FFF9F2"/>
        </svg>
      );

    case 'overalls':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Denim overall torso & legs */}
          <path d="M30 40 H70 V68 C70 72, 64 75, 64 78 V83 H56 V73 H44 V83 H36 V78 C36 75, 30 72, 30 68 Z" fill={color} stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Suspender straps */}
          <path d="M34 40 V24 C34 22, 38 22, 38 24 V40" fill={color} stroke="#2E2A26" strokeWidth="2"/>
          <path d="M62 40 V24 C62 22, 66 22, 66 24 V40" fill={color} stroke="#2E2A26" strokeWidth="2"/>
          {/* Brass button details */}
          <circle cx="36" cy="38" r="2.5" fill="#FFC857" stroke="#2E2A26" strokeWidth="1"/>
          <circle cx="64" cy="38" r="2.5" fill="#FFC857" stroke="#2E2A26" strokeWidth="1"/>
          {/* Front Center pocket */}
          <path d="M42 46 H58 V56 C58 59, 42 59, 42 56 Z" fill="#FFEAD2" stroke="#2E2A26" strokeWidth="2"/>
          {/* Stitch details */}
          <path d="M30 60 H70" stroke="#2E2A26" strokeWidth="1.5" strokeDasharray="3 3"/>
        </svg>
      );

    case 'bassinet':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bassinet Cradle stand */}
          <path d="M20 75 Q50 90 80 75" stroke="#2E2A26" strokeWidth="3" fill="none"/>
          <line x1="28" y1="55" x2="20" y2="75" stroke="#2E2A26" strokeWidth="2.5"/>
          <line x1="72" y1="55" x2="80" y2="75" stroke="#2E2A26" strokeWidth="2.5"/>
          {/* Main basket structure */}
          <rect x="25" y="32" width="50" height="28" rx="10" fill={color} opacity="0.9" stroke="#2E2A26" strokeWidth="2.5"/>
          {/* Pillow/Bedding inside */}
          <ellipse cx="38" cy="40" rx="9" ry="5" fill="#FFFFFF"/>
          {/* Netting dome canopy */}
          <path d="M25 35 C25 15, 75 15, 75 35" stroke="#4FB0C6" strokeWidth="2" strokeDasharray="3 3" fill="none"/>
          <path d="M50 18 V32" stroke="#4FB0C6" strokeWidth="1.5"/>
          {/* Hanging stars */}
          <polygon points="50,22 51,25 54,25 52,27 53,30 50,28 47,30 48,27 46,25 49,25" fill="#FFC857"/>
        </svg>
      );

    case 'feeding-set':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Silicone partitioned plate */}
          <rect x="18" y="28" width="48" height="36" rx="12" fill={color} stroke="#2E2A26" strokeWidth="2.5"/>
          <line x1="42" y1="28" x2="42" y2="64" stroke="#2E2A26" strokeWidth="1.5"/>
          <line x1="18" y1="46" x2="42" y2="46" stroke="#2E2A26" strokeWidth="1.5"/>

          {/* Suction bowl */}
          <path d="M42 62 C42 75, 78 75, 78 62 Z" fill="#FFEAD2" stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          <rect x="48" y="72" width="22" height="3" rx="1" fill="#FFC857" stroke="#2E2A26" strokeWidth="2"/>

          {/* Weaning spoon */}
          <path d="M72 32 L85 19 C87 17, 90 20, 88 22 L76 35 Z" fill="#8BC34A" stroke="#2E2A26" strokeWidth="1.5"/>
          <path d="M68 34 C66 32, 70 28, 72 30 C75 32, 74 37, 71 37 C69 37, 69 35, 68 34 Z" fill="#8BC34A" stroke="#2E2A26" strokeWidth="1.5"/>
        </svg>
      );

    case 'headguard':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Safety helmet cushion */}
          <path d="M22 50 C22 25, 78 25, 78 50 C78 54, 70 54, 68 54 C60 54, 58 48, 50 48 C42 48, 40 54, 32 54 C30 54, 22 54, 22 50 Z" fill={color} opacity="0.95" stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Ventilation cutouts */}
          <rect x="36" y="36" width="8" height="6" rx="3" fill="#FFF9F2" stroke="#2E2A26" strokeWidth="1.5"/>
          <rect x="56" y="36" width="8" height="6" rx="3" fill="#FFF9F2" stroke="#2E2A26" strokeWidth="1.5"/>
          {/* Ear flap loops */}
          <path d="M26 50 C23 58, 28 65, 32 62" stroke="#2E2A26" strokeWidth="2" fill="none"/>
          <path d="M74 50 C77 58, 72 65, 68 62" stroke="#2E2A26" strokeWidth="2" fill="none"/>
          {/* Soft tie straps */}
          <path d="M30 63 C33 78, 45 82, 50 82" stroke="#2E2A26" strokeWidth="2" fill="none"/>
          <path d="M70 63 C67 78, 55 82, 50 82" stroke="#2E2A26" strokeWidth="2" fill="none"/>
        </svg>
      );

    case 'maternity-dress':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Maternity dress shape (A-line flared belly) */}
          <path d="M38 20 L35 36 C35 36, 20 54, 20 78 H80 C80 54, 65 36, 65 36 L62 20 Z" fill={color} opacity="0.9" stroke="#2E2A26" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Empire waistline (high, above belly) */}
          <path d="M34 38 Q50 44 66 38" stroke="#FFC857" strokeWidth="2.5" fill="none"/>
          {/* Cross front V-neck (for nursing access) */}
          <path d="M38 20 L50 36 L62 20" stroke="#2E2A26" strokeWidth="2.5" fill="none"/>
          {/* Pleats on flared skirt */}
          <path d="M42 42 Q50 60 40 78" stroke="#2E2A26" strokeWidth="1.5" strokeDasharray="3 3"/>
          <path d="M58 42 Q50 60 60 78" stroke="#2E2A26" strokeWidth="1.5" strokeDasharray="3 3"/>
        </svg>
      );

    case 'rainbow-stacker':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rainbow Arcs stacked (large down to small) */}
          <path d="M18 78 C18 36, 82 36, 82 78" fill="#E4572E" stroke="#2E2A26" strokeWidth="2"/>
          <path d="M26 78 C26 44, 74 44, 74 78" fill="#F4A261" stroke="#2E2A26" strokeWidth="2"/>
          <path d="M34 78 C34 52, 66 52, 66 78" fill="#E9C46A" stroke="#2E2A26" strokeWidth="2"/>
          <path d="M42 78 C42 60, 58 60, 58 78" fill="#8BC34A" stroke="#2E2A26" strokeWidth="2"/>
          <path d="M50 78 C50 68, 50 68, 50 78" fill="#4FB0C6" stroke="#2E2A26" strokeWidth="2"/>
          {/* Ground board line */}
          <line x1="10" y1="78" x2="90" y2="78" stroke="#2E2A26" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Simple star badge box */}
          <rect x="20" y="20" width="60" height="60" rx="10" fill={color} stroke="#2E2A26" strokeWidth="2"/>
          <polygon points="50,30 54,42 67,42 56,50 60,63 50,55 40,63 44,50 33,42 46,42" fill="#FFFFFF"/>
        </svg>
      );
  }
};
