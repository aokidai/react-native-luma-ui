export interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface ComponentData {
  id: string;
  name: string;
  category: 'Actions' | 'Containment' | 'Navigation' | 'Selection' | 'Text Inputs' | 'Communication' | 'Layout' | 'Media';
  description: string;
  guidelines: string;
  anatomy: string[];
  specs: {
    height?: string;
    corner?: string;
    elevation?: string;
    containerColor?: string;
  };
  props: PropDefinition[];
  codeExample: string;
}

export type ActiveNav = 'getting-started' | 'colors' | string;
