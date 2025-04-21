// pages/index.tsx
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart, Search, ArrowDownAZ, ArrowUpZA } from "lucide-react"

type Produto = {
  id: number
  name: string
  vendas: number
  comissao: string
}

const produtosMock: Produto[] = [
  { id: 1, name: "Produto X", vendas: 1243, comissao: "R$ 85,00" },
  { id: 2, name: "Curso Z", vendas: 987, comissao: "R$ 120,00" },
  { id: 3, name: "Ferramenta Pro", vendas: 756, comissao: "R$ 64,00" },
  { id: 4, name: "Treinamento 10x", vendas: 1523, comissao: "R$ 180,00" },
]

export default function Home() {
  const [busca, setBusca] = useState("")
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [favoritos, setFavoritos] = useState<number[]>([])
  const [ordem, setOrdem] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    document.title = "Afiliado Hacker PRO"
    const favoritosSalvos = localStorage.getItem("favoritos")
    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos))
    }
    setProdutos(produtosMock)
  }, [])

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos))
  }, [favoritos])

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    )
  }

  const produtosFiltrados = produtos
    .filter((p) => p.name.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) =>
      ordem === "asc" ? a.vendas - b.vendas : b.vendas - a.vendas
    )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        🚀 Afiliado Hacker PRO
      </h1>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        <button
          onClick={() =>
            setOrdem((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-100"
        >
          {ordem === "asc" ? (
            <>
              <ArrowUpZA size={18} /> Menos vendidos
            </>
          ) : (
            <>
              <ArrowDownAZ size={18} /> Mais vendidos
            </>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {produtosFiltrados.map((produto, i) => (
          <motion.div
            key={produto.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200 relative"
          >
            <button
              onClick={() => toggleFavorito(produto.id)}
              className="absolute top-3 right-3 text-red-500"
            >
              <Heart
                size={20}
                fill={favoritos.includes(produto.id) ? "#ef4444" : "none"}
              />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {produto.name}
            </h2>
            <p className="text-gray-600">Vendas: {produto.vendas}</p>
            <p className="text-green-600 font-semibold">
              Comissão: {produto.comissao}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
