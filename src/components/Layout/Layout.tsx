import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ILayoutProps } from '@/types/types';

const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <Header />
      <main className="flex grow shrink-0 basis-auto mx-auto w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
