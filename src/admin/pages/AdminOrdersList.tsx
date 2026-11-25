import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Filter, Eye, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { ordersService } from '../../services/ordersService';
import { Order, OrderStatus } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { useToast } from '../../contexts/ToastContext';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const AdminOrdersList: React.FC = () => {
  const { success, error } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true);
      try {
        const list = await ordersService.getAllAdminOrders();
        setOrders(list);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await ordersService.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      success(`Updated order status to ${newStatus}`);
    } catch {
      error('Failed to update status');
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = statusFilter === 'all' || o.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        searchQuery === '' ||
        o.order_number.toLowerCase().includes(q) ||
        (o.shipping_address?.fullName && o.shipping_address.fullName.toLowerCase().includes(q)) ||
        (o.guest_email && o.guest_email.toLowerCase().includes(q)) ||
        (o.shipping_address?.city && o.shipping_address.city.toLowerCase().includes(q));
      return matchStatus && matchSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  if (isLoading) {
    return <LoadingSpinner label="Loading consignment records..." />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7356] font-mono">
            DISPATCH & FULFILLMENT
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#30231F] mt-1">
            Consignment Orders ({orders.length})
          </h1>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#B69B7D]/45 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#8E7356] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by docket number, recipient name, city, email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] placeholder-[#8E7356]/70 focus:outline-none focus:border-[#C87552]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#C87552] shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] focus:outline-none focus:border-[#C87552] cursor-pointer capitalize"
          >
            <option value="all">All Statuses</option>
            <option value="placed">Placed</option>
            <option value="confirmed">Confirmed</option>
            <option value="crafting">Crafting & Curing</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#B69B7D]/45 rounded-2xl overflow-hidden shadow-sm">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#8E7356]">
            No matching orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#56443E]">
              <thead className="uppercase tracking-wider text-[10px] text-[#8E7356] bg-[#F9F5EE] border-b border-[#B69B7D]/30">
                <tr>
                  <th className="py-3.5 px-4">Docket #</th>
                  <th className="py-3.5 px-4">Patron / Recipient</th>
                  <th className="py-3.5 px-4">Destination</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Investment</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Order Status</th>
                  <th className="py-3.5 px-4 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B69B7D]/25">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F9F5EE] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#30231F]">
                      {ord.order_number}
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#30231F]">
                        {ord.shipping_address?.fullName || ord.guest_name || 'Valued Patron'}
                      </p>
                      <p className="text-[10px] text-[#8E7356]">{ord.guest_email || '—'}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[#56443E]">
                        {ord.shipping_address?.city}, {ord.shipping_address?.state}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#56443E]">
                      {formatDate(ord.created_at)}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-[#30231F] font-display">
                      {formatCurrency(ord.total_amount)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          ord.payment_status === 'paid'
                            ? 'bg-[#EEF5EF] text-[#2F5A39] border border-[#B8D4BE]'
                            : 'bg-[#F4EBDD] text-[#8E7356] border border-[#B69B7D]/50'
                        }`}
                      >
                        {ord.payment_method} ({ord.payment_status})
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                        className="px-2.5 py-1 rounded-lg bg-[#F9F5EE] border border-[#B69B7D]/50 text-[11px] font-semibold text-[#30231F] focus:outline-none focus:border-[#C87552] cursor-pointer capitalize"
                      >
                        <option value="placed">Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="crafting">Crafting & Curing</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/orders/${ord.id}`}
                        className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-[#F9F5EE] text-[#30231F] hover:bg-[#C87552] hover:text-white border border-[#B69B7D]/50 transition-colors"
                        title="View Detailed Docket"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

