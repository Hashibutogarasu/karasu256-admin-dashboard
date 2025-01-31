import { useGalleries } from "@/hooks/use-galleries";

export default function Gallery() {
  const galleries = useGalleries();

  return (
    <div>
      {galleries.map((gallery) => (
        <div key={gallery.id}>
          <h2>{gallery.id}</h2>
          <img src={gallery.url} alt={gallery.alt} />
        </div>
      ))}
    </div>
  )
}