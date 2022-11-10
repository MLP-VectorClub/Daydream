declare module 'html-to-react' {
  import { ReactNode } from 'react';

  export interface HtmlToReactNode {
    attribs: Record<string, string>;
    name: string;
    type: string;
  }

  type NodeProcessor = (node: HtmlToReactNode, children: HtmlToReactNode[], index: number) => ReactNode;

  export interface ProcessingInstruction {
    shouldProcessNode(node: HtmlToReactNode): boolean;

    processNode: NodeProcessor;
  }

  export class Parser {
    parseWithInstructions(
      html: string,
      isValidNode: (node: HtmlToReactNode) => boolean,
      instructions: ProcessingInstruction[]
    ): JSX.Element;
  }

  class ProcessNodeDefinitions {
    processDefaultNode: NodeProcessor;
  }

  export default {
    ProcessNodeDefinitions,
  };
}
