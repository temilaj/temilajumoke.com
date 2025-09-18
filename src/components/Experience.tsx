import React from 'react';

export default function Experience(props: { sectionsRef: React.RefObject<(HTMLElement | null)[]> }) {
  const { sectionsRef } = props;

  return (
    <section
      id="Experience"
      ref={el => {
        sectionsRef.current[2] = el;
      }}
      className="min-h-screen py-24 opacity-0"
      aria-labelledby="experience-heading"
    >
      <div className="space-y-16">
        <div className="flex items-end justify-between">
          <h2 id="experience-heading" className="text-4xl font-light">
            Experience
          </h2>
          <div className="text-sm text-muted-foreground font-mono" aria-label="Experience timeline from 2016 to 2025">
            2016 — 2025
          </div>
        </div>

        <div className="space-y-12" role="list" aria-label="Work experience timeline">
          {[
            {
              year: '2022-Present',
              role: 'Software Engineer',
              company: 'Amazon AI',
              description: '',
              tech: [],
            },
            {
              year: '2021',
              role: 'Machine Learning Engineer',
              company: 'BU Spark',
              description: '',
              tech: [],
            },
            {
              year: '2018-2020',
              role: 'Senior Software Engineer',
              company: 'Coursera',
              description: '',
              tech: [],
            },
            {
              year: '2018-2020',
              role: 'Senior Software Engineer',
              company: 'Andela',
              description: '',
              tech: [],
            },
            {
              year: '2017-2018',
              role: 'Software Development Learning Facilitator',
              company: 'Andela',
              description: '',
              tech: [],
            },
            {
              year: '2015-2017',
              role: 'Software Developer',
              company: 'Woodstock',
              description: '',
              tech: [],
            },
          ].map((job, index) => (
            <article
              key={index}
              className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
              role="listitem"
            >
              <div className="lg:col-span-2">
                <div className="text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {job.year}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div>
                  <h3 className="text-xl font-medium">{job.role}</h3>
                  <div className="text-muted-foreground" aria-label={`Company: ${job.company}`}>
                    {job.company}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
              </div>

              <div
                className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end"
                role="list"
                aria-label={`Technologies used at ${job.company}`}
              >
                {job.tech.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                    role="listitem"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
