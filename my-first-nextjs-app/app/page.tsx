import ExpandableImage from './components/ExpandableImage'

const images = [
  { src: "/photographs/BUS-03.jpg", alt: "Bus" },
  { src: "/photographs/ASAKUSA-BURGER-01.jpg", alt: "Burger" },
  { src: "/photographs/HOPPY-03.jpg", alt: "Hoppy" },
  { src: "/photographs/JEA-A-03.jpg", alt: "Jea" },
  { src: "/photographs/OKAMOTO-02.jpg", alt: "Okamoto" },
  { src: "/photographs/TANABATA-01.jpg", alt: "Tanabata" },
  { src: "/photographs/ITO-B-01.jpg", alt: "Ito" },
  { src: "/photographs/ITO-FISHER-03.jpg", alt: "Fishmun" },
  { src: "/photographs/ONII-JEA-02.jpg", alt: "OniiJea" },
  { src: "/photographs/ITO-KAKI-02.jpg", alt: "Kaki" },
  // Add more image objects as needed
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-background">
      <h1 className="text-4xl font-bold mb-8 text-primary">My Image Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((img, index) => (
          <ExpandableImage 
            key={index}
            src={img.src} 
            alt={img.alt}
          />
        ))}
      </div>
    </main>
  )
}