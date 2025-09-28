export interface ItemProps {
  id: string|number; 
  word: string;
  key?: string | number; 
  section?: string;
  selected?: boolean;
  removeable?: boolean;
  item?: any;
}
