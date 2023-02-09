import "./Hero.css";

export default function Hero() {
  return (
    <div className="Hero">
      <div className="HeroContent">
        <div className="intro">
          <h1> HealthHero </h1>
          <p className="heroDesc">
            Vegan, Halal, Kosher, just looking for a bite to eat? We're here to
            help!
          </p>
        </div>
        {/* <div className="media">
                <img src="https://codepath-student-store-demo.surge.sh/assets/student_store_icon.18e5d61a.svg" alt="hero" className="hero-img"/>
            </div> */}
      </div>
    </div>
  );
}
