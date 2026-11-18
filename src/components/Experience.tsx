import React from 'react';

type Job = {
  year: string;
  role: string;
  company: string;
  description: string;
  link?: { label: string; href: string };
};

const JOBS: Job[] = [
  {
    year: '2026-Present',
    role: 'Staff Software Engineer',
    company: 'NVIDIA',
    description:
      'I work on AI tools and infrastructure that use LLMs and agentic AI to automate engineering workflows. Still cooking something great here.',
  },
  {
    year: '2022-2025',
    role: 'Software Engineer',
    company: 'Amazon AGI Lab',
    description:
      "Founding engineer for both the AGI Lab and Alexa on LLM (now Alexa+). I tech led the first model hosting pipeline and C2PA for Nova Reel, built much of the tool call and action execution layer (MCP before MCP), and worked on Reel's long video generation.",
    link: {
      label: 'Nova technical report',
      href: 'https://www.amazon.science/publications/the-amazon-nova-family-of-models-technical-report-and-model-card',
    },
  },
  {
    year: '2021',
    role: 'Machine Learning Engineer',
    company: 'BU Spark',
    description:
      'Topic modeling and classification of historical records from scanned, multilingual archives. I used BERT and XLM-RoBERTa and improved identification of key themes by 11%.',
  },
  {
    year: '2018-2020',
    role: 'Senior Software Engineer',
    company: 'Coursera (Senior Consultant via Andela)',
    description:
      "I led a distributed team of eight engineers across three countries and was tech lead for accessibility compliance. I rewrote the in-browser code editor and the evaluator that runs learners' code, cutting bundle size for some services by up to 50%, and built the partner tools for creating specializations and customizing certificates.",
  },
  {
    year: '2017-2018',
    role: 'Software Development Learning Facilitator',
    company: 'Andela',
    description:
      'I facilitated coding classes for new software engineers and built the curriculum. I also mentored engineers and assessed candidates.',
  },
  {
    year: '2015-2017',
    role: 'Software Developer',
    company: 'Woodstock',
    description:
      'Smart home and home automation. I programmed control systems, built the apps people used to run their homes, integrated third-party devices into one system, and built custom IoT devices.',
  },
];

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
          <div
            className="text-sm text-muted-foreground font-mono"
            aria-label="Experience timeline from 2015 to present"
          >
            2015 - Present
          </div>
        </div>

        <div className="space-y-12" role="list" aria-label="Work experience timeline">
          {JOBS.map((job, index) => (
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

              <div className="lg:col-span-10 space-y-3">
                <div>
                  <h3 className="text-xl font-medium">{job.role}</h3>
                  <div className="text-muted-foreground" aria-label={`Company: ${job.company}`}>
                    {job.company}
                  </div>
                </div>
                {job.description && (
                  <p className="text-muted-foreground leading-relaxed max-w-3xl">{job.description}</p>
                )}
                {job.link && (
                  <a
                    href={job.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-blue-500 dark:text-blue-500 hover:underline"
                    aria-label={`${job.link.label} (opens in new tab)`}
                  >
                    {job.link.label} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
