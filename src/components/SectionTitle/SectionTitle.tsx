// Styles
import "./SectionTitle.css";

///////////////////
//     Props     //
///////////////////
interface SectionTitleProps {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  title: string;
  className?: string;
}

///////////////////
//   Component   //
///////////////////
function SectionTitle({ title, level = "h2", className = "" }: SectionTitleProps) {
  const HeadingTag = level;
  return (
    <div className={`section-title ${className}`}>
      <HeadingTag className="section-title__text">{title}</HeadingTag>
      <div className="section-title__separator" />
    </div>
  );
}

export default SectionTitle;