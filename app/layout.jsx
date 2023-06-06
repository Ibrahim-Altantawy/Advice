import "@style/globals.css";
import NavbarComponent from "@components/Navbar/NavbarComponent.jsx";
import AuthProvider from "@components/authProvider/AuthProvider";

export const metadata = {
  title: "share_prompt",
  description: "Discover & Share Ai prompts",
};
export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <AuthProvider>
                <div className="main">
                  <div className="gradient" />
                </div>
                <main className="app">
                  <NavbarComponent />
                  {children}
                </main>           
          </AuthProvider>
          
        </body>
      </html>
    </>
  );
}
