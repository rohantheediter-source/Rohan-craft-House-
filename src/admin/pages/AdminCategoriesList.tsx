import React, { useEffect, useState } from 'react';
import { Tag, Plus, Check, ArrowRight } from 'lucide-react';
import { productsService } from '../../services/productsService';
import { Category, Product } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const AdminCategoriesList: React.FC = () => {
  const { success, error } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [cats, prods] = await Promise.all([
          productsService.getCategories(),
          productsService.getAllAdminProducts(),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
    );
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      error('Please enter category name and slug');
      return;
    }

    setIsSubmitting(true);
    const newCat: Category = {
      id: crypto.randomUUID(),
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      image_url: imageUrl.trim() || '/images/products/da818ee20766a8244b4a924dd001d4c1.png',
      is_featured: true,
      display_order: categories.length + 1,
    };

    setCategories((prev) => [...prev, newCat]);
    success(`Artisan discipline "${newCat.name}" added to catalog`);
    setModalOpen(false);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('');
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <LoadingSpinner label="Loading disciplines registry..." />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7356] font-mono">
            COLLECTION TAXONOMY
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#30231F] mt-1">
            Artisan Disciplines & Categories ({categories.length})
          </h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C87552] hover:bg-[#B05E3D] text-white font-display text-xs font-bold uppercase tracking-wider transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const count = products.filter((p) => p.category_slug === cat.slug).length;
          return (
            <div
              key={cat.id}
              className="bg-white border border-[#B69B7D]/45 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#30231F]/90 border border-[#B69B7D]/50 text-[10px] font-bold text-[#F4EBDD]">
                  {count} {count === 1 ? 'Creation' : 'Creations'}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-base font-bold text-[#30231F] mb-1.5">{cat.name}</h3>
                <p className="text-[11px] text-[#8E7356] font-mono mb-3">Slug: /{cat.slug}</p>
                <p className="text-xs text-[#56443E] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="p-4 bg-[#F9F5EE] border-t border-[#B69B7D]/30 flex items-center justify-between text-xs">
                <a
                  href={`/shop?category=${cat.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#56443E] hover:text-[#C87552] font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>View in Storefront</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white border border-[#B69B7D]/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 text-[#30231F]">
            <h3 className="font-display text-xl font-bold mb-4 pb-2 border-b border-[#B69B7D]/30 text-[#30231F]">
              Create New Category
            </h3>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#30231F] mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  placeholder="e.g. Resin Nameplates & Signages"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] focus:outline-none focus:border-[#C87552]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#30231F] mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] focus:outline-none focus:border-[#C87552]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#30231F] mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] focus:outline-none focus:border-[#C87552]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#30231F] mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/products/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F5EE] border border-[#B69B7D]/50 text-xs text-[#30231F] focus:outline-none focus:border-[#C87552]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#B69B7D]/60 text-xs font-semibold text-[#30231F] hover:bg-[#F9F5EE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#C87552] hover:bg-[#B05E3D] text-xs font-bold text-white uppercase tracking-wider"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

