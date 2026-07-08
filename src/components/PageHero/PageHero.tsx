// Styles
import "./PageHero.css";

///////////////////
//     Props     //
///////////////////
interface PageHeroProps {
  title: string;
  subtitle?: string;
}

///////////////////
//   Component   //
///////////////////
function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__overlay">
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </div>
    </section>
  );
}

export default PageHero;