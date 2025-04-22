import Easy from "./Easy";
import Medium from "./Medium";
import Hard from "./Hard";
import Navbar from "../components/Navbar";

export default function Home() {

  return(
    <section id='home'>
      <Navbar />
      <main className="flex flex-col md:flex-row">
        <section className="flex flex-1 flex-col md:flex-row">
          <section id="home-easy" className="flex flex-1"><Easy /></section>
          <section id="home-medium" className="flex flex-2"><Medium /></section>
        </section>
        <section id="home-hard" className="flex flex-2"><Hard /></section>
      </main>
    </section> 
  );
};