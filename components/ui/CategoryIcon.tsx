"use client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from 'next/navigation'
import { Category } from "@prisma/client"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {
    const params = useParams<{ category: string }>()

    return (
        <div
            className={`${category.slug === params.category ? 'bg-red-600 text-white' : ''} flex flex-row items-center gap-2 md:gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="w-12 h-12 md:w-16 md:h-16 relative">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt="Imagen Categoria"
                />
            </div>

            <Link
                className="text-sm md:text-xl font-bold text-center md:text-left"
                href={`/order/${category.slug}`}
            >
                {category.name}
            </Link>
        </div>
    )
}
