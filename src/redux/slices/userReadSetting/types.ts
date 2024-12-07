// Types for better clarity and reusability
export interface OptionType {
    label: string;
    value: string;
    iconName?: string;
  }
  
  export interface ReadingStyleType extends OptionType {}
  export interface HeaderVisibleType extends OptionType {}
  export interface ReadingDirectionType extends OptionType {}
  export interface ImageFitType extends OptionType {}
  export interface ProgressBarType extends OptionType {}
  
  export interface UserReadSetting {
    currentPage: number;
    totalPages: number;
    currentChapter: number;
    totalChapters: number[];
    showPanel: boolean;
    readingStyle: ReadingStyleType;
    headerVisible: HeaderVisibleType;
    readingDirection: ReadingDirectionType;
    imageFit: ImageFitType;
    progressBar: ProgressBarType;
  }
  