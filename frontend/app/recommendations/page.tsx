"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button";  
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image";  

// Types for our food data
interface Food {
  id: number
  name: string
  category: string
  calories: number
  fat: number
  saturated_fat: number
  cholesterol: number
  sodium: number
  carbohydrates: number
  fiber: number
  sugar: number
  protein: number
  image: string
}

export default function FoodRecommendations() {
  // State for filters
  const [category, setCategory] = useState<string>("")
  const [calories, setCalories] = useState<number[]>([500])
  const [fat, setFat] = useState<number[]>([50])
  const [saturatedFat, setSaturatedFat] = useState<number[]>([50])
  const [cholesterol, setCholesterol] = useState<number[]>([150])
  const [sodium, setSodium] = useState<number[]>([1000])
  const [carbohydrates, setCarbohydrates] = useState<number[]>([100])
  const [fiber, setFiber] = useState<number[]>([25])
  const [sugar, setSugar] = useState<number[]>([50])
  const [protein, setProtein] = useState<number[]>([50])

  // State for food data
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Function to fetch food recommendations from FastAPI backend
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
        throw new Error("Failed to fetch food recommendations")
      }

      const data = await response.json()

      // Konversi string ke number untuk nutrisi jika data ada
      const updatedFoods = data.map((food: any) => ({
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

      setFoods(updatedFoods)  // Update state with the fetched data
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Handle search button click
  const handleSearch = () => {
    fetchFoodRecommendations()  // Call the API when search is clicked
  }

  return (
    <main className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Food Recommendations</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your preferences to get personalized nutritional recommendations that match your needs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-12">
          <h2 className="text-xl font-semibold text-green-800 mb-6">Find Your Perfect Match</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Food Category */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">Food Category</Label>
              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beverage">Beverage</SelectItem>
                  <SelectItem value="Bread">Bread</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                  <SelectItem value="Fruits & Vegetables">Fruits & Vegetables</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Meat">Meat</SelectItem>
                  <SelectItem value="Pasta">Pasta</SelectItem>
                  <SelectItem value="Poultry">Poultry</SelectItem>
                  <SelectItem value="Sauces & Dressings">Sauces & Dressings</SelectItem>
                  <SelectItem value="Seafood">Seafood</SelectItem>
                  <SelectItem value="Spreads">Spreads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6">
            {/* Calories Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Calories (0-1000g)</Label>
                <span className="text-sm text-gray-500">{calories[0]}g</span>
              </div>
              <Slider defaultValue={[500]} max={1000} step={10} value={calories} onValueChange={setCalories} />
            </div>

            {/* Fat Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Fat (0-100g)</Label>
                <span className="text-sm text-gray-500">{fat[0]}g</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} value={fat} onValueChange={setFat} />
            </div>

            {/* Saturated Fat Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Saturated Fat (0-100g)</Label>
                <span className="text-sm text-gray-500">{saturatedFat[0]}g</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} value={saturatedFat} onValueChange={setSaturatedFat} />
            </div>

            {/* Cholesterol Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Cholesterol (0-300mg)</Label>
                <span className="text-sm text-gray-500">{cholesterol[0]}mg</span>
              </div>
              <Slider defaultValue={[150]} max={300} step={5} value={cholesterol} onValueChange={setCholesterol} />
            </div>

            {/* Sodium Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Sodium (0-2000mg)</Label>
                <span className="text-sm text-gray-500">{sodium[0]}mg</span>
              </div>
              <Slider defaultValue={[1000]} max={2000} step={50} value={sodium} onValueChange={setSodium} />
            </div>

            {/* Carbohydrates Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Carbohydrates (0-200g)</Label>
                <span className="text-sm text-gray-500">{carbohydrates[0]}g</span>
              </div>
              <Slider defaultValue={[100]} max={200} step={5} value={carbohydrates} onValueChange={setCarbohydrates} />
            </div>

            {/* Fiber Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Fiber (0-50g)</Label>
                <span className="text-sm text-gray-500">{fiber[0]}g</span>
              </div>
              <Slider defaultValue={[25]} max={50} step={1} value={fiber} onValueChange={setFiber} />
            </div>

            {/* Sugar Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Sugar (0-100g)</Label>
                <span className="text-sm text-gray-500">{sugar[0]}g</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} value={sugar} onValueChange={setSugar} />
            </div>

            {/* Protein Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Protein (0-100g)</Label>
                <span className="text-sm text-gray-500">{protein[0]}g</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} value={protein} onValueChange={setProtein} />
            </div>
          </div>

          <div className="mt-8">
            <Button onClick={handleSearch} className="w-full bg-green-600 hover:bg-green-700 text-white py-2">
              Find Food Recommendations
            </Button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Searching for your perfect food matches...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            <p className="text-sm mt-1">Please try again or adjust your search criteria.</p>
          </div>
        )}

        {!loading && foods.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Recommended Food Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <Card key={food.id} className="overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <Image
                      src={food.image || "/placeholder.svg?height=300&width=400"}
                      alt={food.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{food.name}</CardTitle>
                    <CardDescription>{food.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-sm text-gray-500">Calories</p>
                        <p className="font-semibold">{food.nutrition.calories}g</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-sm text-gray-500">Protein</p>
                        <p className="font-semibold">{food.nutrition.protein_content}g</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-sm text-gray-500">Carbs</p>
                        <p className="font-semibold">{food.nutrition.carbohydrate_content}g</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-sm text-gray-500">Fat</p>
                        <p className="font-semibold">{food.nutrition.fat_content}g</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Detailed Nutrition</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Saturated Fat:</span>
                          <span>{food.nutrition.saturated_fat_content}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cholesterol:</span>
                          <span>{food.nutrition.cholesterol_content}mg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sodium:</span>
                          <span>{food.nutrition.sodium_content}mg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fiber:</span>
                          <span>{food.nutrition.fiber_content}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sugar:</span>
                          <span>{food.nutrition.sugar_content}g</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Add to Meal Plan</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && foods.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Use the filters above to find food recommendations that match your nutritional needs.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
