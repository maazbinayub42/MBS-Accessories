import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types";

export default function CategoryCard({
  category,
}: {
  category: Category;
}) {
  return (
    <Link href={`/shop?category=${category.slug}`} className="category-card">
      <Image
        src={category.image}
        alt={`${category.name} Collection`}
        width={600}
        height={800}
        loading="lazy"
        style={{ width: "100%", height: "auto" }}
      />
      <div className="category-card__overlay">
        <div className="category-card__name">{category.name}</div>
        <div className="category-card__desc">{category.description}</div>
        <div className="category-card__link">
          Explore{" "}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
