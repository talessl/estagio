import Navbar from "./Navbar";

function Layout( {children} ){
    return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="p-6">{children}</div>
        </div>
      );
    }
    
    export default Layout;