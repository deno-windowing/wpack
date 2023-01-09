export interface Platform {
  rename(dest: string): void;
  compile(flags: string[]): Promise<void>;
  windowify(): Promise<void>;
}
