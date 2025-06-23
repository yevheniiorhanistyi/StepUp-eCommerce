import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const PopularCategories = (): JSX.Element => {
  const categories = [
    {
      title: 'Training Shoes',
      description: 'Versatile performance shoes for gym sessions and daily workouts.',
      href: '/catalog',
      image: '/images/categories/training-category.jpg'
    },
    {
      title: 'Running Shoes',
      description: 'Enhance your performance with our top-notch running sneakers.',
      href: '/catalog',
      image: '/images/categories/running-category.jpg'
    },
    {
      title: 'Casual Sneakers',
      description: 'Find your perfect pair for everyday wear and comfort.',
      href: '/catalog',
      image: '/images/categories/casual-category.jpg'
    }
  ];

  return (
    <section className="px-4 sm:px-10 py-8">
      <div className="w-full max-w-[1440px] mx-auto">
        <h2 className="text-2xl text-center mb-7">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start gap-4">
          {categories.map((category, index) => {
            const isLast = index === categories.length - 1;
            const shouldSpanTwo = categories.length % 2 === 1 && isLast;

            let justify = '';
            if (index === 0) justify = 'xl:justify-self-start';
            else if (index === 2) justify = 'xl:justify-self-end';

            return (
              <Link
                href={category.href}
                key={category.title}
                className={cn(
                  'max-w-[420px] w-full',
                  'justify-self-center',
                  justify,
                  shouldSpanTwo && 'md:col-span-2 xl:col-span-1'
                )}
              >
                <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg py-5">
                  <CardContent>
                    <div className="relative w-full h-[246px] mb-5">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 364px"
                        className="rounded-md"
                      />
                    </div>
                    <h3 className="text-lg mb-2">{category.title}</h3>
                    <p className="text-base sm:-tracking-tight mb-1">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
