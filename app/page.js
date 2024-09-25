
import Category from "./component/Category";
import Hero from "./component/Hero";
import ScrollToTop from "./component/ScrollToTop";
import Products from "./products/page";

export default function Home() {
  return (
    <main className="">
      <Hero/>
      <Products/>
      <Category/>
      <ScrollToTop/>
    </main>
  );
}
