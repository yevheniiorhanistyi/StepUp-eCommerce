import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Terms of Service', href: '#' }
];

const Footer = (): JSX.Element => {
  return (
    <footer className="px-5 sm:px-10 py-10 grow-0 shrink-0 basis-auto bg-neutral-950 text-amber-50">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col">
        <div className="flex flex-wrap justify-center gap-8 gap-x-4 xl:flex-nowrap">
          <div className="flex flex-col gap-2 sm:gap-3 min-w-[288px] min-[768px]:max-w-[560px] order-1 xl:order-none flex-[1_1_45%] max-[700px]:flex-[1_1_100%]">
            <h3 className="font-bold text-lg sm:text-xl">
              StepUp — More than sneakers. A lifestyle.
            </h3>
            <p className="text-sm text-amber-50/80">
              We believe that the right shoes can take you anywhere — one step at a time. Built for
              movement. Designed for you.
            </p>
          </div>

          <ul
            className="order-3 xl:order-none flex w-full justify-center gap-x-6 gap-y-2 text-center text-[13px] sm:text-sm text-amber-50/80 
                        xl:w-auto xl:flex-col xl:justify-start xl:items-center xl:text-left flex-[1_1_100%] xl:flex-[0_0_20%]"
          >
            {footerLinks.map(({ label, href }) => (
              <li key={label} className="hover:text-amber-50">
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 sm:gap-3 min-w-[288px] min-[768px]:max-w-[560px]  order-2 xl:order-none flex-[1_1_45%] max-[700px]:flex-[1_1_100%]">
            <h2 className="font-bold text-lg sm:text-xl">Subscribe to our Newsletter</h2>
            <p className="text-sm text-amber-50/80">
              Stay in step with new releases, style tips, and special deals — just for you.
            </p>
            <SubscribeForm />
          </div>
        </div>

        <div className="text-center text-sm text-amber-50/60 mt-6 pt-3 border-t border-amber-50/10">
          © 2025 StepUp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
