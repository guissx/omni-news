export interface SearchBarProps {
  placeholder?: string;
  isVisible?: boolean;
  onSearch?: (query: string) => void;
  onSearchClick?: () => void; // Added property for handling search icon click
}
