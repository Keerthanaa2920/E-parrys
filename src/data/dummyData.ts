import type { IMarketplaceItem } from '../types/dashboard';

export const DUMMY_ORDERS: IMarketplaceItem[] = [
  {
    id: "SH-MP-001",
    productName: "Birla Chetak OPC 53 Cement",
    vendorName: "Birla Cement Hub",
    date: "2026-07-21",
    status: "pending",
    amount: 14250.00,
    priority: "high",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-8823901-MP",
    warehouse: "Chennai Main Yard",
    quantity: 350, // bags
    specGrade: "OPC 53 Grade"
  },
  {
    id: "SH-MP-002",
    productName: "Tata Tiscon TMT Steel Rebars",
    vendorName: "Tata Steel Distributors",
    date: "2026-07-20",
    status: "approved",
    amount: 87500.00,
    priority: "medium",
    category: "Steel & Reinforcement",
    stockStatus: "in-stock",
    sku: "SKU-1098234-MP",
    warehouse: "Visakhapatnam Depot",
    quantity: 15, // tonnes
    specGrade: "Fe 550D TMT"
  },
  {
    id: "SH-MP-003",
    productName: "Kajaria Vitrified Floor Tiles",
    vendorName: "Kajaria Tile Gallery",
    date: "2026-07-20",
    status: "review",
    amount: 23100.00,
    priority: "critical",
    category: "Ceramics & Flooring",
    stockStatus: "low-stock",
    sku: "SKU-9834211-MP",
    warehouse: "Mumbai South Godown",
    quantity: 600, // sq ft
    specGrade: "Double Charged 600x600"
  },
  {
    id: "SH-MP-004",
    productName: "Finolex 3-Core Copper Wire",
    vendorName: "Finolex Cables India",
    date: "2026-07-19",
    status: "approved",
    amount: 5289.00,
    priority: "low",
    category: "Electricals & Pipes",
    stockStatus: "in-stock",
    sku: "SKU-3342109-MP",
    warehouse: "Coimbatore Yard",
    quantity: 12, // coils
    specGrade: "1.5mm FR PVC 90m"
  },
  {
    id: "SH-MP-005",
    productName: "Asian Paints Apex Ultima White",
    vendorName: "Asian Paints Emporium",
    date: "2026-07-18",
    status: "cancelled",
    amount: 34500.00,
    priority: "high",
    category: "Paints & Wall Finishes",
    stockStatus: "out-of-stock",
    sku: "SKU-7483920-MP",
    warehouse: "Kolkata Hub",
    quantity: 0, // litres
    specGrade: "Exterior Emulsion 20L"
  },
  {
    id: "SH-MP-006",
    productName: "Ultratech Premium PPC Cement",
    vendorName: "Ultratech Cement Depot",
    date: "2026-07-18",
    status: "pending",
    amount: 6200.00,
    priority: "medium",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-4423019-MP",
    warehouse: "Bengaluru Yard",
    quantity: 150, // bags
    specGrade: "PPC Grade"
  },
  {
    id: "SH-MP-007",
    productName: "ACC Suraksha Power Cement",
    vendorName: "ACC Cement Agency",
    date: "2026-07-17",
    status: "approved",
    amount: 19800.00,
    priority: "critical",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-2289431-MP",
    warehouse: "Hyderabad Depot",
    quantity: 450, // bags
    specGrade: "OPC 43 Grade"
  },
  {
    id: "SH-MP-008",
    productName: "Jindal Panther TMT Steel Bars",
    vendorName: "Jindal Steel Depot",
    date: "2026-07-17",
    status: "pending",
    amount: 145000.00,
    priority: "high",
    category: "Steel & Reinforcement",
    stockStatus: "low-stock",
    sku: "SKU-1122334-MP",
    warehouse: "New Delhi Warehouse",
    quantity: 25, // tonnes
    specGrade: "Fe 500D TMT"
  },
  {
    id: "SH-MP-009",
    productName: "Red Clay Bricks Class I",
    vendorName: "Metro Brick Kiln",
    date: "2026-07-16",
    status: "approved",
    amount: 15400.00,
    priority: "medium",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-9082348-MP",
    warehouse: "Chennai Main Yard",
    quantity: 2000, // units
    specGrade: "Grade-A Solid Red"
  },
  {
    id: "SH-MP-010",
    productName: "Supreme PVC Conduit Pipes",
    vendorName: "Supreme Pipe Solutions",
    date: "2026-07-16",
    status: "review",
    amount: 4200.00,
    priority: "low",
    category: "Electricals & Pipes",
    stockStatus: "in-stock",
    sku: "SKU-7845129-MP",
    warehouse: "Bengaluru Yard",
    quantity: 80, // lengths
    specGrade: "20mm Heavy Duty 3m"
  },
  {
    id: "SH-MP-011",
    productName: "River Sand Fine Quality",
    vendorName: "River Sand Mining Corp",
    date: "2026-07-15",
    status: "approved",
    amount: 29800.00,
    priority: "medium",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-5566332-MP",
    warehouse: "Hyderabad Depot",
    quantity: 12, // brass
    specGrade: "Sieved River Sand"
  },
  {
    id: "SH-MP-012",
    productName: "Sail structural I-Beams",
    vendorName: "Sail Metal Depot",
    date: "2026-07-15",
    status: "pending",
    amount: 128500.00,
    priority: "high",
    category: "Steel & Reinforcement",
    stockStatus: "out-of-stock",
    sku: "SKU-3920192-MP",
    warehouse: "Mumbai South Godown",
    quantity: 0, // tonnes
    specGrade: "IS 2062 Structural Steel"
  },
  {
    id: "SH-MP-013",
    productName: "Somany Glazed Ceramic Tiles",
    vendorName: "Somany Ceramics World",
    date: "2026-07-14",
    status: "approved",
    amount: 5120.00,
    priority: "low",
    category: "Ceramics & Flooring",
    stockStatus: "in-stock",
    sku: "SKU-2244889-MP",
    warehouse: "Coimbatore Yard",
    quantity: 150, // boxes
    specGrade: "High Gloss 300x450"
  },
  {
    id: "SH-MP-014",
    productName: "Berger Weathercoat Smooth",
    vendorName: "Berger Paint Zone",
    date: "2026-07-14",
    status: "cancelled",
    amount: 17300.00,
    priority: "high",
    category: "Paints & Wall Finishes",
    stockStatus: "out-of-stock",
    sku: "SKU-9833441-MP",
    warehouse: "Visakhapatnam Depot",
    quantity: 0, // litres
    specGrade: "Exterior Emulsion 10L"
  },
  {
    id: "SH-MP-015",
    productName: "Astral CPVC Plumbing Pipes",
    vendorName: "Astral Pipe Center",
    date: "2026-07-13",
    status: "approved",
    amount: 32000.00,
    priority: "critical",
    category: "Electricals & Pipes",
    stockStatus: "in-stock",
    sku: "SKU-4930192-MP",
    warehouse: "New Delhi Warehouse",
    quantity: 120, // units
    specGrade: "1 inch CPVC SDR-11"
  },
  {
    id: "SH-MP-016",
    productName: "Coarse Blue Metal Aggregate 20mm",
    vendorName: "Parrys Crusher Supplies",
    date: "2026-07-13",
    status: "pending",
    amount: 17300.00,
    priority: "medium",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-9304859-MP",
    warehouse: "Visakhapatnam Depot",
    quantity: 5, // brass
    specGrade: "20mm Granite Blue Metal"
  },
  {
    id: "SH-MP-017",
    productName: "Havells 2.5 Sqmm Copper Cable",
    vendorName: "Havells Electrical Center",
    date: "2026-07-12",
    status: "approved",
    amount: 13200.00,
    priority: "high",
    category: "Electricals & Pipes",
    stockStatus: "in-stock",
    sku: "SKU-1029384-MP",
    warehouse: "Mumbai South Godown",
    quantity: 20, // coils
    specGrade: "Single Core HRFR 90m"
  },
  {
    id: "SH-MP-018",
    productName: "M-Sand (Manufactured Sand)",
    vendorName: "River Sand Mining Corp",
    date: "2026-07-12",
    status: "review",
    amount: 29500.00,
    priority: "medium",
    category: "Cement & Aggregates",
    stockStatus: "low-stock",
    sku: "SKU-3940192-MP",
    warehouse: "Chennai Main Yard",
    quantity: 8, // brass
    specGrade: "Plastering Quality M-Sand"
  },
  {
    id: "SH-MP-019",
    productName: "Vizag Steel TMT Bars",
    vendorName: "Vizag Steel Depot",
    date: "2026-07-11",
    status: "approved",
    amount: 114000.00,
    priority: "low",
    category: "Steel & Reinforcement",
    stockStatus: "in-stock",
    sku: "SKU-2299881-MP",
    warehouse: "Kolkata Hub",
    quantity: 20, // tonnes
    specGrade: "Fe 500 TMT"
  },
  {
    id: "SH-MP-020",
    productName: "Finolex PVC Sewerage Pipes",
    vendorName: "Finolex Cables India",
    date: "2026-07-11",
    status: "approved",
    amount: 26700.00,
    priority: "medium",
    category: "Electricals & Pipes",
    stockStatus: "in-stock",
    sku: "SKU-8349281-MP",
    warehouse: "Chennai Main Yard",
    quantity: 40, // lengths
    specGrade: "110px SWR Type-B 6m"
  },
  {
    id: "SH-MP-021",
    productName: "Jindal MS Structural Pipes",
    vendorName: "Jindal Steel Depot",
    date: "2026-07-10",
    status: "pending",
    amount: 38200.00,
    priority: "high",
    category: "Steel & Reinforcement",
    stockStatus: "in-stock",
    sku: "SKU-5819203-MP",
    warehouse: "Bengaluru Yard",
    quantity: 15, // tonnes
    specGrade: "Square Hollow Section 50mm"
  },
  {
    id: "SH-MP-022",
    productName: "Asian Paints Royale Luxury",
    vendorName: "Asian Paints Emporium",
    date: "2026-07-10",
    status: "approved",
    amount: 14500.00,
    priority: "medium",
    category: "Paints & Wall Finishes",
    stockStatus: "in-stock",
    sku: "SKU-8834910-MP",
    warehouse: "New Delhi Warehouse",
    quantity: 30, // litres
    specGrade: "Interior Emulsion Base A"
  },
  {
    id: "SH-MP-023",
    productName: "PolyCab 4 Sqmm Electric Wire",
    vendorName: "PolyCab wire Point",
    date: "2026-07-09",
    status: "review",
    amount: 12800.00,
    priority: "critical",
    category: "Electricals & Pipes",
    stockStatus: "out-of-stock",
    sku: "SKU-4910293-MP",
    warehouse: "Bengaluru Yard",
    quantity: 0, // coils
    specGrade: "FR-LSH Electric Wire 90m"
  },
  {
    id: "SH-MP-024",
    productName: "ACC Gold WaterShield Cement",
    vendorName: "ACC Cement Agency",
    date: "2026-07-09",
    status: "approved",
    amount: 22000.00,
    priority: "medium",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-1029482-MP",
    warehouse: "Mumbai South Godown",
    quantity: 400, // bags
    specGrade: "PPC Water Repellent"
  },
  {
    id: "SH-MP-025",
    productName: "Berger Weathercoat Glow",
    vendorName: "Berger Paint Zone",
    date: "2026-07-08",
    status: "pending",
    amount: 16700.00,
    priority: "high",
    category: "Paints & Wall Finishes",
    stockStatus: "in-stock",
    sku: "SKU-4820194-MP",
    warehouse: "Visakhapatnam Depot",
    quantity: 35, // litres
    specGrade: "Acrylic Exterior Paint 20L"
  },
  {
    id: "SH-MP-026",
    productName: "Sail Steel Angle Sections",
    vendorName: "Sail Metal Depot",
    date: "2026-07-08",
    status: "approved",
    amount: 41000.00,
    priority: "high",
    category: "Steel & Reinforcement",
    stockStatus: "in-stock",
    sku: "SKU-3940194-MP",
    warehouse: "Chennai Main Yard",
    quantity: 8, // tonnes
    specGrade: "MS Equal Angle 50x50x6"
  },
  {
    id: "SH-MP-027",
    productName: "Nitco Premium Marble Tiles",
    vendorName: "Nitco Ceramics Depot",
    date: "2026-07-07",
    status: "cancelled",
    amount: 11000.00,
    priority: "low",
    category: "Ceramics & Flooring",
    stockStatus: "out-of-stock",
    sku: "SKU-9834019-MP",
    warehouse: "Coimbatore Yard",
    quantity: 0, // sq ft
    specGrade: "Vitrified Silk 800x800"
  },
  {
    id: "SH-MP-028",
    productName: "Vizag MS Wire Rods 8mm",
    vendorName: "Vizag Steel Depot",
    date: "2026-07-07",
    status: "approved",
    amount: 65000.00,
    priority: "critical",
    category: "Steel & Reinforcement",
    stockStatus: "in-stock",
    sku: "SKU-3029102-MP",
    warehouse: "New Delhi Warehouse",
    quantity: 10, // tonnes
    specGrade: "Carbon Steel Wire Rods"
  },
  {
    id: "SH-MP-029",
    productName: "Dr. Fixit Pidiproof LW+",
    vendorName: "Parrys Crusher Supplies",
    date: "2026-07-06",
    status: "pending",
    amount: 9800.00,
    priority: "medium",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-8392019-MP",
    warehouse: "Kolkata Hub",
    quantity: 50, // cans
    specGrade: "Liquid Waterproofing 5L"
  },
  {
    id: "SH-MP-030",
    productName: "Birla Super PPC Cement",
    vendorName: "Birla Cement Hub",
    date: "2026-07-06",
    status: "approved",
    amount: 12500.00,
    priority: "low",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-4930193-MP",
    warehouse: "Hyderabad Depot",
    quantity: 280, // bags
    specGrade: "Flyash PPC Cement"
  },
  {
    id: "SH-MP-031",
    productName: "Kajaria Ceramic Wall Tiles",
    vendorName: "Kajaria Tile Gallery",
    date: "2026-07-05",
    status: "approved",
    amount: 4500.00,
    priority: "medium",
    category: "Ceramics & Flooring",
    stockStatus: "in-stock",
    sku: "SKU-9302912-MP",
    warehouse: "Bengaluru Yard",
    quantity: 120, // boxes
    specGrade: "Ceramic Digital 300x600"
  },
  {
    id: "SH-MP-032",
    productName: "Supreme CPVC Union Ball Valves",
    vendorName: "Supreme Pipe Solutions",
    date: "2026-07-05",
    status: "pending",
    amount: 18500.00,
    priority: "high",
    category: "Electricals & Pipes",
    stockStatus: "low-stock",
    sku: "SKU-3940120-MP",
    warehouse: "Mumbai South Godown",
    quantity: 15, // units
    specGrade: "2 inch CPVC Ball Valve"
  },
  {
    id: "SH-MP-033",
    productName: "Tata Wiron Binding Wire",
    vendorName: "Tata Steel Distributors",
    date: "2026-07-04",
    status: "approved",
    amount: 31000.00,
    priority: "high",
    category: "Steel & Reinforcement",
    stockStatus: "in-stock",
    sku: "SKU-4920199-MP",
    warehouse: "Kolkata Hub",
    quantity: 60, // bundles
    specGrade: "18 Gauge GI Binding Wire"
  },
  {
    id: "SH-MP-034",
    productName: "Asian Paints Tractor Emulsion",
    vendorName: "Asian Paints Emporium",
    date: "2026-07-04",
    status: "review",
    amount: 3200.00,
    priority: "low",
    category: "Paints & Wall Finishes",
    stockStatus: "in-stock",
    sku: "SKU-8834011-MP",
    warehouse: "Coimbatore Yard",
    quantity: 15, // cans
    specGrade: "Interior Acrylic Paint 10L"
  },
  {
    id: "SH-MP-035",
    productName: "ACC Concrete Plus Cement",
    vendorName: "ACC Cement Agency",
    date: "2026-07-03",
    status: "approved",
    amount: 27400.00,
    priority: "medium",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-1092039-MP",
    warehouse: "New Delhi Warehouse",
    quantity: 600, // bags
    specGrade: "High Early Strength PPC"
  },
  {
    id: "SH-MP-036",
    productName: "Jindal TMT Rebars 8mm",
    vendorName: "Jindal Steel Depot",
    date: "2026-07-03",
    status: "pending",
    amount: 112000.00,
    priority: "medium",
    category: "Steel & Reinforcement",
    stockStatus: "in-stock",
    sku: "SKU-3920194-MP",
    warehouse: "Chennai Main Yard",
    quantity: 18, // tonnes
    specGrade: "Fe 550D Thermo-TMT"
  },
  {
    id: "SH-MP-037",
    productName: "Havells MCB 16A Single Pole",
    vendorName: "Havells Electrical Center",
    date: "2026-07-02",
    status: "approved",
    amount: 5800.00,
    priority: "low",
    category: "Electricals & Pipes",
    stockStatus: "in-stock",
    sku: "SKU-4930199-MP",
    warehouse: "Visakhapatnam Depot",
    quantity: 40, // units
    specGrade: "16A C-Curve 10kA MCB"
  },
  {
    id: "SH-MP-038",
    productName: "Somany Glazed Vitrified Tiles",
    vendorName: "Somany Ceramics World",
    date: "2026-07-02",
    status: "cancelled",
    amount: 19500.00,
    priority: "high",
    category: "Ceramics & Flooring",
    stockStatus: "out-of-stock",
    sku: "SKU-1029481-MP",
    warehouse: "Mumbai South Godown",
    quantity: 0, // sq ft
    specGrade: "Polished Glazed Vitrified"
  },
  {
    id: "SH-MP-039",
    productName: "Berger Weathercoat Anti-Dust",
    vendorName: "Berger Paint Zone",
    date: "2026-07-01",
    status: "approved",
    amount: 15300.00,
    priority: "high",
    category: "Paints & Wall Finishes",
    stockStatus: "in-stock",
    sku: "SKU-3920121-MP",
    warehouse: "Hyderabad Depot",
    quantity: 25, // cans
    specGrade: "Exterior Paint Base B 20L"
  },
  {
    id: "SH-MP-040",
    productName: "Ultratech Weather Plus Cement",
    vendorName: "Ultratech Cement Depot",
    date: "2026-07-01",
    status: "pending",
    amount: 47000.00,
    priority: "critical",
    category: "Cement & Aggregates",
    stockStatus: "low-stock",
    sku: "SKU-9034829-MP",
    warehouse: "Kolkata Hub",
    quantity: 100, // bags
    specGrade: "Water Proofing Grade PPC"
  },
  {
    id: "SH-MP-041",
    productName: "Vizag Steel Channels",
    vendorName: "Vizag Steel Depot",
    date: "2026-06-30",
    status: "approved",
    amount: 58000.00,
    priority: "high",
    category: "Steel & Reinforcement",
    stockStatus: "in-stock",
    sku: "SKU-9830492-MP",
    warehouse: "Visakhapatnam Depot",
    quantity: 10, // tonnes
    specGrade: "MS MC-150 Channel 6m"
  },
  {
    id: "SH-MP-042",
    productName: "Kajaria Vitrified Matt Tiles",
    vendorName: "Kajaria Tile Gallery",
    date: "2026-06-30",
    status: "approved",
    amount: 8300.00,
    priority: "medium",
    category: "Ceramics & Flooring",
    stockStatus: "in-stock",
    sku: "SKU-4930291-MP",
    warehouse: "Coimbatore Yard",
    quantity: 200, // sq ft
    specGrade: "Antiskid Matt 600x600"
  },
  {
    id: "SH-MP-043",
    productName: "PolyCab PVC Conduit Pipe 25mm",
    vendorName: "PolyCab wire Point",
    date: "2026-06-29",
    status: "review",
    amount: 6900.00,
    priority: "low",
    category: "Electricals & Pipes",
    stockStatus: "in-stock",
    sku: "SKU-8834928-MP",
    warehouse: "Bengaluru Yard",
    quantity: 150, // lengths
    specGrade: "Heavy Duty FRLS Conduit"
  },
  {
    id: "SH-MP-044",
    productName: "Dr. Fixit Super Latex",
    vendorName: "Parrys Crusher Supplies",
    date: "2026-06-29",
    status: "approved",
    amount: 3900.00,
    priority: "low",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-1092049-MP",
    warehouse: "Chennai Main Yard",
    quantity: 20, // cans
    specGrade: "SBR Latex modifier 5kg"
  },
  {
    id: "SH-MP-045",
    productName: "Sail Steel Plates 10mm",
    vendorName: "Sail Metal Depot",
    date: "2026-06-28",
    status: "pending",
    amount: 22800.00,
    priority: "medium",
    category: "Steel & Reinforcement",
    stockStatus: "in-stock",
    sku: "SKU-4920194-MP",
    warehouse: "New Delhi Warehouse",
    quantity: 4, // tonnes
    specGrade: "IS 2062 Grade Plate"
  },
  {
    id: "SH-MP-046",
    productName: "Asian Paints Apex Ultima Crimson",
    vendorName: "Asian Paints Emporium",
    date: "2026-06-28",
    status: "approved",
    amount: 14900.00,
    priority: "high",
    category: "Paints & Wall Finishes",
    stockStatus: "in-stock",
    sku: "SKU-9830491-MP",
    warehouse: "Mumbai South Godown",
    quantity: 8, // cans
    specGrade: "Exterior Glossy Paint 10L"
  },
  {
    id: "SH-MP-047",
    productName: " ACC Gold WaterShield Cement",
    vendorName: "ACC Cement Agency",
    date: "2026-06-27",
    status: "approved",
    amount: 32000.00,
    priority: "critical",
    category: "Cement & Aggregates",
    stockStatus: "in-stock",
    sku: "SKU-4930294-MP",
    warehouse: "Chennai Main Yard",
    quantity: 700, // bags
    specGrade: "WaterShield OPC 53"
  },
  {
    id: "SH-MP-048",
    productName: "Berger Weathercoat Silk Smooth",
    vendorName: "Berger Paint Zone",
    date: "2026-06-27",
    status: "cancelled",
    amount: 24500.00,
    priority: "medium",
    category: "Paints & Wall Finishes",
    stockStatus: "out-of-stock",
    sku: "SKU-8834912-MP",
    warehouse: "Hyderabad Depot",
    quantity: 0, // litres
    specGrade: "Silk Luxury exterior 20L"
  },
  {
    id: "SH-MP-049",
    productName: "Somany Polished Floor Tiles",
    vendorName: "Somany Ceramics World",
    date: "2026-06-26",
    status: "pending",
    amount: 18100.00,
    priority: "high",
    category: "Ceramics & Flooring",
    stockStatus: "low-stock",
    sku: "SKU-4920191-MP",
    warehouse: "Visakhapatnam Depot",
    quantity: 350, // sq ft
    specGrade: "Super Glossy 800x800"
  },
  {
    id: "SH-MP-050",
    productName: "Jindal Panther MS Rods 10mm",
    vendorName: "Jindal Steel Depot",
    date: "2026-06-26",
    status: "approved",
    amount: 36700.00,
    priority: "critical",
    category: "Steel & Reinforcement",
    stockStatus: "in-stock",
    sku: "SKU-9304910-MP",
    warehouse: "Mumbai South Godown",
    quantity: 6, // tonnes
    specGrade: "Fe 550D structural rod"
  }
];

