export interface CarSpecs {
  engine: string;
  power: string;
  torque: string;
  transmission: string[];
  drivetrain: string;
}

export interface Dimensions {
  length: string;
  width: string;
  height: string;
  wheelbase: string;
  bootSpace: string;
  groundClearance: string;
}

export interface CarFeature {
  category: string;
  items: string[];
}

export interface CarDetails {
  id: string;
  brand: string;
  model: string;
  slug: string;
  basePrice: string;
  topPrice: string;
  tagline: string;
  description: string;
  heroImage: string;
  specs: CarSpecs;
  dimensions: Dimensions;
  features: CarFeature[];
}

export const CAR_DATABASE: CarDetails[] = [
  {
    id: "scorpio-n",
    brand: "Mahindra",
    model: "Scorpio N",
    slug: "mahindra-scorpio-n",
    basePrice: "₹13.60 Lakh",
    topPrice: "₹24.54 Lakh",
    tagline: "The Big Daddy of SUVs",
    description: "Unapologetic capability meets refined luxury. The Scorpio N is built on a new ladder-frame chassis offering immense off-road capability combined with premium tech.",
    heroImage: "/scorpio-hero.jpg",
    specs: {
      engine: "2.0L mStallion Turbo Petrol / 2.2L mHawk Diesel",
      power: "200 bhp (Petrol) / 172 bhp (Diesel)",
      torque: "380 Nm (Petrol) / 400 Nm (Diesel)",
      transmission: ["6-speed Manual", "6-speed Automatic"],
      drivetrain: "RWD / 4WD (4XPLOR)"
    },
    dimensions: {
      length: "4662 mm",
      width: "1917 mm",
      height: "1857 mm",
      wheelbase: "2750 mm",
      bootSpace: "460 L",
      groundClearance: "187 mm"
    },
    features: [
      {
        category: "Safety",
        items: ["6 Airbags", "ESP", "Hill Descent Control", "5-Star Global NCAP"]
      },
      {
        category: "Interior",
        items: ["8-inch Touchscreen", "Sony 3D Audio (12 Speakers)", "Dual Zone Climate Control", "Coffee Black Leatherette"]
      }
    ]
  },
  {
    id: "safari",
    brand: "Tata",
    model: "Safari Dark",
    slug: "tata-safari-dark",
    basePrice: "₹16.19 Lakh",
    topPrice: "₹27.34 Lakh",
    tagline: "Reclaim Your Life",
    description: "The flagship SUV from Tata Motors. The Safari Dark edition brings stealthy aesthetics, massive road presence, and unparalleled 3rd-row comfort.",
    heroImage: "/safari-dark-hero.jpg",
    specs: {
      engine: "2.0L Kryotec Turbo Diesel",
      power: "168 bhp",
      torque: "350 Nm",
      transmission: ["6-speed Manual", "6-speed Automatic"],
      drivetrain: "FWD"
    },
    dimensions: {
      length: "4668 mm",
      width: "1922 mm",
      height: "1795 mm",
      wheelbase: "2741 mm",
      bootSpace: "420 L (3rd row folded)",
      groundClearance: "200 mm"
    },
    features: [
      {
        category: "Safety",
        items: ["7 Airbags", "ADAS Level 2", "360-Degree Camera", "5-Star Bharat NCAP"]
      },
      {
        category: "Interior",
        items: ["12.3-inch Infotainment", "10-JBL Speaker System", "Ventilated 1st & 2nd Row Seats", "Panoramic Sunroof"]
      }
    ]
  },
  {
    id: "xuv7xo",
    brand: "Mahindra",
    model: "XUV 7XO",
    slug: "mahindra-xuv-7xo",
    basePrice: "₹14.00 Lakh",
    topPrice: "₹26.99 Lakh",
    tagline: "Unmatched Presence",
    description: "Command the road with advanced tech and uncompromising power. The XUV 7XO redefines the premium mid-size SUV segment.",
    heroImage: "/xuv-hero.jpg",
    specs: {
      engine: "2.0L Turbo Petrol / 2.2L Diesel",
      power: "197 bhp (Petrol) / 182 bhp (Diesel)",
      torque: "380 Nm (Petrol) / 450 Nm (Diesel)",
      transmission: ["6-speed Manual", "6-speed Automatic"],
      drivetrain: "FWD / AWD"
    },
    dimensions: {
      length: "4695 mm",
      width: "1890 mm",
      height: "1755 mm",
      wheelbase: "2750 mm",
      bootSpace: "420 L (3rd row folded)",
      groundClearance: "200 mm"
    },
    features: [
      {
        category: "Safety",
        items: ["7 Airbags", "ADAS Level 2", "Driver Drowsiness Alert"]
      },
      {
        category: "Interior",
        items: ["Dual 10.25-inch Screens", "AdrenoX Connected Car Tech", "Skyroof"]
      }
    ]
  },
  {
    id: "verna",
    brand: "Hyundai",
    model: "Verna",
    slug: "hyundai-verna",
    basePrice: "₹11.00 Lakh",
    topPrice: "₹17.42 Lakh",
    tagline: "Futuristic Elegance",
    description: "Aerodynamic precision and class-leading performance in a sleek sedan package. The new Verna completely changes the sedan landscape.",
    heroImage: "/verna-hero.jpg",
    specs: {
      engine: "1.5L MPi Petrol / 1.5L Turbo GDi Petrol",
      power: "113 bhp / 158 bhp",
      torque: "144 Nm / 253 Nm",
      transmission: ["6-speed Manual", "IVT", "7-speed DCT"],
      drivetrain: "FWD"
    },
    dimensions: {
      length: "4535 mm",
      width: "1765 mm",
      height: "1475 mm",
      wheelbase: "2670 mm",
      bootSpace: "528 L",
      groundClearance: "170 mm"
    },
    features: [
      {
        category: "Safety",
        items: ["6 Airbags standard", "Hyundai SmartSense Level 2 ADAS", "All Wheel Disc Brakes"]
      },
      {
        category: "Interior",
        items: ["Heated & Ventilated Front Seats", "Switchable Infotainment/Climate Controller", "Bose Premium Sound 8 Speaker"]
      }
    ]
  }
];

export function getCarBySlug(slug: string): CarDetails | undefined {
  return CAR_DATABASE.find(car => car.slug === slug);
}

export function searchCars(query: string): CarDetails[] {
  const q = query.toLowerCase();
  return CAR_DATABASE.filter(car => 
    car.brand.toLowerCase().includes(q) || 
    car.model.toLowerCase().includes(q)
  );
}
