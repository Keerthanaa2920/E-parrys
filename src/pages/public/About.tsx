import React from 'react';
import { FiCheckSquare, FiAward, FiEye } from 'react-icons/fi';

export const About: React.FC = () => {
  const cards = [
    { title: 'Materials Auditing', desc: 'Every listed batch of cement, steel, or electrical wiring is audited for strict ISI certifications and quality compliance.', icon: FiCheckSquare },
    { title: 'Vendor Vetting', desc: 'Suppliers are registered on E-Parrys only after thorough license, GST, and historical dispatch capacity verifications.', icon: FiAward },
    { title: 'Full Transparency', desc: 'No hidden markup costs. Builders communicate and settle payment terms directly with wholesale manufacturers.', icon: FiEye }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Intro */}
      <section className="text-center space-y-4 max-w-3xl mx-auto py-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-parrys-charcoal font-serif">About E-Parrys</h1>
        <p className="text-sm text-parrys-muted leading-relaxed">
          E-Parrys is an enterprise-grade digital B2B marketplace engineered to streamline material procurement for construction projects. We connect builders directly with wholesale suppliers, providing verified specifications and transparent marketplace rates.
        </p>
      </section>

      {/* Grid of Values */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-custom border border-parrys-surface-dim/60 bg-white p-6 space-y-3.5 shadow-sm hover:border-parrys-terracotta transition-colors">
              <div className="inline-flex rounded-lg bg-parrys-cream p-2.5 text-parrys-terracotta border border-parrys-surface-dim/20">
                <Icon className="h-5.5 w-5.5" />
              </div>
              <h3 className="text-sm font-bold text-parrys-charcoal font-serif">{card.title}</h3>
              <p className="text-xs text-parrys-muted leading-relaxed">{card.desc}</p>
            </div>
          );
        })}
      </section>

      {/* Quality commitment */}
      <section className="rounded-custom border border-parrys-surface-dim/60 bg-white p-6 md:p-8 space-y-4 max-w-3xl mx-auto text-center shadow-sm">
        <h2 className="text-lg font-bold text-parrys-charcoal font-serif">Our Quality Assurance Commitment</h2>
        <p className="text-xs text-parrys-muted leading-relaxed">
          Through integrated laboratory checks and on-site testing logs, we ensure that every vendor listing represents actual structural integrity. Builders can download technical grade certificates and testing sheets directly from the material listings.
        </p>
      </section>
    </div>
  );
};
export default About;
