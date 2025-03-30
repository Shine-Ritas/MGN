
export interface SelectCollectionType {
    id: number | string;
    title: string;
  }
  
export interface ComicType extends SelectCollectionType { }
export interface ComicProgress extends ComicType { }
export interface OrderBy extends SelectCollectionType { }

export const OrderBy: OrderBy[] = [
  {
    id: "latest",
    title: 'Latest',
  },
  {
    id: "popular",
    title: 'Popular',
  },
  {
    id: "rating",
    title: 'Rating',
  }

]

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
