import "./globals.css";
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Wrapper><Navbar />{children}</Wrapper>
      </body>
    </html>
  );
}
