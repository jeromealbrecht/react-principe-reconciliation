"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, RefreshCw } from "lucide-react";

export default function Reconciliation() {
  const initialItems = [
    { id: 1, text: "Élément 1", color: "bg-blue-500" },
    { id: 2, text: "Élément 2", color: "bg-green-500" },
    { id: 3, text: "Élément 3", color: "bg-purple-500" },
  ];

  const [virtualDOM, setVirtualDOM] = useState(initialItems);
  const [realDOM, setRealDOM] = useState(initialItems);
  const [isReconciling, setIsReconciling] = useState(false);
  const [highlightedIds, setHighlightedIds] = useState<number[]>([]);

  // Fonction pour modifier le Virtual DOM
  const updateVirtualDOM = () => {
    const newItems = [...virtualDOM];

    // Modifier un élément aléatoire
    const randomIndex = Math.floor(Math.random() * newItems.length);
    newItems[randomIndex] = {
      ...newItems[randomIndex],
      text: `Élément ${randomIndex + 1} (modifié)`,
      color: "bg-yellow-500",
    };

    // Ajouter un nouvel élément
    if (Math.random() > 0.5 && newItems.length < 5) {
      newItems.push({
        id: Math.max(...newItems.map((item) => item.id)) + 1,
        text: `Nouvel Élément ${newItems.length + 1}`,
        color: "bg-red-500",
      });
    }

    setVirtualDOM(newItems);
    setHighlightedIds([]);
  };

  // Fonction pour simuler la réconciliation
  const reconcile = () => {
    setIsReconciling(true);

    // Identifier les différences
    const changedIds = virtualDOM
      .filter((vItem) => {
        const rItem = realDOM.find((r) => r.id === vItem.id);
        return (
          !rItem || rItem.text !== vItem.text || rItem.color !== vItem.color
        );
      })
      .map((item) => item.id);

    const newIds = virtualDOM
      .filter((vItem) => !realDOM.find((r) => r.id === vItem.id))
      .map((item) => item.id);

    setHighlightedIds([...changedIds, ...newIds]);

    // Simuler le délai de réconciliation
    setTimeout(() => {
      setRealDOM(virtualDOM);
      setIsReconciling(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Principe de Réconciliation React
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Virtual DOM */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Virtual DOM</h2>
            <button
              onClick={updateVirtualDOM}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Modifier
            </button>
          </div>

          <div className="border-2 border-blue-400 rounded-lg p-4 min-h-[300px] bg-blue-50">
            <AnimatePresence>
              {virtualDOM.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`${item.color} p-3 rounded-md mb-2 text-white shadow-md`}
                >
                  <span className="font-medium">{item.text}</span> (id:{" "}
                  {item.id})
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Real DOM */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">DOM Réel</h2>
            <div className="flex items-center space-x-2">
              {isReconciling ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                >
                  <RefreshCw className="text-blue-600" />
                </motion.div>
              ) : (
                <button
                  onClick={reconcile}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  disabled={
                    JSON.stringify(virtualDOM) === JSON.stringify(realDOM)
                  }
                >
                  Réconcilier
                </button>
              )}
            </div>
          </div>

          <div className="border-2 border-green-400 rounded-lg p-4 min-h-[300px] bg-green-50">
            <AnimatePresence>
              {realDOM.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: highlightedIds.includes(item.id) ? [1, 1.05, 1] : 1,
                    boxShadow: highlightedIds.includes(item.id)
                      ? "0 0 0 2px rgba(239, 68, 68, 0.5)"
                      : "none",
                  }}
                  transition={{
                    scale: {
                      repeat: highlightedIds.includes(item.id) ? 3 : 0,
                      duration: 0.5,
                    },
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`${item.color} p-3 rounded-md mb-2 text-white shadow-md`}
                >
                  <span className="font-medium">{item.text}</span> (id:{" "}
                  {item.id})
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Explication du processus */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-4">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <ArrowDown className="text-gray-500" size={24} />
          </motion.div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Comment fonctionne la réconciliation:
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-900">
            <li>
              React crée une représentation virtuelle du DOM (Virtual DOM)
            </li>
            <li>Quand l&apos;état change, React crée un nouveau Virtual DOM</li>
            <li>
              React compare l&apos;ancien et le nouveau Virtual DOM (algorithme
              de &quot;diffing&quot;)
            </li>
            <li>
              Seuls les éléments qui ont changé sont mis à jour dans le DOM réel
            </li>
            <li>
              Cette approche est plus efficace que de mettre à jour tout le DOM
            </li>
          </ol>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>
          Cliquez sur &quot;Modifier&quot; pour changer le Virtual DOM, puis sur
          &quot;Réconcilier&quot; pour voir comment React met à jour uniquement
          les éléments modifiés.
        </p>
      </div>
    </div>
  );
}
