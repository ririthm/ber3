"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";  
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Types for our food data
interface Food {
  recipe_id: number;
  name: string;
  category: string;
  description?: string;
  ingredients?: {
    ingredient_parts?: string;
    ingredient_quantity?: string;
  }[];
  nutrition: {
    calories: number;
    fat_content: number;
    saturated_fat_content: number;
    cholesterol_content: number;
    sodium_content: number;
    carbohydrate_content: number;
    fiber_content: number;
    sugar_content: number;
    protein_content: number;
  };
  similarity_score: number;
}

export default function FoodRecommendations() {
  const [category, setCategory] = useState<string>("");
  // Ubah ke string untuk membedakan antara kosong dan nilai 0
  const [calories, setCalories] = useState<string>("");
  const [fat, setFat] = useState<string>("");
  const [saturatedFat, setSaturatedFat] = useState<string>("");
  const [cholesterol, setCholesterol] = useState<string>("");
  const [sodium, setSodium] = useState<string>("");
  const [carbohydrates, setCarbohydrates] = useState<string>("");
  const [fiber, setFiber] = useState<string>("");
  const [sugar, setSugar] = useState<string>("");
  const [protein, setProtein] = useState<string>("");

  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  
  const fetchFoodRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          calories: calories.trim() !== "" ? parseFloat(calories) : 0,
          fat_content: fat.trim() !== "" ? parseFloat(fat) : 0,
          saturated_fat_content: saturatedFat.trim() !== "" ? parseFloat(saturatedFat) : 0,
          cholesterol_content: cholesterol.trim() !== "" ? parseFloat(cholesterol) : 0,
          sodium_content: sodium.trim() !== "" ? parseFloat(sodium) : 0,
          carbohydrate_content: carbohydrates.trim() !== "" ? parseFloat(carbohydrates) : 0,
          fiber_content: fiber.trim() !== "" ? parseFloat(fiber) : 0,
          sugar_content: sugar.trim() !== "" ? parseFloat(sugar) : 0,
          protein_content: protein.trim() !== "" ? parseFloat(protein) : 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Ups! Rekomendasi makanan belum bisa ditampilkan saat ini. Silakan coba lagi sebentar lagi.");
      }

      const data = await response.json();
      const limitedData = data.slice(0, 15);

      const updatedFoods = limitedData.map((food: any) => ({
        ...food,
        nutrition: {
          calories: parseFloat(food.nutrition.calories || "0"),
          fat_content: parseFloat(food.nutrition.fat_content || "0"),
          saturated_fat_content: parseFloat(food.nutrition.saturated_fat_content || "0"),
          cholesterol_content: parseFloat(food.nutrition.cholesterol_content || "0"),
          sodium_content: parseFloat(food.nutrition.sodium_content || "0"),
          carbohydrate_content: parseFloat(food.nutrition.carbohydrate_content || "0"),
          fiber_content: parseFloat(food.nutrition.fiber_content || "0"),
          sugar_content: parseFloat(food.nutrition.sugar_content || "0"),
          protein_content: parseFloat(food.nutrition.protein_content || "0"),
        },
        similarity_score: parseFloat(food.similarity || "0"),
      }));

      setFoods(updatedFoods);
      setExpandedCardId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setError(null);

    // Validasi kategori
    if (!category) {
      setError("Ups! Kategori yang Anda masukkan masih kosong.");
      return;
    }

    // Validasi minimal 1 nutrisi harus diisi
    const nutrientFields = [
      { value: calories, name: "Kalori" },
      { value: fat, name: "Lemak" },
      { value: saturatedFat, name: "Lemak Jenuh" },
      { value: cholesterol, name: "Kolesterol" },
      { value: sodium, name: "Natrium" },
      { value: carbohydrates, name: "Karbohidrat" },
      { value: fiber, name: "Serat" },
      { value: sugar, name: "Gula" },
      { value: protein, name: "Protein" }
    ];

    // Cek apakah minimal ada 1 field yang diisi
    const filledFields = nutrientFields.filter(field => field.value.trim() !== "");
    if (filledFields.length === 0) {
      setError("Silakan isi minimal satu nilai nutrisi untuk mendapatkan rekomendasi makanan.");
      return;
    }

    // Validasi nilai numerik dan range untuk field yang diisi
    const nutrientValues = [];
    
    if (calories.trim() !== "") {
      const caloriesNum = parseFloat(calories);
      if (isNaN(caloriesNum)) {
        setError("Nilai kalori yang Anda masukkan tidak valid.");
        return;
      }
      if (caloriesNum < 0 || caloriesNum > 1000) {
        setError("Nilai kalori harus berada dalam rentang 0-1000 kkal.");
        return;
      }
      nutrientValues.push({ name: "calories", value: caloriesNum });
    }

    if (fat.trim() !== "") {
      const fatNum = parseFloat(fat);
      if (isNaN(fatNum)) {
        setError("Nilai lemak yang Anda masukkan tidak valid.");
        return;
      }
      if (fatNum < 0 || fatNum > 100) {
        setError("Nilai lemak harus berada dalam rentang 0-100g.");
        return;
      }
      nutrientValues.push({ name: "fat_content", value: fatNum });
    }

    if (saturatedFat.trim() !== "") {
      const saturatedFatNum = parseFloat(saturatedFat);
      if (isNaN(saturatedFatNum)) {
        setError("Nilai lemak jenuh yang Anda masukkan tidak valid.");
        return;
      }
      if (saturatedFatNum < 0 || saturatedFatNum > 100) {
        setError("Nilai lemak jenuh harus berada dalam rentang 0-100g.");
        return;
      }
      nutrientValues.push({ name: "saturated_fat_content", value: saturatedFatNum });
    }

    if (cholesterol.trim() !== "") {
      const cholesterolNum = parseFloat(cholesterol);
      if (isNaN(cholesterolNum)) {
        setError("Nilai kolesterol yang Anda masukkan tidak valid.");
        return;
      }
      if (cholesterolNum < 0 || cholesterolNum > 300) {
        setError("Nilai kolesterol harus berada dalam rentang 0-300mg.");
        return;
      }
      nutrientValues.push({ name: "cholesterol_content", value: cholesterolNum });
    }

    if (sodium.trim() !== "") {
      const sodiumNum = parseFloat(sodium);
      if (isNaN(sodiumNum)) {
        setError("Nilai natrium yang Anda masukkan tidak valid.");
        return;
      }
      if (sodiumNum < 0 || sodiumNum > 2000) {
        setError("Nilai natrium harus berada dalam rentang 0-2000mg.");
        return;
      }
      nutrientValues.push({ name: "sodium_content", value: sodiumNum });
    }

    if (carbohydrates.trim() !== "") {
      const carbohydratesNum = parseFloat(carbohydrates);
      if (isNaN(carbohydratesNum)) {
        setError("Nilai karbohidrat yang Anda masukkan tidak valid.");
        return;
      }
      if (carbohydratesNum < 0 || carbohydratesNum > 200) {
        setError("Nilai karbohidrat harus berada dalam rentang 0-200g.");
        return;
      }
      nutrientValues.push({ name: "carbohydrate_content", value: carbohydratesNum });
    }

    if (fiber.trim() !== "") {
      const fiberNum = parseFloat(fiber);
      if (isNaN(fiberNum)) {
        setError("Nilai serat yang Anda masukkan tidak valid.");
        return;
      }
      if (fiberNum < 0 || fiberNum > 50) {
        setError("Nilai serat harus berada dalam rentang 0-50g.");
        return;
      }
      nutrientValues.push({ name: "fiber_content", value: fiberNum });
    }

    if (sugar.trim() !== "") {
      const sugarNum = parseFloat(sugar);
      if (isNaN(sugarNum)) {
        setError("Nilai gula yang Anda masukkan tidak valid.");
        return;
      }
      if (sugarNum < 0 || sugarNum > 100) {
        setError("Nilai gula harus berada dalam rentang 0-100g.");
        return;
      }
      nutrientValues.push({ name: "sugar_content", value: sugarNum });
    }

    if (protein.trim() !== "") {
      const proteinNum = parseFloat(protein);
      if (isNaN(proteinNum)) {
        setError("Nilai protein yang Anda masukkan tidak valid.");
        return;
      }
      if (proteinNum < 0 || proteinNum > 100) {
        setError("Nilai protein harus berada dalam rentang 0-100g.");
        return;
      }
      nutrientValues.push({ name: "protein_content", value: proteinNum });
    }

    fetchFoodRecommendations();
  };

  function parseListString(str?: string): string[] {
    if (!str || str.toLowerCase() === "na") return [];
    return str
      .replace(/^c\(|\)$/g, "")
      .replace(/["']/g, "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
  }

  const handleToggleCard = (id: number) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <main className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Food Choices</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Atur pilihan nutrisi, dapatkan rekomendasi makanan yang mendukung gaya hidupmu!
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md mb-12">
          <h2 className="text-xl font-semibold text-green-800 mb-8 text-center">Find Your Perfect Match</h2>

          <div className="mb-8">
            <Label className="block text-sm font-medium text-gray-700 mb-3">Kategori Makanan</Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="w-full bg-white h-12">
                <SelectValue placeholder="Pilih Kategori Makanan" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Beverage">Minuman</SelectItem>
                <SelectItem value="Bread">Roti</SelectItem>
                <SelectItem value="Dairy">Hidangan Susu</SelectItem>
                <SelectItem value="Dessert">Dessert</SelectItem>
                <SelectItem value="Fruits & Vegetables">Buah dan Sayuran</SelectItem>
                <SelectItem value="Grains">Serealia</SelectItem>
                <SelectItem value="Lunch">Makan Siang</SelectItem>
                <SelectItem value="Meat">Daging</SelectItem>
                <SelectItem value="Pasta">Pasta</SelectItem>
                <SelectItem value="Poultry">Hidangan Unggas</SelectItem>
                <SelectItem value="Sauces and Dressings">Saus dan Dressing</SelectItem>
                <SelectItem value="Seafood">Seafood</SelectItem>
                <SelectItem value="Spreads">Selai dan Olesan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-6 text-center">Nutrisi</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Kalori */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Kalori (0-1000 kkal)</Label>
                <input
                  type="number"
                  value={calories}
                  step="0.1"
                  min="0"
                  max="1000"
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Masukkan kalori"
                />
              </div>

              {/* Protein */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Protein (0-100g)</Label>
                <input
                  type="number"
                  value={protein}
                  step="0.1"
                  min="0"
                  max="100"
                  onChange={(e) => setProtein(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Masukkan protein"
                />
              </div>

              {/* Karbohidrat */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Karbohidrat (0-200g)</Label>
                <input
                  type="number"
                  value={carbohydrates}
                  step="0.1"
                  min="0"
                  max="200"
                  onChange={(e) => setCarbohydrates(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Masukkan karbohidrat"
                />
              </div>

              {/* Lemak */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Lemak (0-100g)</Label>
                <input
                  type="number"
                  value={fat}
                  step="0.1"
                  min="0"
                  max="100"
                  onChange={(e) => setFat(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Masukkan lemak"
                />
              </div>

              {/* Lemak Jenuh */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Lemak Jenuh (0-100g)</Label>
                <input
                  type="number"
                  value={saturatedFat}
                  step="0.1"
                  min="0"
                  max="100"
                  onChange={(e) => setSaturatedFat(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Masukkan lemak jenuh"
                />
              </div>

              {/* Serat */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Serat (0-50g)</Label>
                <input
                  type="number"
                  value={fiber}
                  step="0.1"
                  min="0"
                  max="50"
                  onChange={(e) => setFiber(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Masukkan serat"
                />
              </div>

              {/* Kolesterol */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Kolesterol (0-300mg)</Label>
                <input
                  type="number"
                  value={cholesterol}
                  step="0.1"
                  min="0"
                  max="300"
                  onChange={(e) => setCholesterol(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Masukkan kolesterol"
                />
              </div>

              {/* Natrium */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Natrium (0-2000mg)</Label>
                <input
                  type="number"
                  value={sodium}
                  step="0.1"
                  min="0"
                  max="2000"
                  onChange={(e) => setSodium(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Masukkan natrium"
                />
              </div>

              {/* Gula */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Gula (0-100g)</Label>
                <input
                  type="number"
                  value={sugar}
                  step="0.1"
                  min="0"
                  max="100"
                  onChange={(e) => setSugar(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Masukkan gula"
                />
              </div>
            </div>
          </div>
            
          <div className="flex justify-center">
            <Button 
              onClick={handleSearch} 
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors"
              disabled={loading}
            >
              {loading ? "Mencari..." : "Cari Makanan"}
            </Button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center font-semibold">{error}</p>
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {foods.length === 0 && !loading && (
              <div className="col-span-full text-center text-gray-600 py-12">
                <div className="bg-gray-50 rounded-lg p-8">
                  <p className="text-lg">Belum ada hasil makanan.</p>
                  <p className="text-sm mt-2">Silakan pilih kategori dan isi minimal satu nilai nutrisi, lalu klik "Cari Makanan".</p>
                </div>
              </div>
            )}

            {foods.map((food) => {
              const ingredients = food.ingredients?.[0];
              const parts = parseListString(ingredients?.ingredient_parts);
              const quantities = parseListString(ingredients?.ingredient_quantity);
              const isExpanded = expandedCardId === food.recipe_id;

              return (
                <Card 
                  key={food.recipe_id} 
                  className={`min-h-[600px] flex flex-col justify-between border border-green-600 shadow-lg hover:shadow-xl transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-[500px]'}`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-green-800">{food.name}</CardTitle>
                    <CardDescription className="text-green-600 font-medium">{food.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Kalori</p>
                        <p className="font-semibold text-green-800">{food.nutrition.calories} kkal</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Protein</p>
                        <p className="font-semibold text-green-800">{food.nutrition.protein_content}g</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Karbohidrat</p>
                        <p className="font-semibold text-green-800">{food.nutrition.carbohydrate_content}g</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">Lemak</p>
                        <p className="font-semibold text-green-800">{food.nutrition.fat_content}g</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Nutrisi Terperinci</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lemak Jenuh:</span>
                          <span className="font-medium">{food.nutrition.saturated_fat_content}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Kolesterol:</span>
                          <span className="font-medium">{food.nutrition.cholesterol_content}mg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Natrium:</span>
                          <span className="font-medium">{food.nutrition.sodium_content}mg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Serat:</span>
                          <span className="font-medium">{food.nutrition.fiber_content}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gula:</span>
                          <span className="font-medium">{food.nutrition.sugar_content}g</span>
                        </div>
                      </div>
                    </div>

                    {/* Similarity score */}
                    <div className="mt-4 bg-green-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-green-800 text-center">
                        🎯 Kecocokan: {food.similarity_score}%
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-2">
                    <Button 
                      onClick={() => handleToggleCard(food.recipe_id)} 
                      className={`${isExpanded ? "bg-red-600 hover:bg-red-700" : "bg-green-700 hover:bg-green-800"} text-white w-full transition-colors`}
                    >
                      {isExpanded ? "Sembunyikan Detail" : "Lihat Detail"}
                    </Button>

                    <div className={`mt-2 w-full text-sm text-gray-800 transition-all duration-300 ${isExpanded ? "max-h-96 overflow-auto" : "h-0 overflow-hidden"}`}>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <div>
                          <p className="font-semibold text-green-800 mb-1">Deskripsi:</p>
                          <p className="text-gray-700">{food.description?.trim() || "Tidak ada deskripsi tersedia"}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-green-800 mb-2">Resep Makanan:</p>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {parts.length > 0 || quantities.length > 0 ? (
                              parts.map((part, i) => (
                                <li key={i}>
                                  <span className="font-medium">{part || "Bahan tidak tersedia"}</span>: {quantities[i] || "Jumlah tidak tersedia"}
                                </li>
                              ))
                            ) : (
                              <li className="text-gray-500">Resep tidak tersedia</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  )
}