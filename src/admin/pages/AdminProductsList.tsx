import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  PlusCircle,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  Check,
} from 'lucide-react';
import { productsService } from '../../services/productsService';
import { Product, Category } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { useToast } from '../../contexts/ToastContext';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const AdminProductsList: React.FC = () => {
  const { success, error } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [prods, cats] = await Promise.all([
          productsService.getAllAdminProducts(),
          productsService.getCategories(),
        ]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category_slug === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category_name && p.category_name.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleToggleActive = async (id: string, currentVal: boolean) => {
    try {
      await productsService.toggleProductField(id, 'is_active', !currentVal);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_active: !currentVal } : p))
      );
      success(`Updated product visibility`);
    } catch {
      error('Failed to update visibility');
    }
  };

  const handleToggleFeatured = async (id: string, currentVal: boolean) => {
    try {
      await productsService.toggleProductField(id, 'is_featured', !currentVal);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_featured: !currentVal } : p))
      );
      success(`Updated featured status`);
    } catch {
      error('Failed to update featured status');
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await productsService.deleteProduct(productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      success(`Deleted "${productToDelete.name}" from catalog`);
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err: any) {
      error(err.message || 'Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner label="Loading catalog directory..." />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7356] font-mono">
            INVENTORY & ARTWORK REGISTRY
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#30231F] mt-1">
            Product Management ({products.length})
          </h1>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C87552] hover:bg-[#B05E3D] text-white font-display text-xs font-bold uppercase tracking-wider transition-all shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#B69B7D]/45 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#8E7356] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, SKU, or keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] placeholder-[#8E7356]/70 focus:outline-none focus:border-[#C87552]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#C87552] shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] focus:outline-none focus:border-[#C87552] cursor-pointer"
          >
            <option value="all">All Disciplines</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#B69B7D]/45 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#56443E]">
            <thead className="uppercase tracking-wider text-[10px] text-[#8E7356] bg-[#F9F5EE] border-b border-[#B69B7D]/30">
              <tr>
                <th className="py-3.5 px-4">Artwork</th>
                <th className="py-3.5 px-4">Discipline</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-center">Active</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B69B7D]/25">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#F9F5EE] transition-colors">
                  {/* Artwork Image & Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover bg-[#F9F5EE] border border-[#B69B7D]/40 shrink-0"
                      />
                      <div className="max-w-xs">
                        <span className="font-bold text-[#30231F] line-clamp-1 block">{p.name}</span>
                        <span className="text-[10px] text-[#8E7356] font-mono">SKU: {p.sku}</span>
                      </div>
                    </div>
                  </td>

                  {/* Discipline */}
                  <td className="py-3 px-4">
                    <span className="text-[11px] text-[#56443E]">{p.category_name}</span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#30231F] font-display text-sm">
                      {formatCurrency(p.price)}
                    </span>
                    {p.compare_at_price && (
                      <span className="block text-[10px] text-[#8E7356] line-through">
                        {formatCurrency(p.compare_at_price)}
                      </span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.stock > 5
                          ? 'bg-[#EEF5EF] text-[#2F5A39] border border-[#B8D4BE]'
                          : p.stock > 0
                          ? 'bg-[#F4EBDD] text-[#8E7356] border border-[#B69B7D]/50'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {p.stock > 0 ? `${p.stock} units` : 'Out of stock'}
                    </span>
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(p.id, p.is_featured)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        p.is_featured
                          ? 'bg-[#C87552]/15 text-[#B05E3D] border border-[#C87552]'
                          : 'text-[#8E7356] hover:text-[#30231F]'
                      }`}
                      title={p.is_featured ? 'Featured on homepage' : 'Not featured'}
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </td>

                  {/* Active Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleActive(p.id, p.is_active)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        p.is_active
                          ? 'text-[#2F6846] hover:text-[#214C32]'
                          : 'text-[#8E7356]/60 hover:text-[#30231F]'
                      }`}
                      title={p.is_active ? 'Live on storefront' : 'Hidden from storefront'}
                    >
                      {p.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/products/${p.id}/edit`}
                        className="p-1.5 rounded-lg bg-[#F9F5EE] text-[#56443E] hover:text-[#C87552] border border-[#B69B7D]/45"
                        title="Edit Artwork"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => {
                          setProductToDelete(p);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-[#F9F5EE] text-[#8E7356] hover:text-red-600 border border-[#B69B7D]/45"
                        title="Delete Artwork"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDeleteModalOpen(false)}
          />
          <div className="relative bg-white border border-red-300 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 text-[#30231F]">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Delete Artwork?</h3>
            <p className="text-xs text-[#56443E] leading-relaxed mb-6">
              Are you sure you want to delete <strong className="text-[#30231F]">"{productToDelete.name}"</strong>? This action cannot be reversed and will remove the item from all catalogs.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#B69B7D]/60 text-xs font-semibold text-[#30231F] hover:bg-[#F9F5EE]"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Artwork'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

