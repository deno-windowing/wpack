export interface Platform {
  compile(file: string, flags: string[], output?: string): Promise<void>;
}
