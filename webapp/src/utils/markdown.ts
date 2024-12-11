import rehypeRaw from 'rehype-raw';
import type { PluggableList} from 'unified';
import rehypeSanitize, { defaultSchema, type Options as RehypeSanitizeOptions } from 'rehype-sanitize';

export const allowedHTMLElements = [
  'a', 'b', 'blockquote', 'br', 'code', 'dd', 'del', 'details', 'div', 'dl', 'dt', 
  'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'ins', 'kbd', 'li', 'ol', 
  'p', 'pre', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'source', 'span', 'strike', 
  'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'tfoot', 'th', 
  'thead', 'tr', 'ul', 'var',
];

const rehypeSanitizeOptions: RehypeSanitizeOptions = {
  ...defaultSchema,
  tagNames: allowedHTMLElements,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div ?? []), 'data*', ['className', '__boltArtifact__']],
  },
  strip: [],
};

export function rehypePlugins(html: boolean) {
  const plugins: PluggableList = [];
  
  if (html) {
    plugins.push(rehypeRaw, [rehypeSanitize, rehypeSanitizeOptions]);
  }
  
  return plugins;
}

// Removed the limitedMarkdownPlugin entirely