import { type ItemProps } from "@/components/ui/dropdown/dropdowninputtype";

export interface ItemPropsGroup {
    [key: 'key'|string]: ItemProps[] | string;
  }