export const CATEGORIES = [
  "All Categories",
  "Cement & Aggregates",
  "Steel & Reinforcement",
  "Ceramics & Flooring",
  "Electricals & Pipes",
  "Paints & Wall Finishes"
];

export const PRIORITIES = ["All Priorities", "low", "medium", "high", "critical"];
export const STATUSES = ["All Statuses", "approved", "pending", "review", "cancelled"];
export const STOCK_STATUSES = ["All Stock States", "in-stock", "low-stock", "out-of-stock"];

export const MOCK_METRICS = [
  {
    title: "Marketplace Material Vol.",
    value: "420,500 Units",
    change: 14.8,
    changeType: "increase" as const,
    icon: "FiBox",
    subtext: "vs. 366,320 Units last month",
    trendData: [45, 52, 49, 62, 58, 65, 72]
  },
  {
    title: "In-Stock SLA Ratio",
    value: "91.8%",
    change: 1.2,
    changeType: "increase" as const,
    icon: "FiCheckCircle",
    subtext: "Target rate: 95.0%",
    trendData: [90.5, 91.2, 91.0, 91.8, 92.0, 92.1, 92.4]
  },
  {
    title: "Total Listings Value",
    value: "₹24.84 Lakh",
    change: -4.3,
    changeType: "decrease" as const,
    icon: "FiCreditCard",
    subtext: "vs. ₹26.28 Lakh last month",
    trendData: [110, 108, 105, 101, 98, 100, 98.4]
  },
  {
    title: "Unresolved Material Audits",
    value: "6 Listings",
    change: 0,
    changeType: "neutral" as const,
    icon: "FiAlertTriangle",
    subtext: "4 reviews, 2 flag alerts",
    trendData: [4, 6, 5, 5, 7, 5, 5]
  }
];
export const SLA_STATUSES = STOCK_STATUSES; // Fallback alias
