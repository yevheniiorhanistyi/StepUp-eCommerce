'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const Benefits = (): JSX.Element => {
  const advantages = [
    {
      title: '100% Authentic Sneakers',
      description: 'We guarantee genuine, brand-new sneakers — no fakes, no compromises.',
      imageSrc: '/images/benefits/authenticity.png',
      imageAlt: 'Authentic Sneakers'
    },
    {
      title: 'Fast & Free Shipping',
      description: 'Get your kicks quickly, with free delivery on all orders over $100.',
      imageSrc: '/images/benefits/fast-delivery.png',
      imageAlt: 'Fast & Free Shipping'
    },
    {
      title: 'Hassle-Free Returns',
      description: 'Changed your mind? Return your sneakers within 14 days — no questions asked.',
      imageSrc: '/images/benefits/return-box.png',
      imageAlt: 'Hassle-Free Returns'
    },
    {
      title: 'Secure Checkout',
      description: 'Your data is safe with us thanks to encrypted payment and trusted partners.',
      imageSrc: '/images/benefits/verified.png',
      imageAlt: 'Secure Checkout'
    }
  ];

  return (
    <section className="bg-neutral-950 text-amber-50 py-8 px-4">
      <div className="w-full max-w-[1440px] mx-auto">
        <h2 className="text-2xl text-center mb-8">Why Shop With Us ?</h2>
        <div
          className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-y-12
        lg:gap-x-10
        justify-items-center
      "
        >
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="w-full max-w-xs [@media(max-width:730px)]:max-w-[250px] text-center space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2, delayChildren: index * 0.2 }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={advantage.imageSrc}
                  alt={advantage.imageAlt}
                  width={65}
                  height={65}
                  className="mx-auto"
                />
              </motion.div>
              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                className="text-xl font-semibold"
              >
                {advantage.title}
              </motion.h3>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                className="text-sm"
              >
                {advantage.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
