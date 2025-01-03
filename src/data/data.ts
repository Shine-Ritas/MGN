
export interface SelectCollectionType {
    id: number;
    title: string;
  }
  
export interface ComicType extends SelectCollectionType { }
export interface ComicProgress extends ComicType { }

export const ComicType: ComicType[] = [
  {
    id: 0,
    title: 'Manga',
  },
  {
    id: 1,
    title: 'Manhwa',
  },
  {
    id: 2,
    title: 'Comic',
  }

]

export const ComicProgress: ComicProgress[] = [
  {
    id: 0,
    title: 'Ongoing',
  },
  {
    id: 1,
    title: 'Completed',
  },
  {
    id: 2,
    title: 'Dropped',
  }

]
