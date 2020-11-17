export interface DbNode {
  id: number
  title: string
  content?: DbNodeContent[],
  connections?: number[]
}

export interface ContentText {
  type: "text",
  body: string,
  segments?: ContentTextElement[];
}

export type ContentTextElement =
    ContentTextElementText
    | ContentTextElementVariable

export interface ContentTextElementText {
  element: "text"
  value?: string
}

export interface ContentTextElementVariable {
  element: "variable",
  id: string
  default?: string
}

export interface ContentImage {
  type: "image",
  url: string,
}

export type DbNodeContent = ContentText | ContentImage;

export interface NormalizedNodes {
  [id: number]: DbNode
}

