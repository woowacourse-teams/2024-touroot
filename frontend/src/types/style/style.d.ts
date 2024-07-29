declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare module "*.svg?url" {
  const content: string;
  export default content;
}

declare module "*.woff";

declare module "*.webp" {
  const value: string;
  export = value;
}

declare module "*.gif" {
  const value: string;
  export = value;
}
