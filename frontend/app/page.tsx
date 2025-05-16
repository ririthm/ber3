import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex flex-col space-y-6 max-w-xl">
            <Image src="/logo-white.png" alt="NutriMatch Logo White" width={180} height={60} className="mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-green-800">Find Your Perfect Nutritional Balance</h1>
            <p className="text-xl text-gray-600">
              Discover foods that match your nutritional needs and preferences for a healthier lifestyle.
            </p>
            <Link href="/recommendations" className="w-fit">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full flex items-center gap-2 group">
                Match Your Meal
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="relative w-full max-w-md">
            <Image src="/food-hero.png" alt="Healthy Food" width={500} height={500} className="rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 bg-white px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">Nutrition Knowledge Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article Card 1 */}
            <div className="bg-green-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/article-1.png"
                  alt="Balanced Diet"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">The Importance of a Balanced Diet</h3>
              <p className="text-gray-600 mb-4">
                Learn why balancing your nutrients is crucial for overall health and wellbeing.
              </p>
              <Link href="#" className="text-green-600 font-medium hover:underline inline-flex items-center">
                Read more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Article Card 2 */}
            <div className="bg-green-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/article-2.png"
                  alt="Superfoods"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Superfoods You Should Include Daily</h3>
              <p className="text-gray-600 mb-4">
                Discover nutrient-dense foods that can boost your health and energy levels.
              </p>
              <Link href="#" className="text-green-600 font-medium hover:underline inline-flex items-center">
                Read more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Article Card 3 */}
            <div className="bg-green-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src="/article-3.png"
                  alt="Meal Planning"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Effective Meal Planning Strategies</h3>
              <p className="text-gray-600 mb-4">
                Tips and tricks for planning nutritious meals that save time and money.
              </p>
              <Link href="#" className="text-green-600 font-medium hover:underline inline-flex items-center">
                Read more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">Ready to Transform Your Diet?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Start your journey to better nutrition today with personalized food recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recommendations">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full">
                Get Food Recommendations
              </Button>
            </Link>
            <Link href="/faq">
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg rounded-full"
              >
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image src="/logo.png" alt="NutriMatch Logo" width={120} height={40} className="mr-2" />
              <span className="text-sm">Match Your Meal</span>
            </div>
            <div className="text-sm">© {new Date().getFullYear()} NutriMatch. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </main>
  )
}
