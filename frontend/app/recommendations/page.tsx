"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button";  
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// Types for our food data
interface Food {
  recipe_id: number
  name: string
  category: string
  description?: string
  ingredients?: {
    ingredient_parts?: string
    ingredient_quantity?: string
  }[]
  nutrition: {
    calories: number
    fat_content: number
    saturated_fat_content: number
    cholesterol_content: number
    sodium_content: number
    carbohydrate_content: number
    fiber_content: number
    sugar_content: number
    protein_content: number
  }
}

export default function FoodRecommendations() {
  const [category, setCategory] = useState<string>("")
  const [calories, setCalories] = useState<number[]>([0])
  const [fat, setFat] = useState<number[]>([0])
  const [saturatedFat, setSaturatedFat] = useState<number[]>([0])
  const [cholesterol, setCholesterol] = useState<number[]>([0])
  const [sodium, setSodium] = useState<number[]>([0])
  const [carbohydrates, setCarbohydrates] = useState<number[]>([0])
  const [fiber, setFiber] = useState<number[]>([0])
  const [sugar, setSugar] = useState<number[]>([0])
  const [protein, setProtein] = useState<number[]>([0])

  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null)
  
  // Add CSS for fade-in animation
  const fadeInStyle = `
    @keyframes fadeIn {
      from { opacity: 0; max-height: 0; }
      to { opacity: 1; max-height: 500px; }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-in-out;
    }
  `

  const fetchFoodRecommendations = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          calories: calories[0],
          fat_content: fat[0],
          saturated_fat_content: saturatedFat[0],
          cholesterol_content: cholesterol[0],
          sodium_content: sodium[0],
          carbohydrate_content: carbohydrates[0],
          fiber_content: fiber[0],
          sugar_content: sugar[0],
          protein_content: protein[0],
        }),
      })

      if (!response.ok) {
        throw new Error("Ups! Rekomendasi makanan belum bisa ditampilkan saat ini. Silakan coba lagi sebentar lagi.")
      }

      const data = await response.json()

      // Limit to 15 foods if needed
      const limitedData = data.slice(0, 15)

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
      }));

      setFoods(updatedFoods)
      // Reset expanded card when getting new results
      setExpandedCardId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchFoodRecommendations()
  }

  function displayValue(value: number) {
    if (!value || isNaN(value)) return "-"
    return value.toString()
  }

  function parseListString(str?: string): string[] {
    if (!str || str.toLowerCase() === "na") return []
    return str
      .replace(/^c\(|\)$/g, "")
      .replace(/["']/g, "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean)
  }

  function handleToggleCard(id: number) {
    setExpandedCardId(expandedCardId === id ? null : id)
  }

  return (
    <main className="min-h-screen pt-20 pb-12 px-4">
      <style>{fadeInStyle}</style>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Food Choices</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Atur pilihan nutrisi, dapatkan rekomendasi makanan yang mendukung gaya hidupmu!
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-12">
          <h2 className="text-xl font-semibold text-green-800 mb-6">Find Your Perfect Match</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori Makanan
              </Label>
              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger className="w-full bg-white">
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
          </div>

          <div className="space-y-6">
            {/* Calories Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Kalori (0-1000kkal)</Label>
                <span className="text-sm text-gray-500">{calories[0]}kkal</span>
              </div>
              <Slider defaultValue={[0]} max={1000} step={10} value={calories} onValueChange={setCalories} />
            </div>

            {/* Fat Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Lemak (0-100g)</Label>
                <span className="text-sm text-gray-500">{fat[0]}g</span>
              </div>
              <Slider defaultValue={[0]} max={100} step={1} value={fat} onValueChange={setFat} />
            </div>

            {/* Saturated Fat Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Lemak Jenuh (0-100g)</Label>
                <span className="text-sm text-gray-500">{saturatedFat[0]}g</span>
              </div>
              <Slider defaultValue={[0]} max={100} step={1} value={saturatedFat} onValueChange={setSaturatedFat} />
            </div>

            {/* Cholesterol Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Kolesterol (0-300mg)</Label>
                <span className="text-sm text-gray-500">{cholesterol[0]}mg</span>
              </div>
              <Slider defaultValue={[0]} max={300} step={5} value={cholesterol} onValueChange={setCholesterol} />
            </div>

            {/* Sodium Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Natrium (0-2000mg)</Label>
                <span className="text-sm text-gray-500">{sodium[0]}mg</span>
              </div>
              <Slider defaultValue={[0]} max={2000} step={50} value={sodium} onValueChange={setSodium} />
            </div>

            {/* Carbohydrates Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Karbohidrat (0-200g)</Label>
                <span className="text-sm text-gray-500">{carbohydrates[0]}g</span>
              </div>
              <Slider defaultValue={[0]} max={200} step={5} value={carbohydrates} onValueChange={setCarbohydrates} />
            </div>

            {/* Fiber Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Serat (0-50g)</Label>
                <span className="text-sm text-gray-500">{fiber[0]}g</span>
              </div>
              <Slider defaultValue={[0]} max={50} step={1} value={fiber} onValueChange={setFiber} />
            </div>

            {/* Sugar Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Gula (0-100g)</Label>
                <span className="text-sm text-gray-500">{sugar[0]}g</span>
              </div>
              <Slider defaultValue={[0]} max={100} step={1} value={sugar} onValueChange={setSugar} />
            </div>

            {/* Protein Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Protein (0-100g)</Label>
                <span className="text-sm text-gray-500">{protein[0]}g</span>
              </div>
              <Slider defaultValue={[0]} max={100} step={1} value={protein} onValueChange={setProtein} />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button onClick={handleSearch} className="bg-green-700 hover:bg-green-800 text-white">
              {loading ? "Mencari..." : "Cari Makanan"}
            </Button>
          </div>

          {error && (
            <p className="text-red-600 mt-4 text-center font-semibold">{error}</p>
          )}

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.length === 0 && !loading && (
              <div className="col-span-3 text-center text-gray-600 py-8">
                Belum ada hasil makanan. Silakan pilih kategori dan nutrisi, lalu klik "Cari Makanan".
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
  className={`min-h-[500px] flex flex-col justify-between border border-green-600 shadow-md transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-[500px]'}`}
>
  <CardHeader className="pb-2">
    <CardTitle className="text-lg font-semibold text-green-800">{food.name}</CardTitle>
    <CardDescription>{food.category}</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-green-50 p-2 rounded">
        <p className="text-sm text-gray-500">Kalori</p>
        <p className="font-semibold">{food.nutrition.calories}kkal</p>
      </div>
      <div className="bg-green-50 p-2 rounded">
        <p className="text-sm text-gray-500">Protein</p>
        <p className="font-semibold">{food.nutrition.protein_content}g</p>
      </div>
      <div className="bg-green-50 p-2 rounded">
        <p className="text-sm text-gray-500">Karbohidrat</p>
        <p className="font-semibold">{food.nutrition.carbohydrate_content}g</p>
      </div>
      <div className="bg-green-50 p-2 rounded">
        <p className="text-sm text-gray-500">Lemak</p>
        <p className="font-semibold">{food.nutrition.fat_content}g</p>
      </div>
    </div>

    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Nutrisi Terperinci</h4>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Lemak Jenuh:</span>
          <span>{food.nutrition.saturated_fat_content}g</span>
        </div>
        <div className="flex justify-between">
          <span>Kolesterol:</span>
          <span>{food.nutrition.cholesterol_content}mg</span>
        </div>
        <div className="flex justify-between">
          <span>Natrium:</span>
          <span>{food.nutrition.sodium_content}mg</span>
        </div>
        <div className="flex justify-between">
          <span>Serat:</span>
          <span>{food.nutrition.fiber_content}g</span>
        </div>
        <div className="flex justify-between">
          <span>Gula:</span>
          <span>{food.nutrition.sugar_content}g</span>
        </div>
      </div>
    </div>
  </CardContent>
  <CardFooter className="flex flex-col gap-2">
    <Button 
      onClick={() => handleToggleCard(food.recipe_id)} 
      className={`${isExpanded ? "bg-red-600 hover:bg-red-700" : "bg-green-700 hover:bg-green-800"} text-white w-full transition-colors`}
    >
      {isExpanded ? "Hide Details" : "Show Details"}
    </Button>

    <div className={`mt-2 w-full text-sm text-gray-800 transition-all duration-300 ${isExpanded ? "max-h-96 overflow-auto" : "h-0 overflow-hidden"}`}>
      <p className="font-semibold text-green-800 mb-1">Deskripsi:</p>
      <p className="mb-2">{food.description?.trim() || "-"}</p>
      <p className="font-semibold text-green-800">Resep Makanan:</p>
      <ul className="list-disc list-inside">
        {parts.length > 0 || quantities.length > 0 ? (
          parts.map((part, i) => (
            <li key={i}>
              {part || "-"}: {quantities[i] || "-"}
            </li>
          ))
        ) : (
          <li>-</li>
        )}
      </ul>
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