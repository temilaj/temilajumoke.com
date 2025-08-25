import React from 'react';

import { playfairDisplay } from '../app/fonts';

export default function Hero(props: { sectionsRef: React.RefObject<(HTMLElement | null)[]> }) {
  const { sectionsRef } = props;

  return (
    <header
      id="Hero"
      ref={el => {
        sectionsRef.current[0] = el;
      }}
      className="min-h-screen flex items-center opacity-0"
    >
      <div className={`${playfairDisplay.variable} grid lg:grid-cols-5 gap-12 w-full`}>
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-2">
            <p className="text-muted-foreground dark:text-white font-playfair">Hi, I&apos;m </p>
            <h1 className="font-playfair text-6xl lg:text-7xl font-light tracking-tight">
              Temi
              <br />
              <span className="font-playfair text-muted-foreground">Lajumoke</span>
            </h1>
          </div>

          <div className="space-y-6">
            <p className="font-playfair text-lg text-muted-foreground leading-relaxed">
              I&apos;m a<span className="text-foreground font-medium"> Software & Machine Learning Engineer </span>
              with over 8 years of experience building <span className="text-foreground font-medium">
                {' '}
                scalable{' '}
              </span>{' '}
              and <span className="text-foreground font-medium"> highly performant </span> software systems across the
              stack: from <span className="text-foreground font-medium"> Frontend web apps & Mobile apps</span>, to
              <span className="text-foreground font-medium"> Distributed Backend systems</span>, to{' '}
              <span className="text-foreground font-medium"> Deep Learning models</span>, and{' '}
              <span className="text-foreground font-medium"> Cloud Native Infrastructure</span>.
              <br />I currently work on distributed system runtimes and inference engine enhancements for Large Language
              Models at Amazon AI.
            </p>

            <p className="font-playfair text-lg text-muted-foreground leading-relaxed">
              Beyond Engineering, I compose{' '}
              <a
                href="https://soundcloud.com/temilaj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-500 hover:underline"
              >
                relaxing fingerstyle guitar music
              </a>{' '}
              and recharge in the great outdoors, whether it&apos;s kayaking on tranquil waters or snowboarding down
              groomed slopes.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-end space-y-6">
          {/* Languages Section */}
          <div className="space-y-3">
            <div className="text-base text-foreground font-medium">Languages</div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Core</div>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'HTML5', 'CSS3', 'SQL'].map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Additional</div>
              <div className="flex flex-wrap gap-2">
                {['Swift', 'Go', 'Rust'].map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Software Frameworks Section */}
          <div className="space-y-3">
            <div className="text-base text-foreground font-medium">Frameworks</div>
            <div className="flex flex-wrap gap-2">
              {[
                'Pytorch',
                'Node.js',
                'Express',
                'Fastify',
                'Spring Boot',
                'Spring Cloud',
                '.NET Core',
                'ASP.NET Core',
                'React',
                'React Native',
                'Vue',
                'Angular',
                'Knockout.js',
                'JQuery',
                'Redux',
                'Apollo',
                'LangGraph',
                'Model Context Protocol (MCP)',
              ].map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
