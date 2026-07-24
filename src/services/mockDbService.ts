import type { IMarketplaceItem } from '../types/dashboard';
import { DUMMY_ORDERS } from '../data/dummyData';

export interface IEnquiry {
  id: string;
  productId: string;
  productName: string;
  vendorName: string;
  senderName: string;
  senderEmail: string;
  quantity: number;
  message: string;
  date: string;
}

export interface IMarketplaceOrder {
  id: string;
  productId: string;
  productName: string;
  vendorName: string;
  buyerName: string;
  quantity: number;
  amount: number;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}

export interface IVendorOnboardingRequest {
  id: string;
  officerName: string;
  email: string;
  phone: string;
  companyName: string;
  businessStructure: string;
  gstin: string;
  panNumber?: string;
  yearEstablished: string;
  state: string;
  city: string;
  pincode: string;
  serviceAreas: string;
  sourcingSectors: string[];
  gstCertFile?: string;
  businessRegFile?: string;
  logoFile?: string;
  catalogueFile?: string;
  status: 'pending' | 'approved' | 'rejected';
  dateSubmitted: string;
  approvedDate?: string;
  generatedPassword?: string;
  rejectionReason?: string;
}

class MockDbService {
  private productsKey = 'eparrys_marketplace_products';
  private enquiriesKey = 'eparrys_marketplace_enquiries';
  private ordersKey = 'eparrys_marketplace_orders';
  private vendorRequestsKey = 'eparrys_vendor_onboarding_requests';

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (!localStorage.getItem(this.productsKey)) {
        localStorage.setItem(this.productsKey, JSON.stringify(DUMMY_ORDERS));
      }
    } catch {
      // Ignore storage error
    }

    try {
      if (!localStorage.getItem(this.enquiriesKey)) {
        const initialEnquiries: IEnquiry[] = [
          {
            id: "ENQ-101",
            productId: "SH-MP-001",
            productName: "Birla Chetak OPC 53 Cement",
            vendorName: "Birla Cement Hub",
            senderName: "Apex Builders Group",
            senderEmail: "procure@apexbuilders.com",
            quantity: 500,
            message: "Requesting quote for 500 bags of OPC 53 to Chennai site.",
            date: "2026-07-21"
          },
          {
            id: "ENQ-102",
            productId: "SH-MP-003",
            productName: "Kajaria Vitrified Floor Tiles",
            vendorName: "Kajaria Tile Gallery",
            senderName: "L&T Constructions",
            senderEmail: "materials@lntecc.com",
            quantity: 2000,
            message: "Need price details for 2000 sq ft double charged tiles.",
            date: "2026-07-20"
          }
        ];
        localStorage.setItem(this.enquiriesKey, JSON.stringify(initialEnquiries));
      }
    } catch {
      // Ignore storage error
    }

    try {
      if (!localStorage.getItem(this.ordersKey)) {
        const initialOrders: IMarketplaceOrder[] = [
          {
            id: "ORD-201",
            productId: "SH-MP-002",
            productName: "Tata Tiscon TMT Steel Rebars",
            vendorName: "Tata Steel Distributors",
            buyerName: "GMR Infrastructure",
            quantity: 5,
            amount: 29250.00,
            date: "2026-07-19",
            status: 'shipped'
          },
          {
            id: "ORD-202",
            productId: "SH-MP-004",
            productName: "Finolex 3-Core Copper Wire",
            vendorName: "Finolex Cables India",
            buyerName: "Elite Food Products",
            quantity: 10,
            amount: 4400.00,
            date: "2026-07-18",
            status: 'delivered'
          }
        ];
        localStorage.setItem(this.ordersKey, JSON.stringify(initialOrders));
      }
    } catch {
      // Ignore storage error
    }

    try {
      if (!localStorage.getItem(this.vendorRequestsKey)) {
        const initialVendorRequests: IVendorOnboardingRequest[] = [
          {
            id: "VND-REQ-101",
            officerName: "Suresh Kumar",
            email: "sales@tatasteelcorp.com",
            phone: "9876543210",
            companyName: "Tata Steel Wholesale Depot",
            businessStructure: "Wholesaler Depot",
            gstin: "33AAACB1234C1Z8",
            panNumber: "ABCDE1234F",
            yearEstablished: "1998",
            state: "Karnataka",
            city: "Bangalore",
            pincode: "560001",
            serviceAreas: "Bangalore Urban, Chennai Ring Road, Mysore Sourcing Depots",
            sourcingSectors: ["Steel", "Hardware", "Tools"],
            gstCertFile: "GSTIN_Audit_Cert_TataSteel.pdf",
            businessRegFile: "MSME_License_TataSteel.pdf",
            logoFile: "TataSteel_Logo.png",
            catalogueFile: "Catalogue_2026_TataSteel.pdf",
            status: "pending",
            dateSubmitted: "2026-07-23"
          },
          {
            id: "VND-REQ-102",
            officerName: "Ramesh Sharma",
            email: "procurement@ultratechdepot.in",
            phone: "9840198765",
            companyName: "UltraTech Cement Regional Yard",
            businessStructure: "Manufacturer Brand",
            gstin: "33BBBCB5678D1Z4",
            panNumber: "BCDEF5678G",
            yearEstablished: "2005",
            state: "Tamil Nadu",
            city: "Chennai",
            pincode: "600001",
            serviceAreas: "Chennai Metro, Kanchipuram, Tiruvallur, Chengalpattu",
            sourcingSectors: ["Cement", "Sand"],
            gstCertFile: "UltraTech_GSTIN_Certificate.pdf",
            businessRegFile: "UltraTech_Incorporation_Cert.pdf",
            logoFile: "UltraTech_Logo.png",
            status: "approved",
            dateSubmitted: "2026-07-21",
            approvedDate: "2026-07-22",
            generatedPassword: "UltraTech@Vendor2026"
          }
        ];
        localStorage.setItem(this.vendorRequestsKey, JSON.stringify(initialVendorRequests));
      }
    } catch {
      // Ignore storage error
    }
  }

  // Product Operations
  getProducts(): IMarketplaceItem[] {
    try {
      const data = localStorage.getItem(this.productsKey);
      return data ? JSON.parse(data) : DUMMY_ORDERS;
    } catch {
      return DUMMY_ORDERS;
    }
  }

  saveProducts(products: IMarketplaceItem[]) {
    try {
      localStorage.setItem(this.productsKey, JSON.stringify(products));
    } catch {
      // Ignore
    }
  }

  updateProduct(updated: IMarketplaceItem) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      products[index] = updated;
      this.saveProducts(products);
    }
  }

  addProduct(product: IMarketplaceItem) {
    const products = this.getProducts();
    products.unshift(product);
    this.saveProducts(products);
  }

  // Enquiry Operations
  getEnquiries(): IEnquiry[] {
    try {
      const data = localStorage.getItem(this.enquiriesKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addEnquiry(enquiry: Omit<IEnquiry, 'id' | 'date'>) {
    const enquiries = this.getEnquiries();
    const newEnq: IEnquiry = {
      ...enquiry,
      id: `ENQ-${enquiries.length + 101}`,
      date: new Date().toISOString().split('T')[0]
    };
    enquiries.unshift(newEnq);
    try {
      localStorage.setItem(this.enquiriesKey, JSON.stringify(enquiries));
    } catch {
      // Ignore
    }
    return newEnq;
  }

  // Order Operations
  getOrders(): IMarketplaceOrder[] {
    try {
      const data = localStorage.getItem(this.ordersKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addOrder(order: Omit<IMarketplaceOrder, 'id' | 'date' | 'status'>) {
    const orders = this.getOrders();
    const newOrder: IMarketplaceOrder = {
      ...order,
      id: `ORD-${orders.length + 201}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    orders.unshift(newOrder);
    try {
      localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    } catch {
      // Ignore
    }
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: IMarketplaceOrder['status']) {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      try {
        localStorage.setItem(this.ordersKey, JSON.stringify(orders));
      } catch {
        // Ignore
      }
    }
  }

  // Vendor Onboarding Request Operations
  getVendorRequests(): IVendorOnboardingRequest[] {
    try {
      const data = localStorage.getItem(this.vendorRequestsKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addVendorRequest(req: Omit<IVendorOnboardingRequest, 'id' | 'status' | 'dateSubmitted'>) {
    const requests = this.getVendorRequests();
    const newReq: IVendorOnboardingRequest = {
      ...req,
      id: `VND-REQ-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0]
    };
    requests.unshift(newReq);
    try {
      localStorage.setItem(this.vendorRequestsKey, JSON.stringify(requests));
    } catch {
      // Ignore
    }
    return newReq;
  }

  updateVendorRequestStatus(requestId: string, status: 'approved' | 'rejected', password?: string, reason?: string) {
    const requests = this.getVendorRequests();
    const index = requests.findIndex(r => r.id === requestId);
    if (index !== -1) {
      requests[index].status = status;
      if (status === 'approved') {
        requests[index].approvedDate = new Date().toISOString().split('T')[0];
        requests[index].generatedPassword = password || `ParrysVendor#${Math.floor(1000 + Math.random() * 9000)}`;
      } else if (reason) {
        requests[index].rejectionReason = reason;
      }
      try {
        localStorage.setItem(this.vendorRequestsKey, JSON.stringify(requests));
      } catch {
        // Ignore
      }
      return requests[index];
    }
    return null;
  }

  // Reset database helper
  resetDb() {
    try {
      localStorage.removeItem(this.productsKey);
      localStorage.removeItem(this.enquiriesKey);
      localStorage.removeItem(this.ordersKey);
      localStorage.removeItem(this.vendorRequestsKey);
    } catch {
      // Ignore
    }
    this.init();
  }
}

export const mockDbService = new MockDbService();
