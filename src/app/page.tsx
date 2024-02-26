import Image from 'next/image';
import { playfairDisplay, roboto } from '../app/fonts';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-300 dark:bg-black">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a className="pointer-events-none flex place-items-center gap-2 lg:pointer-events-auto lg:p-0" href="/">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/temilajumoke-logo-transparent.png"
            alt="Next.js Logo"
            width={200}
            height={48}
            priority
          />
        </a>
      </div>

      <div className="animated">
        <div className="container">
          <div className="tokyo_tm_home max-w-4xl clear-both flex items-center justify-center relative">
            <div className="home_content flex items-center justify-normal">
              <div className="image max-w-sm">
                <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] avatar rounded-full"
                  data-type="wave"
                  src="/profile_photo.jpg"
                  alt="Next.js Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className={`${playfairDisplay.variable} details max-w-xl ml-10`}>
                <p className="text-gray-500 dark:text-white">Hi, I'm </p>
                <h3 className={`font-playfair font-medium name text-[55px] mb-[14px] text-gray-500 dark:text-gray-200`}>
                  Temi <span>Lajumoke</span>
                </h3>
                <p className="job font-playfair mb-[25px] text-gray-500 dark:text-gray-50">
                  I'm a Software and Machine Learning Engineer with over eight years of experience working on full-stack
                  web and mobile technologies. I currently work on distributed system runtimes and inference
                  enhancements for Large Language Models at Amazon AI. Outside the professional sphere, I compose{' '}
                  <a
                    href="https://soundcloud.com/temilaj"
                    target="_blank"
                    rel="noopener"
                    className="text-gray-500 dark:text-gray-300 hover:underline"
                  >
                    relaxing fingerstyle guitar music
                  </a>{' '}
                  and seek experiences in the great outdoors, through kayaking on tranquil waters or snowboarding down
                  groomed slopes.
                </p>
                <div className="social w-full float-left">
                  <ul className="m-0 list-none flex items-center">
                    <li className="mr-3 inline-block">
                      <a
                        className="text-black text-[20px] transition-all duration-300 hover:text-black"
                        target="_blank"
                        rel="noopener"
                        href="mailto:temi@temilajumoke.com"
                      >
                        <svg
                          enable-background="new 0 0 48 48"
                          height="48px"
                          version="1.1"
                          viewBox="0 0 48 48"
                          width="48px"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="h-12 text-black dark:text-white"
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
                        className="text-black text-[20px] transition-all duration-300 hover:text-black w-36 h-36"
                        target="_blank"
                        rel="noopener"
                        href="https://www.linkedin.com/in/temilajumoke/"
                      >
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="w-8 text-black dark:text-white"
                        >
                          <title>LinkedIn</title>
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </li>

                    <li className="mr-3 inline-block">
                      <a
                        className="text-black text-[20px] transition-all duration-300 hover:text-black"
                        target="_blank"
                        rel="noopener"
                        href="https://github.com/temilaj"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-8 text-black dark:text-white"
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
            </div>
          </div>
        </div>
      </div>

      <div className="mb-0 grid text-center lg:grid-cols-3 lg:text-left">
        <a
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <p className={`${roboto.variable} font-roboto m-0 text-sm opacity-50`}>
            © 2014 - {new Date().getFullYear()} | Temi Lajumoke.
          </p>
        </a>
      </div>
    </main>
  );
}
