import React, { memo, useMemo } from 'react';
import { Wand2 } from 'lucide-react';
import ReactMarkdown, { type Components } from 'react-markdown';
import { AIRecommendations as AIRecommendationType } from '@/types/sleep';
import { rehypePlugins, allowedHTMLElements } from '@/utils/markdown';

interface AIRecommendationsProps {
    recommendations: AIRecommendationType;
}

interface MarkdownProps {
  children: string;
  html?: boolean;
  limitedMarkdown?: boolean;
}

export const Markdown = memo(({ children, html = false}: MarkdownProps) => {
  const components = useMemo(() => {
    return {
      div: ({ className, children, node, ...props }) => {
        return (
          <div className={className} {...props}>
            {children}
          </div>
        );
      },
      pre: (props) => {
        const { children, node, ...rest } = props;
        return <pre {...rest}>{children}</pre>;
      },
    } satisfies Components;
  }, []);

  return (
    <ReactMarkdown
    className="MarkdownContent"
    components={components}
    allowedElements={allowedHTMLElements}
    rehypePlugins={rehypePlugins(html)}
    >
      {children}
    </ReactMarkdown>
  );
});

export function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  // Prepare markdown content for severity
  const severityMarkdown = recommendations.severityScore > 0
    ? `### Sleep Health Severity\n\n**Level:** ${
        recommendations.severityScore <= 3 ? 'Low Concern' : 
        recommendations.severityScore <= 7 ? 'Moderate Concern' : 
        'High Concern'
      }\n\n**Score:** ${recommendations.severityScore}/10`
    : '';

  // Combine markdown sections with the response text
  const combinedMarkdown = [
    severityMarkdown, 
    recommendations.responseText
  ]
    .filter(section => section)
    .join('\n\n---\n\n');

  return (
    <div className=" shadow-lg rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Wand2 className="mr-2 text-purple-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">AI Sleep Insights</h2>
      </div>
      
      {combinedMarkdown ? (
        <Markdown html={true} children={combinedMarkdown} />
      ) : (
        <div className="text-gray-500 text-center py-4">
          No AI recommendations available
        </div>
      )}
    </div>
  );
}