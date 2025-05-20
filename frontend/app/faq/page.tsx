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
    <main className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 transition-transform duration-300 hover:scale-105">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Jelajahi jawaban atas pertanyaan seputar gizi dan pelajari lebih lanjut tentang rekomendasi makanan kami.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
