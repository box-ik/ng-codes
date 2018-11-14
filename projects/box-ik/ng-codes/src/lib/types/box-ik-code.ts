
export class BoxIkCode {
  
  get value(): string {
    return this._value;
  }

  get description(): string | null {
    return this._description || null;
  };

  constructor(value: string, description?: string) {
    this._value = value;
    this._description = description;
  }

  private _value: string;
  private _description?: string;
}
