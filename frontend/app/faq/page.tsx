import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

// FAQ data - replace the answers with your own content
const faqData = [
  {
    question: "What is NutriMatch?",
    answer:
      "NutriMatch is a platform that helps you find foods that match your nutritional needs and preferences. Our goal is to make healthy eating easier by providing personalized food recommendations based on your dietary requirements.",
  },
  {
    question: "How does NutriMatch determine food recommendations?",
    answer:
      "NutriMatch analyzes nutritional content, dietary preferences, and health goals to suggest foods that best match your needs. Our algorithm considers macronutrients, micronutrients, and portion sizes to create balanced meal recommendations.",
  },
  {
    question: "Can I use NutriMatch for specific dietary restrictions?",
    answer:
      "Yes! NutriMatch can accommodate various dietary restrictions including vegetarian, vegan, gluten-free, dairy-free, and more. Simply select your dietary preferences in your profile, and our recommendations will be tailored accordingly.",
  },
  {
    question: "How often should I follow the recommended meal plans?",
    answer:
      "For optimal results, we recommend following the meal plans consistently. However, flexibility is important for sustainable habits. Aim to follow recommendations 80-90% of the time, allowing room for special occasions and personal preferences.",
  },
  {
    question: "Are the nutritional values in NutriMatch accurate?",
    answer:
      "We strive for accuracy by using data from reputable nutritional databases. However, actual nutritional content may vary slightly based on factors like growing conditions, preparation methods, and brand differences. The values provided should be considered close approximations.",
  },
  {
    question: "Can NutriMatch help with weight management?",
    answer:
      "Yes, NutriMatch can be a valuable tool for weight management. By providing nutritionally balanced meal recommendations and portion guidance, it helps you maintain appropriate calorie intake while ensuring you get essential nutrients.",
  },
  {
    question: "How can I provide feedback on food recommendations?",
    answer:
      "We value your feedback! After trying a recommended food or meal, you can rate it in the app. This helps our system learn your preferences and improve future recommendations. You can also contact our support team directly with specific feedback or suggestions.",
  },
  {
    question: "Is NutriMatch suitable for athletes or highly active individuals?",
    answer:
      "NutriMatch can adjust recommendations based on activity level and fitness goals. Athletes and active individuals can receive meal plans with appropriate calorie and macronutrient distributions to support performance and recovery.",
  },
  {
    question: "How does NutriMatch handle food allergies?",
    answer:
      "Food safety is our priority. You can input your allergies in your profile, and our system will automatically exclude those foods from your recommendations. Always double-check ingredient lists if you have severe allergies.",
  },
  {
    question: "Can I use NutriMatch for my entire family?",
    answer:
      "You can create multiple profiles for family members with different nutritional needs. This makes NutriMatch perfect for planning meals that work for the whole family while addressing individual dietary requirements.",
  },
]

export default function FAQ() {
  return (
    <main className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about nutrition and our food recommendations.
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
  )
}