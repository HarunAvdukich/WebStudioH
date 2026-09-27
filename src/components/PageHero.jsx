// Zaglavlje unutrašnje stranice: žuti pojas i nosač police ispod njega.
export default function PageHero({ title, subtitle }) {
  return (
    <section className="page-head">
      <div className="container">
        <h1 className="display page-head__title">{title}</h1>
        {subtitle && <p className="page-head__sub">{subtitle}</p>}
      </div>
      <div className="rail" aria-hidden="true" />
    </section>
  )
}
