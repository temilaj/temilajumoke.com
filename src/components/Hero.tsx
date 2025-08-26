import React from 'react';

import { playfairDisplay } from '../app/fonts';

export default function Hero(props: { sectionsRef: React.RefObject<(HTMLElement | null)[]> }) {
  const { sectionsRef } = props;

  return (
    <section
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
              stack: from <span className="text-foreground font-medium"> frontend web apps & mobile apps</span>, to
              <span className="text-foreground font-medium"> distributed backend systems</span>, to{' '}
              <span className="text-foreground font-medium"> deep learning models</span>, and{' '}
              <span className="text-foreground font-medium"> cloud native infrastructure</span>.
              <br />I currently work on distributed system runtimes and inference engine enhancements for Large Language
              Models at Amazon AI.
            </p>

            <p className="font-playfair text-lg text-muted-foreground leading-relaxed">
              Beyond engineering, I compose{' '}
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

          <div className="social w-full float-left">
            <ul className="m-0 list-none flex items-center">
              <li className="mr-3 inline-block">
                <a
                  className="text-[20px] transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:temi@temilajumoke.com"
                >
                  <svg
                    enableBackground="new 0 0 48 48"
                    height="48px"
                    version="1.1"
                    viewBox="0 0 48 48"
                    width="48px"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-12 text-gray-800 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-700"
                  >
                    <g id="Expanded">
                      <g>
                        <g>
                          <path d="M44,40H4c-2.206,0-4-1.794-4-4V12c0-2.206,1.794-4,4-4h40c2.206,0,4,1.794,4,4v24C48,38.206,46.206,40,44,40z M4,10     c-1.103,0-2,0.897-2,2v24c0,1.103,0.897,2,2,2h40c1.103,0,2-0.897,2-2V12c0-1.103-0.897-2-2-2H4z" />
                        </g>
                        <g>
                          <path d="M24,29.191L6.457,17.84c-0.464-0.301-0.597-0.919-0.297-1.383s0.919-0.596,1.383-0.297L24,26.809L40.457,16.16     c0.464-0.299,1.083-0.167,1.383,0.297s0.167,1.082-0.297,1.383L24,29.191z" />
                        </g>
                        <g>
                          <path d="M6.001,34c-0.323,0-0.641-0.156-0.833-0.445c-0.307-0.46-0.183-1.08,0.277-1.387l9-6c0.46-0.307,1.081-0.183,1.387,0.277     c0.307,0.46,0.183,1.08-0.277,1.387l-9,6C6.384,33.945,6.191,34,6.001,34z" />
                        </g>
                        <g>
                          <path d="M41.999,34c-0.19,0-0.383-0.055-0.554-0.168l-9-6c-0.46-0.307-0.584-0.927-0.277-1.387     c0.306-0.46,0.926-0.584,1.387-0.277l9,6c0.46,0.307,0.584,0.927,0.277,1.387C42.64,33.844,42.322,34,41.999,34z" />
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
              <li className="mr-2 inline-block">
                <a
                  className="text-[20px] transition-all duration-300 w-36 h-36"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/temilajumoke/"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-8 text-gray-800 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-700"
                  >
                    <title>LinkedIn</title>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </li>

              <li className="mr-3 inline-block">
                <a
                  className="text-[20px] transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/temilaj"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-8 text-gray-800 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-700"
                  >
                    <path
                      fill="currentColor"
                      d="M12.001 2c-5.525 0-10 4.475-10 10a9.994 9.994 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.28 9.28 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10"
                    />
                  </svg>
                </a>
              </li>
            </ul>
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
                'Fast API',
                'Flask',
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
    </section>
  );
}
