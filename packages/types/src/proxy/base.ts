import { Codec, Constructor } from '../types';

export abstract class BaseProxy<T extends Codec> implements Codec {
  protected abstract targetCls: Constructor;
  protected abstract target: T;

  get encodedLength (): number {
    return this.target.encodedLength;
  }

  /**
   * @description Returns a hex string representation of the value
   */
  toHex (): string {
    return this.target.toHex();
  }

  /**
   * @description Converts the Object to JSON, typically used for RPC transfers
   */
  toJSON (): any {
    return this.target.toJSON();
  }

  /**
   * @description Encodes the value as a Uint8Array as per the parity-codec specifications
   * @param isBare true when the value has none of the type-specific prefixes (internal)
   */
  toU8a (isBare?: boolean): Uint8Array {
    return this.target.toU8a(isBare);
  }

  eq (other?: any): boolean {
    return this.target.eq(other);
  }

}
