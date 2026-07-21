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

class MockDbService {
  private productsKey = 'eparrys_marketplace_products';
  private enquiriesKey = 'eparrys_marketplace_enquiries';
  private ordersKey = 'eparrys_marketplace_orders';

  constructor() {
    this.init();
  }

  private init() {
    if (!localStorage.getItem(this.productsKey)) {
      localStorage.setItem(this.productsKey, JSON.stringify(DUMMY_ORDERS));
    }
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
  }

  // Product Operations
  getProducts(): IMarketplaceItem[] {
    return JSON.parse(localStorage.getItem(this.productsKey) || '[]');
  }

  saveProducts(products: IMarketplaceItem[]) {
    localStorage.setItem(this.productsKey, JSON.stringify(products));
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
    return JSON.parse(localStorage.getItem(this.enquiriesKey) || '[]');
  }

  addEnquiry(enquiry: Omit<IEnquiry, 'id' | 'date'>) {
    const enquiries = this.getEnquiries();
    const newEnq: IEnquiry = {
      ...enquiry,
      id: `ENQ-${enquiries.length + 101}`,
      date: new Date().toISOString().split('T')[0]
    };
    enquiries.unshift(newEnq);
    localStorage.setItem(this.enquiriesKey, JSON.stringify(enquiries));
    return newEnq;
  }

  // Order Operations
  getOrders(): IMarketplaceOrder[] {
    return JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
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
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: IMarketplaceOrder['status']) {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    }
  }

  // Reset database helper
  resetDb() {
    localStorage.removeItem(this.productsKey);
    localStorage.removeItem(this.enquiriesKey);
    localStorage.removeItem(this.ordersKey);
    this.init();
  }
}

export const mockDbService = new MockDbService();
