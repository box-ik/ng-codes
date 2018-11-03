
export class BoxIkCheatCode {
  
  get code(): string {
    return this._code;
  }

  get description(): string | null {
    return this._description || null;
  };

  constructor(code: string, description?: string) {
    this._code = code;
    this._description = description;
  }

  private _code: string;
  private _description?: string;
}
