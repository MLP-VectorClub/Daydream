import HtmlToReact, { Parser as HtmlToReactParser, ProcessingInstruction } from 'html-to-react';
import React from 'react';
import Link from 'next/link';

const allowedTags: { [k in keyof HTMLElementTagNameMap]?: true } = {
  strong: true,
  em: true,
};

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const processingInstructions: ProcessingInstruction[] = [
  {
    // Custom link processing
    shouldProcessNode: node => node.name === 'a',
    processNode: (node, children, index) => (
      <Link key={index} href={node.attribs.href}>
        <a>{children}</a>
      </Link>
    ),
  },
  {
    // Anything else
    shouldProcessNode: node => node.name in allowedTags || node.type === 'text',
    processNode: processNodeDefinitions.processDefaultNode,
  },
];
const htmlToReactParser = new HtmlToReactParser();
function isValidNode() {
  return true;
}

export function processAppearanceNotes(notes: string): JSX.Element {
  return htmlToReactParser.parseWithInstructions(notes, isValidNode, processingInstructions);
}
