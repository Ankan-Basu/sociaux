import type { FC, ReactNode } from 'react';
import Navbar from './navbar/navbar';

interface ILayoutProps {
  children?: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
    return (
      <>
        <Navbar />
        <main>{children}</main>
        {/* <Footer /> */}
      </>
    )
  }

  export default Layout;