export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="page-hero__aurora" />
      <div className="container">
        <div className="page-hero__inner" data-reveal>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="page-hero__title">{title}</h1>
          {subtitle && <p className="page-hero__sub">{subtitle}</p>}
        </div>
      </div>
    </section>
  )
}
