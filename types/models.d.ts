/** TodoMVC model definitions **/

declare interface MemoryItemData {
  id?: number;
  text?: string;
  completed?: boolean;
}

declare type MemoryStoreState = MemoryItemData[];
