import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SSH - Stop Street Harassment" },
    {
      name: "description",
      content: "Learn how to intervene safely in street harassment situations",
    },
  ];
}

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom, var(--color-persian-pink), var(--color-fairy-tale))`,
      }}
    >
      {/* Header */}
      <div className="text-white py-4 px-6 bg-fairy-tale/50">
        <h1 className="text-xl font-bold text-center">SSH</h1>
      </div>

      {/* Hero Section */}
      <div className="px-6 py-12 bg-fairy-tale/50 h-80 relative md:h-auto md:relative">
        <div className="md:max-w-6xl md:mx-auto md:grid md:grid-cols-2 md:gap-8 md:items-center">
          {/* Mobile: Center content, Desktop: Left Column */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-white font-bold text-2xl md:text-4xl mb-6">
              Zou jij ingrijpen?
            </h2>

            <Link
              to="/quiz"
              className="inline-block bg-white px-5 py-1 md:px-8 md:py-4 rounded text-persian-pink font-bold text-lg md:text-xl hover:bg-gray-50 transition-all duration-200 shadow-lg"
            >
              Doe de QUIZ
            </Link>
          </div>

          {/* Desktop: Right Column - Image */}
          <div className="hidden md:block">
            <img
              src="/bg-v2.png"
              className="w-full max-w-md ml-auto"
              alt="Hero illustration"
            />
          </div>
        </div>

        {/* Mobile: Absolute positioned image (original design) */}
        <img
          src="/bg-v2.png"
          className="absolute bottom-0 right-0 w-full md:hidden"
          alt="Hero illustration"
        />
      </div>

      {/* Content Sections */}
      <div className="bg-white">
        {/* Stop Street Harassment Section */}
        <div className="px-6 py-12 max-w-6xl mx-auto">
          <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                StopStreet
                <br />
                Herrasment
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8 md:text-lg">
                We can make our streets safer together. Explore SSH to learn
                more, take our quiz, report incidents, and help build a culture
                of respect and safety.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🤝</div>
                <p className="text-gray-700 font-medium">
                  Together we can make a difference
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pt-8 pb-36 bg-fairy-tale/50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl font-bold text-black/80 mb-4">
              Do you recognize streetharrasment?
            </h3>
            <p className="leading-relaxed mb-6 md:text-lg max-w-2xl mx-auto">
              Street harassment can take many forms from unwanted comments to
              intimidating behavior. Learn the signs, understand the impact, and
              know how to respond safely.
            </p>
            <div className="flex justify-center">
              <button
                className="text-white px-4 py-2 md:px-6 md:py-3 rounded font-semibold transition-colors duration-200"
                style={{ backgroundColor: "var(--color-persian-pink)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor =
                    "var(--color-red-cmyk)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor =
                    "var(--color-persian-pink)")
                }
              >
                Read more
              </button>
            </div>
          </div>
        </div>

        <img
          src="/psps.png"
          className="-mt-24 w-2/3 md:w-1/3 mx-auto"
          alt="Read more"
        />

        {/* Bystander Action Section */}
        <div className="px-6 py-8 max-w-6xl mx-auto">
          <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            What you can do as a bystander?
          </h3>

          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0 mb-8">
            <div
              className="text-white p-4 rounded-lg"
              style={{ backgroundColor: "var(--color-persian-pink)" }}
            >
              <div className="font-semibold mb-2">
                1 - Analyze the situation
              </div>
              <p className="text-sm opacity-90 mb-4">
                Take a moment to understand what's happening
              </p>
              {/* Illustration placeholder for step 1 */}
              <img
                src="/deel1.png"
                className="aspect-square"
                alt="What can help here?"
              />
            </div>

            <div
              className="text-white p-4 rounded-lg"
              style={{ backgroundColor: "var(--color-persian-pink)" }}
            >
              <div className="font-semibold mb-2">2 - What can help here?</div>
              <p className="text-sm opacity-90 mb-4">
                Think about ways you can support the person.
              </p>
              {/* Illustration placeholder for step 2 */}
              <img
                src="/deel2.png"
                className="aspect-square"
                alt="What can help here?"
              />
            </div>

            <div
              className="text-white p-4 rounded-lg"
              style={{ backgroundColor: "var(--color-persian-pink)" }}
            >
              <div className="font-semibold mb-2">3 - Speak up!</div>
              <p className="text-sm opacity-90 mb-4">
                If it's safe, calmly intervene or offer support.
              </p>
              {/* Illustration placeholder for step 3 */}
              <img src="/deel3.png" className="aspect-square" alt="Speak up!" />
            </div>
          </div>

          <div className="mb-6 text-center md:text-left">
            <p className="text-gray-800 font-semibold mb-4 md:text-lg">
              Wanne know more about what you can do?
            </p>
            <button
              className="text-white px-6 py-3 rounded-full font-semibold transition-colors"
              style={{
                backgroundColor: "var(--color-persian-pink)",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "var(--color-red-cmyk)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "var(--color-persian-pink)")
              }
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
