import React from 'react';
import { playfairDisplay, roboto } from '../app/fonts';

import SkillPill from '@/components/SkillPill';

export default function Skills(props: { sectionsRef: React.RefObject<(HTMLElement | null)[]> }) {
  const { sectionsRef } = props;

  return (
    <section
      id="Skills"
      ref={el => {
        sectionsRef.current[1] = el;
      }}
      className="min-h-screen py-24 opacity-0"
      aria-label="Technical skills and expertise"
    >
      <div className={`${playfairDisplay.variable} ${roboto.variable} space-y-16`}>
        <div className="flex items-end justify-between">
          <h2 id="experience-heading" className="text-4xl font-light">
            Skills
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Languages Section */}
          <div className="space-y-6" aria-labelledby="languages-heading">
            <h3 id="languages-heading" className="text-2xl text-foreground font-medium font-roboto">
              Languages
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-lg text-muted-foreground font-roboto">Core</h4>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Core programming languages">
                  {['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'HTML5', 'CSS3', 'SQL'].map(skill => (
                    <SkillPill key={skill} skill={skill} />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg text-muted-foreground font-roboto">Additional</h4>
                <div className="flex flex-wrap gap-3">
                  {['Swift', 'Go', 'Rust'].map(skill => (
                    <SkillPill key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Software Frameworks Section */}
          <div className="space-y-6">
            <h3 id="frameworks-heading" className="text-2xl text-foreground font-medium font-roboto">
              Software Frameworks
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'Node.js',
                'Express',
                'Fastify',
                'Spring Boot',
                'Spring Cloud',
                'ASP.NET Core',
                'React',
                'React Native',
                'Next.js',
                'Vue',
                'Angular',
                'Knockout.js',
                'iOS',
                'JQuery',
                'Redux',
                'Apollo',
                'Model Context Protocol (MCP)',
              ].map(skill => (
                <SkillPill key={skill} skill={skill} />
              ))}
            </div>
          </div>

          {/* API Specs Section */}
          <div className="space-y-6">
            <h3 id="api-specs-heading" className="text-2xl text-foreground font-medium font-roboto">
              API Specs
            </h3>
            <div className="flex flex-wrap gap-3">
              {['REST', 'GraphQL', 'RPC / gRPC'].map(skill => (
                <SkillPill key={skill} skill={skill} />
              ))}
            </div>
          </div>

          {/* Datastores and Queues Section */}
          <div className="space-y-6">
            <h3 id="datastores-heading" className="text-2xl text-foreground font-medium font-roboto">
              Data stores and Queues
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'MSSQL',
                'PostgreSQL',
                'MongoDB',
                'MySQL',
                'Firebase',
                'Redis',
                'RabbitMQ',
                'Kafka',
                'SQS',
                'SNS',
                'DynamoDB',
                'Elastic Search',
              ].map(skill => (
                <SkillPill key={skill} skill={skill} />
              ))}
            </div>
          </div>

          {/* Cloud & Orchestration Section */}
          <div className="space-y-6">
            <h3 id="cloud-heading" className="text-2xl text-foreground font-medium font-roboto">
              Cloud & Orchestration
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'AWS (EC2, ECS, Lambda, Cloudwatch, Cloud Formation, CDK, VPC, S3)',
                'Docker',
                'Kubernetes',
                'Prometheus',
                'Grafana',
              ].map(skill => (
                <SkillPill key={skill} skill={skill} />
              ))}
            </div>
          </div>

          {/* Machine Learning Section */}
          <div className="space-y-6">
            <h3 id="ml-heading" className="text-2xl text-foreground font-medium font-roboto">
              AI/ ML
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'PyTorch',
                'Pandas',
                'TensorFlow',
                'Keras',
                'OpenCV',
                'Scikit-learn',
                'SpaCy',
                'NLTK',
                'Transformers',
                'Vector Space Models',
                'RNNs (LSTM, GRU)',
                'CNNs',
                'GANs',
                'LLM Runtime Optimization',
                'RAG',
                'LangGraph',
                'LangChain',
                'LlamaIndex',
                'Agentic Systems',
              ].map(skill => (
                <SkillPill key={skill} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
