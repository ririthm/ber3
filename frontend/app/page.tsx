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
            <Image src="/logo-white.png" alt="NutriMatch Logo White" width={330} height={110} className="mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-green-800">Eat Better, Live Healthier</h1>
            <p className="text-xl text-gray-600">
              Temukan makanan yang cocok dengan gaya hidup dan kebutuhan nutrisimu.
            </p>
            <Link href="/recommendations" className="w-fit">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full flex items-center gap-2 group">
                Explore Your Food Matches
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
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">Portal Informasi Nutrisi</h2>
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
              <h3 className="text-xl font-bold text-green-800 mb-2">Pentingnya Diet Seimbang dan Manfaatnya bagi Kesehatan</h3>
              <p className="text-gray-600 mb-4">
                Apa itu diet seimbang dan manfaatnya? Apa saja yang boleh dimakan dan tidak? Berikut penjelasannya.
              </p>
              <Link href="https://www.tempo.co/gaya-hidup/pentingnya-diet-seimbang-dan-manfaatnya-bagi-kesehatan-624980" className="text-green-600 font-medium hover:underline inline-flex items-center">
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
              <h3 className="text-xl font-bold text-green-800 mb-2">Perbaiki Kesehatan Tubuh Dengan Menu Ajaib dan Padat Nutrisi dari Superfood. Apakah itu?</h3>
              <p className="text-gray-600 mb-4">
                Kenali ragam makanan pemilik nutrisi luar biasa untuk tubuh dan mental yang jauh lebih bugar
              </p>
              <Link href="https://harpersbazaar.co.id/articles/read/11/2024/20945/superfood-rahasia-nutrisi-terbaik-untuk-tubuh-anda" className="text-green-600 font-medium hover:underline inline-flex items-center">
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
              <h3 className="text-xl font-bold text-green-800 mb-2">Jumlah Asupan Kalori Harian yang Dibutuhkan Pria dan Wanita dalam Sehari</h3>
              <p className="text-gray-600 mb-4">
                Kebutuhan kalori harian berdasarkan usia, jenis kelamin, dan aktivitas untuk mendukung kesehatan dan berat badan ideal.
              </p>
              <Link href="https://www.merdeka.com/sehat/jumlah-asupan-kalori-harian-yang-dibutuhkan-pria-dan-wanita-dalam-sehari-315300-mvk.html" className="text-green-600 font-medium hover:underline inline-flex items-center">
                Read more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">Ready to Change Your Life for the Better?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Langkah kecil hari ini, hidup sehat selamanya. Dapatkan rekomendasi makanan yang sesuai nutrisi pilihanmu!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recommendations">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full">
                Explore Your Food Matches
              </Button>
            </Link>
            <Link href="/faq">
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg rounded-full"
              >
                Check Out the FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Logo and Name */}
            <div className="flex items-center mb-2 md:mb-0">
              <Image src="/logo.png" alt="NutriMatch Logo" width={80} height={35} className="mr-2" />
              <span className="text-sm font-bold">Match Your Meal</span>
            </div>
            {/* Department and University */}
            <div className="text-sm mb-0 md:mb-0">
              <p>Program Studi Sains Data Terapan</p>
              <p>Politeknik Elektronika Negeri Surabaya</p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-4">
            <p className="text-xs text-center mb-2">We gratefully acknowledge the support of our partners, mentors, and contributors. This website is developed and maintained by the NutriMatch Team.</p>
            <p className="text-xs text-center">© {new Date().getFullYear()} NutriMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </main>
  )
}
