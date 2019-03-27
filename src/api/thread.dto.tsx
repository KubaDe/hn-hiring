interface Hit {
  title: string,
  objectID: string
}

export interface SearchThreadDto {
  hits: Hit[]
}

interface Children {
  text: string
  title: string
}

export interface GetThreadDto {
  children: Children[],
  title: string,
}
