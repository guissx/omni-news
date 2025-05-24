"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ICarouselItem {
  _id?: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

export default function AdminCarouselPage() {
  const router = useRouter();
  const [items, setItems] = useState<ICarouselItem[]>([]);
  const [formData, setFormData] = useState<Omit<ICarouselItem, "_id">>({
    title: "",
    description: "",
    image: "",
    buttonText: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para acessar esta página.");
      router.push("/loginPage");
      return;
    }
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://news-letter-backend.vercel.app/carouselAdm/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para realizar esta ação.");
      router.push("/login");
      return;
    }

    const confirmMessage = editId ? "Deseja realmente atualizar este item?" : "Deseja adicionar este novo item?";
    if (!window.confirm(confirmMessage)) return;

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("buttonText", formData.buttonText);
    if (imageFile) form.append("image", imageFile);

    try {
      if (editId) {
        await axios.put(`https://news-letter-backend.vercel.app/carouselAdm/${editId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setEditId(null);
      } else {
        await axios.post("https://news-letter-backend.vercel.app/carouselAdm/", form, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      setFormData({ title: "", description: "", image: "", buttonText: "" });
      setImageFile(null);
      setImagePreview(null);
      fetchItems();
    } catch (error) {
      console.error("Erro ao salvar item:", error);
    }
  };

  const handleEdit = (item: ICarouselItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      buttonText: item.buttonText,
    });
    setImagePreview(item.image);
    setEditId(item._id ?? null);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para realizar esta ação.");
      router.push("/loginPage");
      return;
    }
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este item?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://news-letter-backend.vercel.app/carouselAdm/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchItems();
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Gerenciar Itens do Carrossel</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Título</label>
          <input
            type="text"
            name="title"
            placeholder="Digite o título do slide"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-slate-400 rounded text-black focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Descrição</label>
          <textarea
            name="description"
            placeholder="Escreva a descrição do conteúdo do carrossel"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-slate-400 rounded text-black h-28 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Imagem</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-slate-400 rounded text-black cursor-pointer bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
            required={!editId}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Texto do Botão</label>
          <input
            type="text"
            name="buttonText"
            placeholder="Ex: Saiba mais, Ver detalhes, etc."
            value={formData.buttonText}
            onChange={handleChange}
            className="w-full p-2 border border-slate-400 rounded text-black focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded hover:bg-red-700 transition-all text-lg shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
        >
          {editId ? "Atualizar item" : "Adicionar item"}
        </button>
      </form>

      {imagePreview && (
        <div className="relative w-full max-w-4xl mx-auto mt-12 overflow-hidden rounded-lg shadow-xl transition-all">
          <div className="relative w-full h-full flex flex-col md:flex-row">
            <div className="w-full md:flex-1 relative h-[40vh] md:h-auto">
              <img
                src={imagePreview}
                alt={formData.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:flex-1 p-4 md:p-8 flex flex-col justify-center bg-white">
              <h2 className="text-base md:text-3xl font-bold mb-2 md:mb-4 text-gray-800">
                {formData.title}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {formData.description}
              </p>
              <button className="self-start px-6 py-2 md:px-8 md:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer text-sm md:text-base">
                {formData.buttonText || "Texto do botão"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
          >
            <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
            <button className="bg-red-600 text-white py-2 rounded mb-3 font-medium hover:bg-red-700 transition-colors cursor-pointer">
              {item.buttonText}
            </button>
            <div className="flex justify-between text-sm">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(item._id!)}
                className="text-red-600 hover:underline cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


