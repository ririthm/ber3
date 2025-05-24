import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

// Data FAQ dalam Bahasa Indonesia
const faqData = [
  {
    question: "Apa itu NutriMatch?",
    answer:
      "NutriMatch adalah platform yang membantu Anda menemukan makanan yang sesuai dengan kebutuhan dan preferensi nutrisi Anda. Tujuan kami adalah mempermudah pola makan dengan memberikan rekomendasi makanan yang sesuai dengan preferensi Nutrisi Anda.",
  },
  {
    question: "Bagaimana NutriMatch menentukan rekomendasi makanan?",
    answer:
      "NutriMatch menganalisis kandungan nutrisi, preferensi nutrisi Anda untuk menyarankan makanan yang paling sesuai. Algoritma kami mempertimbangkan berbagai jenis nutrisi sesuai dengan preferensi Anda untuk menciptakan rekomendasi makanan yang seimbang.",
  },
  {
    question: "Apakah saya bisa menggunakan NutriMatch untuk pembatasan nutrisi tertentu?",
    answer:
      "Tentu! NutriMatch dapat menyesuaikan berbagai nutrisi yang sesuai dengan preferensi Anda. Cukup pilih preferensi nutrisi Anda di Food Choices, dan rekomendasi kami akan disesuaikan secara otomatis.",
  },
  {
    question: "Apakah nilai gizi di NutriMatch akurat?",
    answer:
      "Kami berusaha menyajikan data seakurat mungkin dengan menggunakan basis data nutrisi yang terpercaya. Namun, kandungan gizi aktual dapat sedikit berbeda tergantung pada kondisi penanaman, metode memasak, dan merek produk. Nilai yang ditampilkan merupakan estimasi terbaik kami.",
  },
  {
    question: "Apakah NutriMatch bisa digunakan secara gratis?",
    answer:
      "Ya, NutriMatch dapat digunakan secara gratis untuk fitur-fitur seperti rekomendasi makanan dan informasi gizi.",
  },
  {
    question: "Apakah NutriMatch hanya untuk orang yang sedang diet?",
    answer:
      "Tidak. NutriMatch cocok untuk siapa saja yang ingin makan sesuai dengan preferensi nutrisi, tidak hanya untuk mereka yang sedang diet.",
  },
  {
    question: "Apakah saya bisa melihat informasi nutrisi setiap makanan?",
    answer:
      "Tentu. Setiap makanan yang direkomendasikan dilengkapi dengan informasi nutrisi seperti kalori, protein, lemak, karbohidrat, dan kandungan mikronutrien lainnya.",
  }
];

export default function FAQ() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Frequently Asked
              <span className="block text-emerald-600">Questions</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Jelajahi jawaban atas pertanyaan seputar gizi dan pelajari lebih lanjut tentang rekomendasi makanan kami
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index + 1}`}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <AccordionTrigger className="text-left px-6 py-5 hover:bg-green-50/50 transition-colors duration-200 text-gray-900 font-medium text-base md:text-lg group">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-semibold group-hover:bg-green-200 transition-colors duration-200">
                        {index + 1}
                      </div>
                      <span className="text-left">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="ml-11 text-gray-600 leading-relaxed text-base">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Masih ada pertanyaan?
              </h3>
              <p className="text-gray-600 mb-6">
                Tim kami siap membantu Anda dengan pertanyaan lainnya
              </p>
              <a 
                href="https://www.instagram.com/semuademituhan?igsh=bjZuMTl2dGNvZXp0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
              >
                ✉️ Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}