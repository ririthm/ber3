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
            <Image src="/logo-white.png" alt="NutriMatch Logo White" width={330} height={110} className="mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 leading-tight">
              Eat Better,<br />
              <span className="text-emerald-600">Live Healthier</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Temukan makanan yang cocok dengan gaya hidup dan kebutuhan nutrisimu.
            </p>
            <Link href="/recommendations" className="w-fit">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-green-200">
                Explore Your Food Matches
                <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="relative w-full max-w-2xl lg:max-w-xl">
            <Image 
              src="/food-hero.png" 
              alt="Healthy Food" 
              width={1400} 
              height={1400} 
              className="w-full h-auto transition-transform duration-500 hover:scale-105" 
            />
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-24 bg-gradient-to-b from-white to-green-25 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
              Portal Informasi Nutrisi
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article Card 1 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-green-50">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/article-1.png"
                  alt="Balanced Diet"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-green-800 mb-4 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
                  Pentingnya Diet Seimbang dan Manfaatnya bagi Kesehatan
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  Apa itu diet seimbang dan manfaatnya? Apa saja yang boleh dimakan dan tidak? Berikut penjelasannya.
                </p>
                <Link 
                  href="https://www.tempo.co/gaya-hidup/pentingnya-diet-seimbang-dan-manfaatnya-bagi-kesehatan-624980" 
                  className="inline-flex items-center text-green-600 font-semibold hover:text-emerald-600 transition-colors duration-300"
                >
                  Read more 
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>

            {/* Article Card 2 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-green-50">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/article-2.png"
                  alt="Superfoods"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-green-800 mb-4 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
                  Perbaiki Kesehatan Tubuh Dengan Menu Ajaib dan Padat Nutrisi dari Superfood
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  Kenali ragam makanan pemilik nutrisi luar biasa untuk tubuh dan mental yang jauh lebih bugar
                </p>
                <Link 
                  href="https://harpersbazaar.co.id/articles/read/11/2024/20945/superfood-rahasia-nutrisi-terbaik-untuk-tubuh-anda" 
                  className="inline-flex items-center text-green-600 font-semibold hover:text-emerald-600 transition-colors duration-300"
                >
                  Read more 
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>

            {/* Article Card 3 */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-green-50">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/article-3.png"
                  alt="Meal Planning"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-green-800 mb-4 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-300">
                  Jumlah Asupan Kalori Harian yang Dibutuhkan Pria dan Wanita
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  Kebutuhan kalori harian berdasarkan usia, jenis kelamin, dan aktivitas untuk mendukung kesehatan dan berat badan ideal.
                </p>
                <Link 
                  href="https://www.merdeka.com/sehat/jumlah-asupan-kalori-harian-yang-dibutuhkan-pria-dan-wanita-dalam-sehari-315300-mvk.html" 
                  className="inline-flex items-center text-green-600 font-semibold hover:text-emerald-600 transition-colors duration-300"
                >
                  Read more 
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-8 leading-tight">
            Ready to Change Your Life<br />
            <span className="text-emerald-600">for the Better?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            Langkah kecil hari ini, hidup sehat selamanya. Dapatkan rekomendasi makanan yang sesuai dengan kebutuhan nutrisi pilihanmu!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/recommendations">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-green-200">
                Explore Your Food Matches
              </Button>
            </Link>
            <Link href="/faq">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-green-200">
                Check Out the FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-emerald-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-8">
            {/* Logo and Name */}
            <div className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="NutriMatch Logo" 
                width={80} 
                height={35} 
                className="mr-3 transition-opacity duration-300 hover:opacity-90" 
              />
              <span className="text-lg font-bold">Match Your Meal</span>
            </div>
            
            {/* Department and University */}
            <div className="text-center lg:text-right">
              <p className="text-green-100 font-medium">Program Studi Sains Data Terapan</p>
              <p className="text-green-200">Politeknik Elektronika Negeri Surabaya</p>
            </div>
          </div>
          
          <div className="border-t border-green-700 pt-8">
            <div className="flex flex-col items-center gap-4">
              <p className="text-green-100 text-center max-w-2xl leading-relaxed">
                We gratefully acknowledge the support of our mentors. This website is developed and maintained by the BER3 Team.
              </p>
              <p className="text-green-200 text-sm">
                © {new Date().getFullYear()} NutriMatch. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}