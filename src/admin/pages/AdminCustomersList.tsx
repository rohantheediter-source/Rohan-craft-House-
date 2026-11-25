import React, { useEffect, useState } from 'react';
import { Users, Mail, Phone, Calendar, ShoppingBag, Search } from 'lucide-react';
import { ordersService } from '../../services/ordersService';
import { Order } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

interface CustomerSummary {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

export const AdminCustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function compileCustomers() {
      setIsLoading(true);
      try {
        const orders = await ordersService.getAllAdminOrders();
        const map = new Map<string, CustomerSummary>();

        orders.forEach((o) => {
          const key = o.user_id || o.guest_email || 'guest';
          const name = o.shipping_address?.fullName || o.guest_name || 'Collector';
          const email = o.guest_email || '—';
          const phone = o.shipping_address?.phone || o.guest_phone || '—';
          const city = o.shipping_address?.city || '—';

          if (!map.has(key)) {
            map.set(key, {
              id: key,
              name,
              email,
              phone,
              city,
              orderCount: 1,
              totalSpent: o.total_amount,
              lastOrderDate: o.created_at,
            });
          } else {
            const existing = map.get(key)!;
            existing.orderCount += 1;
            existing.totalSpent += o.total_amount;
            if (new Date(o.created_at) > new Date(existing.lastOrderDate)) {
              existing.lastOrderDate = o.created_at;
            }
          }
        });

        // Add standard seed patrons for visualization if empty
        if (map.size === 0) {
          map.set('patron-1', {
            id: 'patron-1',
            name: 'Dr. Siddharth Verma',
            email: 'siddharth.verma@example.com',
            phone: '+91 98110 44521',
            city: 'New Delhi',
            orderCount: 2,
            totalSpent: 14498,
            lastOrderDate: '2026-11-04T12:00:00Z',
          });
          map.set('patron-2', {
            id: 'patron-2',
            name: 'Ananya Mehta',
            email: 'ananya.mehta@example.com',
            phone: '+91 98200 12345',
            city: 'Mumbai',
            orderCount: 1,
            totalSpent: 6999,
            lastOrderDate: '2026-11-06T14:30:00Z',
          });
          map.set('patron-3', {
            id: 'patron-3',
            name: 'Priyanka Sen',
            email: 'priyanka.sen@example.com',
            phone: '+91 98311 98765',
            city: 'Kolkata',
            orderCount: 1,
            totalSpent: 2899,
            lastOrderDate: '2026-11-08T09:15:00Z',
          });
        }

        setCustomers(Array.from(map.values()));
      } catch (err) {
        console.error('Error compiling customers:', err);
      } finally {
        setIsLoading(false);
      }
    }
    compileCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner label="Accessing patron directory..." />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7356] font-mono">
            PATRON DIRECTORY
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#30231F] mt-1">
            Registered Patrons & Collectors ({customers.length})
          </h1>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-[#B69B7D]/45 shadow-sm">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#8E7356] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patron by name, email, or city..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] placeholder-[#8E7356]/70 focus:outline-none focus:border-[#C87552]"
          />
        </div>
      </div>

      {/* Patrons Table */}
      <div className="bg-white border border-[#B69B7D]/45 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#56443E]">
            <thead className="uppercase tracking-wider text-[10px] text-[#8E7356] bg-[#F9F5EE] border-b border-[#B69B7D]/30">
              <tr>
                <th className="py-3.5 px-4">Patron Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">City</th>
                <th className="py-3.5 px-4 text-center">Consignments</th>
                <th className="py-3.5 px-4 text-right">Lifetime Patronage</th>
                <th className="py-3.5 px-4 text-right">Latest Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B69B7D]/25">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#F9F5EE] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#30231F] flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#30231F] border border-[#B69B7D]/60 flex items-center justify-center text-[10px] text-[#F4EBDD]">
                      {c.name[0].toUpperCase()}
                    </div>
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#56443E]">{c.email}</td>
                  <td className="py-3.5 px-4 text-[#56443E]">{c.phone}</td>
                  <td className="py-3.5 px-4 text-[#56443E]">{c.city}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F9F5EE] border border-[#B69B7D]/50 text-[10px] font-bold text-[#30231F]">
                      {c.orderCount}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-display font-bold text-[#30231F]">
                    {formatCurrency(c.totalSpent)}
                  </td>
                  <td className="py-3.5 px-4 text-right text-[#8E7356]">
                    {formatDate(c.lastOrderDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

